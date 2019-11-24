const pagenvEnvVar = process.env.PAGENV_ENVIRONMENT_VAR || "ENVIRONMENT";

const environment = process.env[pagenvEnvVar];
if (environment && environment !== "development") {
  require("dotenv").config({ path: `./.env.${environment}` });
} else {
  require("dotenv").config();
}
const fs = require("fs-extra");
const pick = require("lodash/pick");

exports.onCreatePage = ({ page, actions, reporter }, configOptions) => {
  if (!configOptions || !configOptions.allowedVariables) {
    reporter.panicOnBuild(
      `Error: You must configure the allowedVariables for this plugin to work.`
    );
  }

  const mappedEnv = {};

  configOptions.allowedVariables.map(allowedVariable => {
    const key = allowedVariable.key;
    let type = allowedVariable.type;
    if (!type) {
      type = "String";
    }
    if (type === "Int" || type === "Int!") {
      mappedEnv[key] = +process.env[key];
    } else {
      mappedEnv[key] = process.env[key];
    }
  });

  const { createPage, deletePage } = actions;

  const oldPage = Object.assign({}, page);
  page.context = Object.assign({}, page.context, mappedEnv);

  deletePage(oldPage);
  createPage(page);
};
