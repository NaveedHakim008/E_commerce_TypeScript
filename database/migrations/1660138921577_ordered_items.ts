import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ordered_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.integer('quantity').notNullable()
      table.primary(['order_id','product_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
