import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Img from "gatsby-image"

import insta_card from "../../content/assets/instagram-rect.svg"
import spoti_card from "../../content/assets/spotify-rect.svg"

const BlogIndex = ({ data }) => {

  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Home" />
      <div className="header">

        <div className="header--image">
          <Img loading="lazy" fluid={data.file.childImageSharp.fluid} />
        </div>

        <div className="header--links">
          <a className="card" href="https://example.com" target="_blank" rel="noreferrer">
            <img className="card" src={spoti_card} alt="Spotify Logo" />
          </a>
          <a className="card" href="https://example.com" target="_blank" rel="noreferrer">
            <img className="card" src={insta_card} alt="Instagram Logo" />
          </a>
        </div>
      </div>

      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <h1 style={{ textAlign: "center", margin: rhythm(1.5) }}>Der Blog zur Show</h1>

        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article className="article-preview" key={node.fields.slug} style={{ marginBottom: rhythm(2) }}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}

      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD. MMM YYYY", locale: "de")
            title
            # description
          }
        }
      }
    }
    
    file(relativePath: { eq: "podcast-cover.png" }) {
      childImageSharp {
        fluid(maxWidth: 1080, maxHeight: 1080, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
