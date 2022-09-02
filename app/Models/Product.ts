//import { DateTime } from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Category from "App/Models/Category";
import Cart from "App/Models/Cart";
import Order from "App/Models/Order";
export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public imageUrl:string

  @column()
  public cost:number

  @column()
  public sellerId:number

  @column()
  public details:string
  @column()
  public quantity:number

   @manyToMany(()=>Category,{
     pivotTable:'product_categories',
     pivotRelatedForeignKey:'category_id',
     pivotForeignKey:'product_id',
     localKey:'id',
     relatedKey:'id'
   })
   public productCategory:ManyToMany<typeof Category>


  @manyToMany(()=>Cart,{
    pivotTable:'cart_items',
    pivotRelatedForeignKey:'cart_id',
    localKey:'id',
    relatedKey:'id',
    pivotForeignKey:'product_id',
    pivotColumns:['quantity']
  })
  public cartItems:ManyToMany<typeof Cart>

  @manyToMany(()=>Order,{
    pivotTable:'ordered_items',
    pivotRelatedForeignKey:'order_id',
  })
  public orderItems:ManyToMany<typeof Order>


}
