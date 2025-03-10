// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: 'react-dev-server',
        script: 'npm',
        args: 'start',
        watch: true,
        env: {
          NODE_ENV: 'development',
          PORT: 3000,
        },
      },
    ],
  };
  