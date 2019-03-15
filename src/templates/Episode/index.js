import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '@components/Layout'
import EpisodeContent from '@components/EpisodeContent'
import Comments from '@components/Comments'
import './styles.css'

const Episode = props => {
  const {
    title,
    slug,
    postText,
    audioUrl,
    episodeGuide,
    publishDate,
  } = props.data.contentfulEpisode

  return (
    <Layout episodeData={props.data.contentfulEpisode} foo="bar">
      <article className="episode u-full-width">
        <header className="episode-header u-full-width">
          <h2 className="episode-title">
            <a
              href={slug}
              title={title}
              className="latest-post-title"
              rel="bookmark"
            >
              {title}
            </a>
          </h2>
          <p className="timestamp">De {publishDate}</p>
        </header>

        {Boolean(postText) && (
          <div className="episode-content container">
            <div
              className="row"
              dangerouslySetInnerHTML={{
                __html: postText.childMarkdownRemark.html,
              }}
            />
          </div>
        )}

        <EpisodeContent audioUrl={audioUrl} episodeGuide={episodeGuide} />

        <footer className="episode-meta container">
          <div className="row">
            <Comments slug={slug} />
          </div>
        </footer>
      </article>
    </Layout>
  )
}

Episode.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Episode

export const pageQuery = graphql`
  query episodeQuery($episodeNumber: Int!) {
    site {
      siteMetadata {
        title
        summary
        siteUrl
        twitter
      }
    }

    contentfulEpisode(episodeNumber: { eq: $episodeNumber }) {
      title
      slug
      audioUrl
      publishDate(formatString: "DD/MM/YYYY", locale: "pt-BR")
      cover {
        description
        file {
          url
        }
      }
      postText {
        childMarkdownRemark {
          html
        }
      }
      episodeGuide {
        id
        title
        timestamp
        url
      }
    }
  }
`
