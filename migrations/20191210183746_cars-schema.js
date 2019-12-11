
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.decimal('VIN')
            .unique()
            .notNullable();
      tbl.string('make').notNullable();
      tbl.string('model').notNullable();
      tbl.decimal('mileage').notNullable();  
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
