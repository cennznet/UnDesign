const {
  fileHeader,
  formattedVariables,
  iconsWithPrefix,
  minifyDictionary,
  sortByReference,
  createPropertyFormatter,
  sortByName,
} = require("style-dictionary/lib/common/formatHelpers");

const MAPPER = {
  color: "Color",
  size: "FontSize",
};

module.exports = {
  source: ["tokens/**/*.json"],
  format: {
    lol: function ({ dictionary, options = {}, file }) {
      const selector = options.selector ? options.selector : `:root`;
      const { outputReferences } = options;

      const tokenGroups = {};
      dictionary.allTokens.forEach((token) => {
        const tokenKey = `${token.attributes.category}-${token.attributes.type}`;
        if (!tokenGroups[tokenKey]) {
          tokenGroups[tokenKey] = [];
        }
        tokenGroups[tokenKey].unshift(token);
      });
      return (
        fileHeader({ file }) +
        `${selector} {\n
          
          ` +
        Object.values(tokenGroups)
          .map((tokens) => {
            return `
                  
  /**
  * @tokens ${tokens[0].attributes.category}-${tokens[0].attributes.type}
  * @presenter ${
    MAPPER[tokens[0].attributes.category] ||
    (() => {
      throw new Error(
        "No mapped presenter for " + tokens[0].attributes.category
      );
    })()
  }
  */
${formattedVariables({
  format: "css",
  dictionary: {
    ...dictionary,
    allTokens: tokens,
  },
  outputReferences,
})}`;
          })
          .join("\n\n") +
        `\n}\n`
      );
    },
  },
  platforms: {
    css: {
      transformGroup: "css",
      files: [
        {
          destination: "dist/variables.css",
          format: "lol",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
