export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  designToken: {
    files: [
      {
        filename: "dist/variables.css",
        content: require("!!raw-loader!../dist/variables.css").default,
      },
    ],
  },
};
