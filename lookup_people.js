const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  const first_name = process.argv[2];
  
  if (err) {
    return console.error("Connection Error", err);
  }

  function getPeopleByFirstName(first_name) {
    console.log('Searching...');
  
    client.query(`
    select * 
    from famous_people as people 
    where people.first_name = $1::text`, [first_name], (err, result) => {
      if (err) {
        console.log('Error: ', err);
      }
  
      console.log(`Found ${result.rows.length} person(s) by the name '${first_name}':`)
      
      result.rows.forEach(row => {
        console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born ${row.birthdate.toLocaleDateString()}`);
      });
      client.end();
    });
  }
  getPeopleByFirstName(first_name);
}); 
