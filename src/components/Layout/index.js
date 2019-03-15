import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Meta from '@components/Meta'
import Footer from '@components/Footer'
import './styles.css'

const Layout = ({ children }) => {
  const episodeData = {
    slug: 'Slug',
    title: 'Title',
    cover: {
      file: {
        url: 'Cover URL',
      },
    },
  }

  return (
    <StaticQuery
      query={graphql`
        query HelmetSiteMetaData {
          site {
            siteMetadata {
              title
              summary
              siteUrl
              twitter
            }
          }
        }
      `}
      render={data => {
        const linkUrl = episodeData.slug
          ? `${data.site.siteMetadata.siteUrl}/${episodeData.slug}`
          : data.site.siteMetadata.siteUrl
        const pageTitle = episodeData.title
          ? `${episodeData.title} - ${data.site.siteMetadata.title}`
          : data.site.siteMetadata.title
        const pageImage = episodeData.cover
          ? episodeData.cover.file.url
          : 'https://ssl-static.libsyn.com/p/assets/b/5/f/5/b5f5f7dc5d63426d/zofe-ready.png'

        return (
          <Fragment>
            <Helmet>
              <html lang="pt-br" />
              <meta property="og:title" content={pageTitle} />
              <meta
                property="og:description"
                content={data.site.siteMetadata.summary}
              />
              <meta property="og:image" content={pageImage} />
              <meta property="og:url" content={linkUrl} />
              <meta property="og:site_name" content={pageTitle} />
              <meta
                property="og:description"
                content={data.site.siteMetadata.summary}
              />
              <meta property="og:url" content={linkUrl} />
              <meta
                name="twitter:site"
                content={data.site.siteMetadata.twitter}
              />
              <meta name="twitter:title" content={pageTitle} />
              <meta
                name="twitter:description"
                content={data.site.siteMetadata.summary}
              />
              <meta name="twitter:image" content={pageImage} />
              <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <div className="wrapper">
              <div className="meta">
                <Meta className="sidebarContent" />
              </div>

              <div id="main-content" className="main">
                {children}
              </div>
            </div>

            <Footer />
          </Fragment>
        )
      }}
    />
  )
}

// const Layout = props => {
//    return ()
// }

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
