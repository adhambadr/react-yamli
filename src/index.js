import React from "react";
import axios from "axios";
import _ from "lodash";
import "./index.scss";

export default class Yamli extends React.Component {
	static defaultProps = {
		textUpdated: () => {},
		wordConverted: () => {},
		onEnter: () => {},
		onSpace: () => {},
		API_KEY: ""
	};
	state = {
		arabicOptions: [],
		selectedIndex: -1,
		searchText: ""
	};

	textChanged = (text = this.state.searchText) => {
		this.props.textUpdated(text);
	};

	local = async text => {
		const { data } = await axios.get(
			`
       https://api.yamli.com/transliterate.ashx?word=${text}&account_id=000006&prot=https%3A&hostname=www.yamli.com&path=%2Farabic-keyboard%2F&build=5515&sxhr_id=4
    `,
			{
				headers: {
					Authorization: "Bearer " + this.props.API_KEY,
					"Content-Type": "application/json"
				}
			}
		);
		const response = JSON.parse(
			data
				.replace(
					"if (typeof(Yamli) == 'object') {Yamli.I.SXHRData.dataCallback(",
					""
				)
				.replace(");};", "")
		);
		response.data = JSON.parse(response.data);
		return _.map(_.split(_.get(response, "data.r"), "|"), r =>
			r.substring(0, _.size(r) - 2)
		);
	};

	arabic = async text => {
		if (_.size(text) < 1 || this.containsArabic(text))
			return this.setState({ arabicOptions: [], toReplace: undefined });
		try {
			const arabicOptions = await this.local(text);
			//console.log(arabicOptions);
			this.setState({
				arabicOptions,
				toReplace: text
			});
		} catch (e) {
			if (process.env.NODE_ENV !== "production") console.error(e);
		}
	};

	containsArabic = text =>
		/[\u0600-\u06FF\u0750-\u077F\ufb50-\ufc3f\ufe70-\ufefc]/.test(text);

	clear = () =>
		this.setState({
			searchText: "",
			arabicOptions: [],
			toReplace: undefined
		});

	selectWord = ({
		index = this.state.selectedIndex,
		onFinish = () => {}
	}) => {
		if (!_.size(this.state.arabicOptions))
			return onFinish(this.state.searchText);

		if (index < 0) index = 0;
		const newWord = this.state.arabicOptions[index];
		const searchText = this.state.searchText
			.replace(this.state.toReplace, newWord)
			.trim();
		this.setState(
			{
				arabicOptions: [],
				searchText,
				toReplace: undefined
			},
			() => {
				this.textChanged();
				onFinish(searchText);
			}
		);
	};
	keyDown = ({ keyCode }) => {
		switch (keyCode) {
			case 38: // ArrowDown
				this.setState({
					selectedIndex:
						this.state.selectedIndex === 0
							? 0
							: this.state.selectedIndex - 1
				});
				return;
			case 40: // ArrowUp
				if (this.state.selectedIndex < _.size(this.state.arabicOptions))
					this.setState({
						selectedIndex: this.state.selectedIndex + 1
					});
				return;
			case 13: // Enter
				this.selectWord({
					onFinish: text => {
						this.props.onEnter(text);
						if (this.props.clearOnEnter) this.clear();
					}
				});
				return;
			case 32: // space
				this.selectWord({ onFinish: this.props.onSpace });
				return;
			case 27: // Escape
				this.setState({
					toReplace: "",
					arabicOptions: []
				});
		}
	};

	handleChange = ({ target }) => {
		this.setState(
			{
				searchText: target.value,
				selectedIndex: 0
			},
			() => this.textChanged()
		);
		this.arabic(_.last(_.split(target.value, " ")));
	};

	onClick = ({ target }) => {
		const { selectionStart, selectionEnd, value } = target;

		if (
			selectionStart === selectionEnd &&
			selectionStart > 0 &&
			selectionStart < _.size(value)
		)
			this.arabic(this.findWordBySelection(value, selectionStart));
	};

	findWordBySelection = (word, selectionIndex) => {
		const words = _.split(word.trim(), " ");
		let currentWord = 0;
		for (let i = 0; i < selectionIndex; i++) {
			const char = word.trim().charAt(i);
			if (char == " ") currentWord++;
		}
		return words[currentWord];
	};

	render = () => (
		<div className="yamli">
			<div className="">
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						onChange={this.handleChange}
						id="textbox"
						value={this.state.searchText}
						placeholder={this.props.placeholder}
						{...this.props.otherInputProps}
						onKeyDown={k =>
							this.keyDown(k) &&
							this.props.otherInputProps.keyDown(k)
						}
						onSelect={this.onClick}
						ref={e => (this.inputField = e)}
						autoComplete="none"
					/>
				</div>
				<div className="suggestions">
					<ul>
						{_.map(this.state.arabicOptions, (word, i) => (
							<li
								className={
									this.state.selectedIndex === i
										? "selected"
										: ""
								}
								onMouseOver={() =>
									this.setState({ selectedIndex: i })
								}
								onClick={() => this.selectWord({ index: i })}
								key={i}
							>
								{word}
							</li>
						))}
					</ul>
				</div>
				{this.props.showText && (
					<div className="row">
						<div className="col-md">
							<h4>{this.state.searchText}</h4>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
