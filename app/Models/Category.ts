//import { DateTime } from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string


  @manyToMany(()=>Product,{
    pivotTable:'product_categories',
    pivotRelatedForeignKey:'product_id',
    localKey: 'id',
    pivotForeignKey: 'category_id',
    relatedKey: 'id'

  })
  public productCategory:ManyToMany<typeof Product>


}
