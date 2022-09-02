import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sellers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',40).unique().notNullable()
      table.string('password',30).notNullable()
      table.string('inventory_address',100).notNullable()
      table.string('email',30).unique().notNullable()
      table.string('avatar_url')
      table.string('phone_number').unique().notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
