module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'WEB',
      script    : 'server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      },
      exec_interpreter: './node_modules/.bin/babel-node'
    }

  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : '118.190.207.224',
      ref  : 'origin/master',
      repo : 'git@github.com:hetaojun/cword-web.git',
      path : '/root/workspace/cword-web',
      'post-deploy' : 'git pull && yarn && pm2 startOrRestart ecosystem.config.js --interpreter ./node_modules/.bin/babel-node --env production'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    },
  }
};
