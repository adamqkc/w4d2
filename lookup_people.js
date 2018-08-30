const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  
  const first_name = process.argv[2];

  client.query(`
    select * 
    from famous_people as people 
    where people.first_name = $1::text`, [first_name], (err, result) => {
    
      if (err) {
      return console.error("error running query", err);
      }
    
      console.log(result.rows);
      client.end();
    });
}); 