const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
enableBabel();

class OxypogonRenderer {
	/**
	 * @param {Object} config
	 * @param {String} config.basepath Path to JSX files
	 */
	constructor(config) {
		this._config = config;
	}

	/**
	 * @param {String} componentName Name capitalized as a classname
	 * @param {Object} props
	 * @return {String}
	 */
	render(componentName, props) {
		const filename = this._getFilepath(componentName);
		const Component = require(filename);
		const instance = React.createElement(Component, props);
		const rendered = ReactDOMServer.renderToStaticMarkup(instance);

		return rendered;
	}

	/**
	 * Returns full path to the file with 'jsx' extension
	 * @param {String} component
	 * @return {String}
	 */
	_getFilepath(component) {
		const filename = `${this._formatFilename(component)}.jsx`;
		return path.resolve(this._config.basepath, filename);
	}

	/**
	 * Returns 'ArticleName' -> 'article-name'
	 * @param {String} component 
	 * @return {String}
	 */
	_formatFilename(component) {
		const regexp = /[A-Z]/g;
		return component.replace(regexp, (letter, position) => {
			let replacement = letter.toLowerCase();
			
			if (position !== 0) {
				replacement = `-${replacement}`;
			} 
			
			return replacement;
		});
	}
}

/**
 * This magic makes sure that all '.jsx' files are transpiled 
 * by babel after loading and before being evaluated
 * 
 * @todo Make pluginPath resolving more elegant
 */
function enableBabel() {
	const pluginPath = path.resolve(
		__dirname, 
		'./node_modules', 
		'./babel-plugin-transform-react-jsx'
	);

	require('babel-register')({
		extensions: ['.jsx'],
		plugins: [pluginPath]
	});
}

module.exports = OxypogonRenderer;
