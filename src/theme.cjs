/**
 * Turns a map of breakpoints into customMedia rules:
 * ```css
 * --mq-small: 496px;
 * --mq-medium: 768px;
 * ```
 * @param {[string, number][]} breakpointTable
 * @returns {Record<string, string>}
 */
function getCustomMedia(breakpointTable) {
  /** @type {Record<string, string>} */
  const mqs = {};
  for (const [k, v] of breakpointTable) {
    mqs["--mq-" + k] = `(min-width: ${v}px)`;
  }

  return mqs;
}

/**
 * Turns a map of breakpoints into Custom Properties:
 * ```css
 * --viewport-small: 496px;
 * --viewport-medium: 768px;
 * ```
 * @param {[string, number][]} breakpointTable
 * @returns {Record<string, string>}
 */
function getCustomProps(breakpointTable) {
  /** @type {Record<string, string>} */
  const props = {};
  for (const [k, v] of breakpointTable) {
    props["--viewport-" + k] = v + "px";
  }

  return props;
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
