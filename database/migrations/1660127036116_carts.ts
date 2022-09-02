import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'carts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').unsigned().references('id').inTable('customers').onDelete('CASCADE')



    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
