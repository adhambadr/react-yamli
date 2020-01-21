# React Yamli

Integerate the amazing engine of Yamli through their official API into your website to enable versatile Franco Arabic text input conversion

Get an API key :https://www.yamli.com/api/

### Installation

```base
yarn add react-yamli
# or
npm i -s react-yamli
```

### Usage

```javascript
import Yamli from "react-yamli";
import "react-yamli/dist/index.css";

render = () => {
	<Yamli
		API_KEY="1234_API_I_GOT_FROM_YAMLI"
		placeholder="search in arabic"
		textUpdated={newFullText => {}}
		onEnter={fullText => {}}
		clearOnEnter={false}
		wordConverted={newWord => {}}
	/>;
};
```

For optimium usage you'll need to import the dist/index.css and worry about your loader webpack to handle it. 
