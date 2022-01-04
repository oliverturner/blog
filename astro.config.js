// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

/**
 * @typedef {import("hast-util-to-string").Node} Node
 */

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
import astroRemark from "@astrojs/markdown-remark";
import { h } from "hastscript";

/**
 * @param {Node} _node
 */
function getHeadingContent(_node) {
	return [
		h("svg.icon.icon-link", {}, [
			h("use", { "xlink:href": "/sprite.svg#link" }),
		]),
	];
}

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
	buildOptions: {
		site: "https://blog.oliverturner.cloud",
	},
	// Enable Custom Markdown options, plugins, etc.
	markdownOptions: {
		render: [
			astroRemark,
			{
				remarkPlugins: ["remark-code-titles"],
				rehypePlugins: [
					"rehype-slug",
					["rehype-autolink-headings", { content: getHeadingContent }],
					["rehype-add-classes", { "h1,h2,h3": "title title--link" }],
				],
			},
		],
	},

	renderers: ["@astrojs/renderer-svelte"],
});
