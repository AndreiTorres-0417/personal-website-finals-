module.exports = {
  transpileDependencies: true,
  devServer: {
    client: {
      webSocketURL: {
        hostname: 'localhost',
        pathname: '/ws',
        port: 8080,
        protocol: 'ws'
      }
    }
  }
};
