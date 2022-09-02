import BaseSchema from '@ioc:Adonis/Lucid/Schema'
//import {rules} from "@ioc:Adonis/Core/Validator";

export default class extends BaseSchema {
  protected tableName = 'customers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',40).notNullable()
      table.string('password').notNullable()
      table.string('address',100).notNullable()
      table.string('alternate_address',100)
      table.string('email',30).unique().notNullable()
      table.string('avatar_url')
      table.string('phone_number').unique().notNullable()



      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
  //    table.timestamp('created_at', { useTz: true })
    //  table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
