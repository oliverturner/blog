/**
 * Turns a map of breakpoints into customMedia rules:
 * ```css
 * --mq-small: 496px;
 * --mq-medium: 768px;
 * ```
 * @param {[string, number][]} breakpointTable
 * @param {Record<string, string>} dict
 * @returns {Record<string, string>}
 */
function getCustomMedia(breakpointTable, dict = {}) {
  for (const [k, v] of breakpointTable) {
    dict["--mq-" + k] = `(min-width: ${v}px)`;
  }

  return dict;
}

/**
 * Turns a map of breakpoints into Custom Properties:
 * ```css
 * --viewport-small: 496px;
 * --viewport-medium: 768px;
 * ```
 * @param {[string, number][]} breakpointTable
 * @param {Record<string, string>} dict
 * @returns {Record<string, string>}
 */
function getCustomProps(breakpointTable, dict = {}) {
  for (const [k, v] of breakpointTable) {
    dict["--viewport-" + k] = v + "px";
  }

  return dict;
}

const breakpoints = {
  small: 640,
  medium: 768,
  large: 960,
  xlarge: 1200,
};

const breakpointTable = Object.entries(breakpoints);
const customMedia = getCustomMedia(breakpointTable);
const customProperties = getCustomProps(breakpointTable);

module.exports = {
  breakpoints,
  breakpointTable,
  customMedia,
  customProperties,
};
