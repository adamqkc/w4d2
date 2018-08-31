const settings = require('./settings');

const first_name = process.argv[2];
const last_name = process.argv[3];
const birthdate = process.argv[4];

var knex = require('knex')({
  client: 'pg',
  connection: {
    user: settings.user,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});

knex('famous_people').insert({ 
  first_name: `${first_name}`, 
  last_name:  `${last_name}`, 
  birthdate:  `${birthdate}` 
  })
  .then(() => {
    console.log(`${first_name} ${last_name} successfully added!`);
  })


