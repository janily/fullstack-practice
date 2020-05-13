import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="Hero">
      <div className="HeroGroup">
        <h1>“Learn to <br />design and code React apps”</h1>
        <p>“Complete courses about the best tools and design systems. Prototype and build apps with React and Swift.”</p>
        <p>Now go build something great.</p>
      </div>
    </div>
    {/* <Link to="/page-2/">Go to page 2</Link> */}
    <Link to="/video">Watch the video</Link>
  </Layout>
)

export default IndexPage
