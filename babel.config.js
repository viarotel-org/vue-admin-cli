const isProduction = process.env.NODE_ENV === "production";
// const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [
  [
    "component",
    {
      libraryName: "element-plus",
      libDir: "lib",
      style: false
    }
  ]
];
if (isProduction) {
  plugins.push("transform-remove-console"); // 生产环境移除console
}

module.exports = {
  plugins,
  presets: ["@vue/cli-plugin-babel/preset"]
};