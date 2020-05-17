/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from 'react-helmet'

import Header from "./header"
import "./layout.css"
import Footer from './Footer'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
          description
          keywords
        }
      }
      allContentfulLink (sort: { fields: [createdAt], order: ASC }) {
        edges {
          node {
            title
            url
            createdAt
          }
        }
      }
    }
  `)

  return (
    <>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
          { name: 'keywords', content: data.site.siteMetadata.keywords },
        ]}
      />
      <Header />
      <main>{children}</main>
      <Footer data={data}>
        了解更多的 SVG 知识 <a href="janily.github.io">了解更多的 SVG 知识</a> © 2020
      </Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
