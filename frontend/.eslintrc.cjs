module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["plugin:react/recommended", "prettier"],
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
