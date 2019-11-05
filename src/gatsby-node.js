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
  const env = pick(process.env, configOptions.allowedVariables);
  const { createPage, deletePage } = actions;

  const oldPage = { ...page };

  page.context = {
    ...page.context,
    ...env
  };

  deletePage(oldPage);
  createPage(page);
};
