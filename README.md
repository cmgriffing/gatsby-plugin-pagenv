## Description

Using ENV variables inside of your Page Queries is not as easy as it might seem at first. This plugin handles injecting a whitelist of allowed ENV variables into your createPage context so that they can be used when making queries.

**Note: Static Queries in components are NOT supported.**

## How to install

Overview of Steps:

- Install Plugin as Dependency

- Create .env files

- Add plugin to config

- Modify/Create PageQuery

#### Install Plugin as Dependency

```shell
npm install -D gatsby-plugin-pagenv
```

or

```shell
yarn add -D gatsby-plugin-pagenv
```

#### Create .env Files

The development `.env` file is required as a base.

```shell
MY_ENV_VAR=devValue
```

From there, you will likely want to create a separate `.env.*` file where \* is the name of your other environment. Such as `.env.staging`.

```shell
MY_ENV_VAR=stagingValue
```

#### Add Plugin to Config

```javascript
{
  plugins: {
    {
      resolve: "gatsby-plugin-pagenv",
      options: {
        allowedVariables: ["INDEX_LOGO_IMAGE"],
      },
    }
  }
}
```

#### Modify/Create pageQuery

There are a couple important things to take note of.

You will pass the env variables you allowed into the query with a type annotation:

```graphql
query ($INDEX_LOGO_IMAGE: String!)
```

You can find out more about GraphQL types here:
[https://graphql.org/learn/schema/#scalar-types](https://graphql.org/learn/schema/#scalar-types)

Lastly, use the variable in your query somewhere:

```graphql
(relativePath: { eq: $INDEX_LOGO_IMAGE }) {
```

When you put them together, it will look something like this:

```graphql
export const pageQuery = graphql`
  query ($INDEX_LOGO_IMAGE: String!) {
    newPlaceholderImage: file(relativePath: { eq: $INDEX_LOGO_IMAGE }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
```

## Available options

- **allowedVariables**: _String[]_ - an array of the ENV variables you would like to be grabbed from process.env

## Passing Environment

By default, pagenv looks at the `ENVIRONMENT` env variable.

eg:

```shell
ENVIRONMENT=staging yarn build
```

If you would like to change the env variable name that pagenv looks for you can do so with `PAGENV_ENVIRONMENT_VAR`.

eg:

```shell
PAGENV_ENVIRONMENT_VAR=DEPLOY_ENV DEPLOY_ENV=staging yarn build
```

## When do I use this plugin?

Examples:

- Loading mock data in Development

- Changing image processing values to speed up Development

## Examples of usage

You can see a full example within the `examples/` folder of this repo. We will add more as more use cases are discovered.

## How to run tests

?

## How to develop locally

?

## How to contribute

If you have unanswered questions, would like help with enhancing or debugging the plugin, it is nice to include instructions for people who want to contribute to your plugin.
