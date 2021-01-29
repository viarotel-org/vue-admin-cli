export const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const mapScreens = Object.keys(screens).reduce((obj, key) => {
  obj[key] = false;
  return obj;
}, {});

export function _resizeHandler(width, breakpoint) {
  // console.log("width", width);
  for (const key in breakpoint) {
    if (Object.hasOwnProperty.call(breakpoint, key)) {
      breakpoint[key] = width >= screens[key];
    }
  }
}
