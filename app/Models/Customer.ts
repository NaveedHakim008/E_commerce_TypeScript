//import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {BaseModel, beforeSave, column, hasMany,HasMany, HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Cart from "App/Models/Cart";
import Order from "App/Models/Order";
import PaymentDetail from "App/Models/PaymentDetail";
export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name:string

  @column()
  public address:string

  @column()
  public alternateAddress:string

  @column()
  public email:string

  @column()
  public phoneNumber:string

  @column()
  public password:string
  @column()
  public avatarUrl:string

  @hasOne(()=>Cart,{
    foreignKey:"customerId"
  })
  public cart:HasOne<typeof Cart>

  @hasMany(()=>Order,{
    foreignKey:'customerId'

  })
  public orders:HasMany<typeof Order>

  @hasOne(()=>PaymentDetail,{
    foreignKey:"customerId"
  })
  public customerPaymentDetails:HasOne<typeof PaymentDetail>



   @beforeSave()
   public static async hashPassword(customer:Customer)
   {
     if(customer.$dirty.password){
       customer.password=await Hash.make(customer.password)
     }
   }
}
