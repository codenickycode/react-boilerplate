import { RuleSetUseItem } from "webpack";

const postCssLoader: RuleSetUseItem = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: ["tailwindcss", "autoprefixer"],
    },
  },
};

export default postCssLoader;
