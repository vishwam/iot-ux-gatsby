import React from "react"
import { Link, graphql } from "gatsby"
import { Shell, DateTimeField } from "@microsoft/azure-iot-ux-fluent-controls";

import './shell.fonts.scss';

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Shell masthead={{
      branding: 'My Gatsby Site'
    }}>
      <Layout>
        <SEO title="Home" />
        <h1>Hello World!</h1>
        <div>{data.site.siteMetadata.description}</div>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <DateTimeField
              name='date-picker-0'
              initialValue={'Sep 20, 2010 05:00:00 GMT'}
              label='Default example (Local)'
              localTimezone={true}
              onChange={(newValue) => alert(newValue)}
        />
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    </Shell>
  );
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
  }
`;

export default IndexPage
