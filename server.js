const express = require('express');
const bodyParser = require('body-parser');



// const { DEV } = require('./config');
// const knex = require('knex')(DEV);
const knex = require('knex')({
	client: 'pg',
	connection: {
		database: 'dev-restaurants-app'
	},
	debug: true
});

const app = express();
app.use(bodyParser.json());

app.get('/restaurants', (req, res) => {

	knex.select('id', 'name', 'cuisine', 'borough')
    .select(knex.raw('CONCAT(address_building_number, \' \', address_street, \' \', address_zipcode ) as address'))
    .from('restaurants')
    .limit(10)
    .then(results => res.json(results));
});

app.get('/restaurants/:id', (req, res) => {
	let {id} = req.params;
	knex.first('restaurants.id', 'name', 'cuisine', 'borough', 'grades.id', 'grade', 'date as inspectionDate', 'score')
    .select(knex.raw('CONCAT(address_building_number, \' \', address_street, \' \', address_zipcode ) as address'))
    .from('restaurants')
    .where('restaurants.id', id)
    .innerJoin('grades', 'restaurants.id', 'grades.restaurant_id')    
    .orderBy('date', 'desc')
    .then(results => res.json(results));
});



app.listen(process.env.PORT || 8080);