module.exports = {
  transpileDependencies: [],
  devServer: {
    client: {
      webSocketURL: {
        hostname: 'localhost',
        pathname: '/ws',
        port: 8080,
        protocol: 'ws'
      }
    }
  },
  lintOnSave: false // ✅ Disable ESLint properly
};
