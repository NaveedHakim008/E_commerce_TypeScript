//import { DateTime } from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customerId:number

  @column()
  public paymentStatus:boolean

  @column()
  public totalBill:number

  @manyToMany(()=>Product,{
    pivotTable:"ordered_items",
    pivotRelatedForeignKey:'product_id',
    localKey:'id',
    pivotForeignKey:'order_id',
    relatedKey:'id',
    pivotColumns:['quantity']
  })
  public orderedItems:ManyToMany<typeof Product>



}
