import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductPostingValidator from "App/Validators/ProductPostingValidator";
import Product from "App/Models/Product";
import cloudinary from "@ioc:Adonis/Addons/Cloudinary"
import ProuductUpdationValidator from "App/Validators/ProuductUpdationValidator";
import Category from "App/Models/Category";
import Seller from "App/Models/Seller";
export default class ProductsController {
  public productPosting = async({auth,request,response}:HttpContextContract)=>{
    const seller=await auth.use('api').authenticate()
     seller.serialize()
    const {id}=await Seller.findByOrFail('email',seller.email)

    console.log(id)

    const productImage = request.file('productImg', {

      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })
    if(productImage)
    {
             if(productImage.isValid) {

               try{
                 const imageDetail = await cloudinary.upload(productImage, productImage.clientName)
                 await request.validate(ProductPostingValidator)
                 const {name,quantity,details,cost}=request.body()
                 const product=await Product.create({name:name,quantity:quantity,sellerId:id,details:details,cost:cost,imageUrl:imageDetail.public_id})


                 const category=await Category.findByOrFail('name',request.body()['category'])
                 await product.related('productCategory').attach([category.id])
                 response.status(200).send("product inserted succesfully")

             }
             catch(e)
             {
                 response.status(500).send(e)
             }

             }
             else
               response.send('this  file format is not supported')
    }
    else
    {

      response.status(404).send('image not found')}
    }

  public productUpdation=async({auth,request,response}:HttpContextContract)=> {
    try {
      await auth.use('api').authenticate()
      await request.validate(ProuductUpdationValidator)
      const {id} = request.params()
      const product = await Product.findByOrFail('id', id)
      const updatedField = Object.keys(request.body())
      const modifiedfield = {}
      //if(updatedField.includes('productImg')) {
      await cloudinary.destroy(product.imageUrl)
      const productImage = await request.file('productImg', {
        size: '2mb',
        extnames: ['jpg', 'png', 'gif'],
      })

      if (productImage?.isValid) {

        const imageDetail = await cloudinary.upload(productImage, productImage.clientName)
        console.log(imageDetail)
        modifiedfield['imageUrl'] = imageDetail.public_id


      } else
        response.send('the file format is not supported')


      updatedField.forEach((update) =>
        modifiedfield[update] = request.body()[update]
      )

      await product.merge(modifiedfield).save()
      response.status(200).send('product updated successfully')
    } catch (e) {
      response.status(500).send(e)

    }
  }
    public productDeletion=async ({auth,request,response}:HttpContextContract)=>{

      const {id}=request.params()
      try{
        await auth.use('api').authenticate()
        const product=await Product.findByOrFail('id',id)
        if(product)
        {
          //const productImg=product.imageUrl
          await cloudinary.destroy(product.imageUrl)
          await product.delete()
          response.status(200).send('product deleted successfully')
        }
        else
          response.send('product not found')
      }
      catch(e)
      {
        response.status(500).send(e)
      }



    }

   public findProductByName =async ({auth,request,response}:HttpContextContract)=>{
     await auth.use('api').authenticate()
    const {name}=request.params()
     console.log(name)
    try{
      const product=await Product.query().whereILike('name',`%${name}%`)
 //     console.log(product.length)
      response.send(product)
    }
    catch(e)
    {
      response.status(500).send(e)
    }
  }
    public getProductBySeller=async ({auth,response})=>{
    try{
      const seller =await auth.use('api').authenticate()
      seller.serialize()
      const {id}=await Seller.findByOrFail('email',seller.email)
      const product=await Product.findByOrFail('sellerId',id)
      if(product)
      {
        response.status(200).send(product)

      }
      else
        response.status(404).send('no product is posted by this seller')


  }catch(e){
    response.status(500).send(e)}
    }
}
