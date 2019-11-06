import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

/**
 * @injectedENV
 * @var:ENVIRONMENT
 */

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
      <Img fluid={data.newPlaceholderImage.childImageSharp.fluid} />
    </div>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query($INDEX_LOGO_IMAGE: String!) {
    newPlaceholderImage: file(relativePath: { eq: $INDEX_LOGO_IMAGE }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
