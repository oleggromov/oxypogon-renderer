# OxypogonRenderer

A simple class that renders an arbitrary react component specified as a class name to a string.

## Usage example

```js
const OxypogonRenderer = require('oxypogon-renderer');

const renderer = new OxypogonRenderer({
	basepath: './components' // full path to a folder to which components' names should be resolved to
});

const props = {
	name: 'An example article for OxypogonRenderer readme'
}
let renderedComponent = renderer.render('ArticleTest', props);

console.log(renderedComponent);
```

The code above along with the `./components/article-test.jsx` of the following content:

```jsx
const React = require('react');

class ArticleTest extends React.Component {
	render() {
		return (
			<article>
				<h1>{this.props.name}</h1>
			</article>
		);
	}
}

module.exports = ArticleTest;
```

creates this output:

```html
<article><h1>An example article for OxypogonRenderer doc</h1></article>
```

## Subtle details

As you could have noticed, `OxypogonRenderer` transforms class name `ArticleTest` into a filename `article-test.jsx` and resolves it into a full path specified by `config.basepath` on constructor invocation which is concateneted to a filename itself. 

Probably, this transormation is excessive, but as far as I believe it serves a common NodeJS class name to file name convention, it will reside here.
