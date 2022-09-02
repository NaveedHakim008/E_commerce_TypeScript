import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'auth_tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('expires_at')
      table.string('token')
      table.integer('user_id')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
