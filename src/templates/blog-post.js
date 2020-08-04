import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/blogLayout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

import facebookLogo from "../../content/assets/facebook.svg"
import instagramLogo from "../../content/assets/instagram.svg"
import emailLogo from "../../content/assets/email.svg"


const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  const spotifyLink = () => {
    const str = post.frontmatter.spotifyLink;
    if(str !== "") {
      const id = (new URL(str)).pathname.slice(9);

      return <iframe title="Link zu Spotify" src={`https://open.spotify.com/embed-podcast/episode/${id}`} width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"/>
    } else {
      return "";
    }
  }

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: rhythm(.8),
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 8),
              display: `block`,
              marginBottom: rhythm(2),
            }}
          >
            {post.frontmatter.date.replace("$", "den")}
          </p>
        </header>

        <section dangerouslySetInnerHTML={{ __html: post.html }} />

        {spotifyLink()}

        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <div className="social">
          <h4 className="social--title">Was denkst du? Schreibe mir hier:</h4>
          <div className="social--links">
            <a href="https://www.facebook.com/luise.marie.169067" target="_blank" rel="noopener noreferrer">
              <img src={ facebookLogo } alt=""/>
            </a>
            <a href="https://www.instagram.com/luisemarieredet/" target="_blank" rel="noopener noreferrer">
              <img src={ instagramLogo } alt=""/>
            </a>
            <a href="mailto:redeueberwege@web.de" target="_blank" rel="noopener noreferrer">
              <img src={ emailLogo } alt=""/>
            </a>
          </div>
        </div>
        
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        

      
      </article>
              
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-around`,
            listStyle: `none`,
            padding: 0,
            margin: 0
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "dddd, $ DD.MM.YYYY", locale: "de")
        spotifyLink
      }
    }
  }
`
