const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')

const seedCategories = require('./seeds/category-seeds')
const seedProducts = require('./seeds/product-seeds')
const seedProductTags = require('./seeds/product-tag-seeds')
const seedTags = require('./seeds/tag-seeds')

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true }).then(() => {

  seedCategories();
  seedProducts();
  seedProductTags();
  seedTags();
}).then(() => {

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
})
