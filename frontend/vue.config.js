module.exports = {
   
    devServer: {
       // see: https://cli.vuejs.org/config/#devserver-proxy)
       // `npm run serve` ne gère que des requêtes statiques vers index.html, css/, etc.
       // les requêtes autres peuvent être redirigées
 
       proxy: {
          '/socket.io/.*': {
             target: 'http://localhost:3030',
          },
          '/oauth/.*': {
             target: 'http://localhost:3030',
          },
          '/static/.*': {
             target: 'http://localhost:3030',
          },
       },
    },
 }
 