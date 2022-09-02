import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',30).notNullable()
      table.string('image_url').notNullable()
      table.integer('cost').notNullable()
      table.integer('quantity')
      table.string('details').notNullable()
      table.integer('seller_id').unsigned().references('id').inTable('sellers').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
