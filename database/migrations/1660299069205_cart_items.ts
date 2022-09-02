import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cart_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('cart_id').unsigned().references('id').inTable('carts').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.integer('quantity').notNullable()
      table.primary(['cart_id', 'product_id'])


    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
