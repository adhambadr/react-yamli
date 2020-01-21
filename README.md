# React Yamli

Integerate the amazing engine of Yamli through their official API into your website to enable versatile Franco Arabic text input conversion

Get an API key: https://www.yamli.com/api/

### Installation

```base
yarn add react-yamli
# or
npm i -s react-yamli
```

### Usage

```javascript
import Yamli from "react-yamli";

render = () => {
	<Yamli
		placeholder="search in arabic"
		textUpdated={newFullText => {}}
		onEnter={fullText => {}}
		clearOnEnter={false}
		wordConverted={newWord => {}}
	/>;
};
```

