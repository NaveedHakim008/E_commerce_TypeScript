import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AuthToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public userId:number
  @column ()
  public token:string

  @column.dateTime()
  public expiresAt:DateTime



}
