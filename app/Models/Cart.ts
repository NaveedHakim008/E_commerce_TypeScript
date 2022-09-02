//import { DateTime } from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public customerId:number
  @manyToMany(()=>Product,{
    pivotTable:'cart_items',
    pivotRelatedForeignKey:'product_id',
    pivotForeignKey:'cart_id',
    localKey:'id',
    relatedKey:'id',
    pivotColumns:['quantity']
  })
  public cartItems:ManyToMany<typeof Product>

}
