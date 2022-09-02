//import { DateTime } from 'luxon'
import {BaseModel, beforeSave, column, hasOne, HasOne} from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";
import Hash from "@ioc:Adonis/Core/Hash";

export default class Seller extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name:string

  @column()
  public inventoryAddress:string


  @column()
  public email:string

  @column()
  public phoneNumber:string

  @column()
  public password:string
  @column()
  public avatarUrl:string

  @hasOne(()=>Product,{
    foreignKey:'sellerId'
  })
  public product:HasOne<typeof Product>
  @beforeSave()
  public static async hashPassword(seller:Seller)
  {
    if(seller.$dirty.password){
      seller.password=await Hash.make(seller.password)
    }
  }
}
