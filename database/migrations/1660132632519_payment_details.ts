import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payment_details'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').unsigned().references('id').inTable('customers').onDelete('CASCADE')
      table.string('card_number')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
