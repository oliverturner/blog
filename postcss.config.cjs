/**
 * @typedef {import("postcss").Plugin} Plugin;
 * @typedef {import("postcss").AcceptedPlugin} AcceptedPlugin;
 */

const path = require("path");
const process = require("process");

const postcssCustomMedia = require("postcss-custom-media");
const postcssCustomProps = require("postcss-custom-properties");
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
    postcssCustomProps({
      importFrom: [{ customProperties }],
      exportTo: path.join(__dirname, "public/theme.css"),
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
