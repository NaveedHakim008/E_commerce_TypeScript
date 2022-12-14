//import { DateTime } from 'luxon'
import {BaseModel, beforeSave, column} from '@ioc:Adonis/Lucid/Orm'
import Hash from "@ioc:Adonis/Core/Hash";

export default class PaymentDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customerId:number

  @column()
  public cardNumber:string

  @beforeSave()
  public static async hashPassword(customerDetail:PaymentDetail)
  {
    if(customerDetail.$dirty.cardNumber){
      customerDetail.cardNumber=await Hash.make(customerDetail.cardNumber)
    }
  }


}
