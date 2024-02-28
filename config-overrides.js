module.exports = function override(config, env) {
  // do stuff with the webpack config...
  if (config.output) {
    config.output.filename = 'static/js/[name].js';
    config.output.chunkFilename = 'static/js/[name].chunk.js';
  }
  config.plugins.forEach((plugin) => {
    if (plugin.constructor.name === 'MiniCssExtractPlugin') {
      plugin.options.filename = 'static/css/[name].css';
      plugin.options.chunkFilename = 'static/css/[name].chunk.css';
    }
  });
  config.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  };

  return config;
};
