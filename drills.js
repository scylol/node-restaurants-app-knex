// clear the console before each run
process.stdout.write('\033c');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const Treeize = require('treeize');

const restaurant = new Treeize();

// Require Knex and make connection
const knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'dev-restaurants-app'
  },
  debug: true
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
//     .whereIn('address_zipcode', ['10012', '10013', '10014'])
// //SPAGHETTI ARCHIVE
// //     .andWhere(function(){this.where('address_zipcode', '10012')
// //     .orWhere('address_zipcode', '10013')
// //     .orWhere('address_zipcode', '10014')})
// //     .orderBy('name', 'asc')
//     .limit(5)
//     .then(results => console.log(JSON.stringify(results, null, 2))); 
// knex('restaurants').insert({name:'Byte Cafe', borough:'Brooklyn', cuisine:'coffee', address_building_number:'123', address_street:'Atlantic Avenue', address_zipcode:'11231'}, ['id', 'name'])
// .then(res => console.log(res));


// knex('restaurants').insert([
//   {name:'Byte Cafe', borough:'Brooklyn', cuisine:'coffee', address_building_number:'123', address_street:'Atlantic Avenue', address_zipcode:'11231'},
//   {name:'Bytes Chaffe', borough:'Brooklyn', cuisine:'coffee', address_building_number:'126', address_street:'Atlantic Street', address_zipcode:'11234'},
//   {name:'Bits Casdfasdfe', borough:'Queens', cuisine:'coffee', address_building_number:'153', address_street:'Atlantic Boulevard', address_zipcode:'11221'}
//   ], ['id', 'name'])
//   .then(res => console.log(JSON.stringify(res, null, 2)));

// knex('restaurants').where('nyc_restaurant_id', '30191841')
// .update({
//   name: 'DJ Reynolds Pub and Restaurant'
// }).then(res => console.log(JSON.stringify(res, null, 2)));

// knex('restaurants').select().where('nyc_restaurant_id', '30191841').then(res => console.log(JSON.stringify(res, null, 2)));


// knex('grades').select().where('id', 13).then(res => console.log(JSON.stringify(res, null, 2)));
// knex('grades').where('id', 13).del().then(res =>(null));
// knex('grades').select().where('id', 13).then(res => console.log(JSON.stringify(res, null, 2)));

// knex('restaurants').where('id', 50).del().then(res => console.log(res));
// app.get('/restaurants', (req, res) => {

//     let resObject ={};
//     knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as gradeId', 'grade', 'score')
//         .from('restaurants')
//         .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
//         .orderBy('date', 'desc')
//         .limit(10)
//         .then(results =>{
//         results.forEach(row =>{
//             if (!(row.id in resObject)){
//               resObject[row.id] = {
//                 name: row.name,
//                 cuisine: row.cuisine,
//                 borough: row.borough,
//                 grades: []
//               }  
//             }
//             resObject[row.id].grades.push({
//               gradeId: row.gradeId,
//               grade: row.grade,
//               score: row.score
//             })
//           })
//           res.json(resObject);
//           })
// });

app.use(bodyParser.json());
app.get('/restaurants', (req, res) => {

    let resObject ={};
    knex.select('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id as grades:id', 'grade as grades:grade', 'score as grades:score')
        .from('restaurants')
        .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
        .orderBy('date', 'desc')
        .limit(10)
        .then(results =>{
          restaurant.grow(results);
          res.json(restaurant.getData());

        })
});

app.post('/restaurants', (req, res) =>{
  console.log (req.body);
  const requiredFields = ['name', 'cuisine', 'borough', 'grades'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  knex.from('restaurants')
  .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')
  .insert(req.body)
  .then(end => console.log('inserted', end));
  // const item = ShoppingList.create(req.body.name, req.body.budget);
  res.status(201).json(req.body);


})



app.listen(process.env.PORT || 8080);

// {
//     "name": "Terra Byte Cafe",
//     "cuisine": "American",
//     "borough": "Brooklyn",
//     "grades": [
//        {
//            "grade": "C",
//            "score": 42
//        },
//        {
//            "grade": "B",
//            "score": 72
//        },
//        {
//            "grade": "D",
//            "score": 35
//        },
//        {
//            "grade": "A",
//            "score": 95
//        }
//     ]
// }