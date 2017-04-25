// clear the console before each run
process.stdout.write('\033c');

// Require Knex and make connection
const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'dev-restaurants-app'
  },
});

// If you're using ElephantSQL then the connection will look like this
/*
const knex = require('knex')({
  client: 'pg',
  connection:'postgres://USERNAME:PASSWORD@stampy.db.elephantsql.com:5432/USERNAME'
}
*/

// Sample select 
// knex.select('id', 'name', 'borough', 'cuisine')
//     .from('restaurants')
//     .then(results => console.log(results));

// knex.select()
//     .from('restaurants')
//     .then(results => console.log(results));

// knex.select()
//     .from('restaurants')
//     .where('cuisine', 'Italian')
//     .then(results => console.log(results));

// knex.select('id', 'name')
//     .from('restaurants')
//     .where('cuisine', 'Italian')
//     .limit(10)
//     .then(results => console.log(results));

// knex.count()
//     .from('restaurants')
//     .where('cuisine', 'Thai')
//     .then(results => console.log(results));

// knex.count()
//     .from('restaurants')
//     .where({cuisine:'Thai', address_zipcode: '11372'})
//     .then(results => console.log(results));

// knex.select('id', 'name', 'address_zipcode')
//     .from('restaurants')
//     .where('cuisine', 'Italian')
//     .andWhere(function(){this.where('address_zipcode', '10012')
//     .orWhere('address_zipcode', '10013')
//     .orWhere('address_zipcode', '10014')})
//     .orderBy('name', 'asc')
//     .limit(5)
//     .then(results => console.log(results)); 

