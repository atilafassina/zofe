const path = require('path')

// Merge webpack configs
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const config = getConfig()

  // Add custom alias for the components
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(config.context, 'src/components'),
        '@helpers': path.resolve(config.context, 'src/helpers'),
        '@images': path.resolve(config.context, 'src/images'),
      },
    },
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const episodeTemplate = path.resolve('src/templates/Episode/index.js')

    resolve(
      graphql(`
        {
          allContentfulEpisode {
            edges {
              node {
                id
                slug
                episodeNumber
              }
            }
          }
        }
      `).then(result => {
        if (result.erros) {
          reject(result.erros)
        }

        result.data.allContentfulEpisode.edges.forEach(edge => {
          createPage({
            path: edge.node.slug,
            component: episodeTemplate,
            context: {
              episodeNumber: edge.node.episodeNumber,
            },
          })
        })
        return
      })
    )
  })
}
