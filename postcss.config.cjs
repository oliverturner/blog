/**
 * @typedef {import("postcss").Plugin} Plugin;
 * @typedef {import("postcss").AcceptedPlugin} AcceptedPlugin;
 */

const path = require("path");
const process = require("process");

const postcssCustomMedia = require("postcss-custom-media");
const postcssJitProps = require("postcss-jit-props");
const cssnano = require("cssnano");

const { customMedia, customProperties } = require("./src/theme.cjs");
const { NODE_ENV } = process.env;

console.log({ customMedia });

/**
 * @param {boolean} isProd
 * @returns {AcceptedPlugin[]}
 */
function getPlugins(isProd) {
	const plugins = [
		postcssCustomMedia({ importFrom: { customMedia } }),
		postcssJitProps({
			...customMedia,
			...customProperties,
			files: ["./src/styles/open-props.min.css"],
		}),
	];

	if (isProd) {
		plugins.push(cssnano({ preset: "advanced" }));
	}

	return plugins;
}

module.exports = {
	plugins: getPlugins(NODE_ENV === "production"),
};
