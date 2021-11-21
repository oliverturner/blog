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

export const breakpoints = {
  small: 640,
  medium: 768,
  large: 960,
  xlarge: 1200,
};

export const breakpointTable = Object.entries(breakpoints);
export const customMedia = getCustomMedia(breakpointTable);
export const customProperties = getCustomProps(breakpointTable);

