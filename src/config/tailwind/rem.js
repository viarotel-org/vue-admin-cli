const { colors, mapClass, baseConfig } = require("./utils");
// const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  ...baseConfig,
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontSize: {
        "3xs": "0.125rem",
        "2xs": "0.5rem",
      },
      flexGrow: {
        // '2': '2'
        ...mapClass("$:$", 2, 10),
      },
      borderRadius: {
        // 'px-5': '5px'
        ...mapClass("px-$:$px", 5, 25, 1, 5),
      },
      spacing: {
        // 'px-2': '2px',
        ...mapClass("px-$:$px", 2, 10),

        // '1': '0.25rem',
        ...mapClass("$:$rem", 1, 10, 0.25),

        // '12': '3rem'
        ...mapClass("$:$rem", 12, 300, 0.25, 2),
      },
      inset: {
        "1/2": "50%",
        "-1/2": "-50%",
      },
      minWidth: {
        // 'px-2': '2px',
        ...mapClass("px-$:$px", 2, 10),

        // '1': '0.25rem',
        ...mapClass("$:$rem", 1, 10, 0.25),

        // '12': '3rem'
        ...mapClass("$:$rem", 12, 300, 0.25, 2),
      },
      minHeight: {
        // 'px-2': '2px',
        ...mapClass("px-$:$px", 2, 10),

        // '1': '0.25rem',
        ...mapClass("$:$rem", 1, 10, 0.25),

        // '12': '3rem'
        ...mapClass("$:$rem", 12, 300, 0.25, 2),
      },
      backgroundSize: {
        // 'w-1': '0.25rem auto',
        ...mapClass("w-$:$rem 100%", 1, 10, 0.25),
        // 'w-12': '3rem auto',
        ...mapClass("w-$:$rem 100%", 12, 100, 0.25, 2),

        // 'h-1': 'auto 0.25rem',
        ...mapClass("h-$:100% $rem", 1, 10, 0.25),
        // 'h-12': 'auto 3rem'
        ...mapClass("h-$:100% $rem", 12, 100, 0.25, 2),

        "w-full": "100% auto",
        "h-full": "auto 100%",
        full: "100% 100%",
      },
    },
    ...baseConfig.theme,
  },
};
