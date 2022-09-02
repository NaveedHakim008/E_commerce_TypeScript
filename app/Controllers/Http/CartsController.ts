import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from "App/Models/Product";
import Cart from "App/Models/Cart";
import Database from "@ioc:Adonis/Lucid/Database";
import Order from "App/Models/Order";
import Customer from "App/Models/Customer";
export default class CartsController {

  public addItem=async({auth,request,response}:HttpContextContract)=>{
    try {
      const customer = await auth.use('api').authenticate()
       customer.serialize()
      const cust=await Customer.findByOrFail('email',customer.email)

       const {productId} = request.params()
      const product = await Product.findByOrFail('id', productId)
      const cart = await Cart.findByOrFail('customerId', cust.id)
      if (product) {
        if (product.quantity > 0) {
          await product.merge({quantity: product.quantity - 1}).save()
          const cartItems = await Product.query().whereHas('cartItems', (builder) => {

            builder.where('cart_id', cart.id)
          })



          if (cartItems.length === 0) {
            await cart.related('cartItems').attach({
              [product.id]: {
                quantity: 1

              }

            })
            response.status(200).send('product added to cart')

          } else{

                    const productQuantity=await Database.from('cart_items').where({product_id:product.id}).select('quantity')

            await Database.from('cart_items').where({cart_id:cart.id,
                    product_id:product.id}).update({quantity:productQuantity[0].quantity+1},['quantity'])
            response.status(200).send('product added to cart')
          }


        }
        else
         response.send('item is soldout')
      }
      else
        response.send('no such product found')
    }catch(e){
      response.status(500).send(e)
    }

  }
  public removeItem=async ({auth,request,response}:HttpContextContract)=>{
    try{
      const customer = await auth.use('api').authenticate()
      customer.serialize()
      const {productId}=request.params()
      const {id} = await Customer.findByOrFail('email',customer.email)
      const product = await Product.findByOrFail('id',productId)
      const cart = await Cart.findByOrFail('customerId', id)
      if(product)
      {
        await product.merge({quantity: product.quantity +1}).save()
        const cartItems = await Product.query().whereHas('cartItems', (builder) => {

          builder.where('cart_id', cart.id)
        })
        if (cartItems.length > 1) {
          const productQuantity=await Database.from('cart_items').where({product_id:product.id}).select('quantity')

          await Database.from('cart_items').where({cart_id:cart.id,
            product_id:product.id}).update({quantity:productQuantity[0].quantity-1})
          response.status(200).send('product remove from cart successfully')
        }
        else
        {
          await Database.from('cart_items').where({cart_id:cart.id,
            product_id:product.id}).del()
          response.status(200).send('product remove from cart successfully')


      }

    }
  }catch(e)
    {
      response.status(500).send(e)
    }
  }
  public proceedToOrder=async ({auth,response}:HttpContextContract)=>{
    try {
      const customer = await auth.use('api').authenticate()
      customer.serialize()
      const {id}=await Customer.findByOrFail('email',customer.email)
       const cart = await Cart.findByOrFail('customerId', id)
       const order=await Order.create({customerId:id,paymentStatus:false})
       const cartItems=await Database.from('cart_items').where({cart_id:cart.id})
        cartItems.forEach(async (cartItem)=>{
          await order.related('orderedItems').attach({
              [cartItem.product_id]: {
                quantity: cartItem.quantity
             }
            }
          )
        })
       cartItems.forEach(async (cartItem)=>
       {await Database.from('cart_items').where({product_id:cartItem.product_id,cart_id:cartItem.cart_id}).del()})
      const bill = await Database.rawQuery(
        `select o.quantity*p.cost as totalBill from products as p inner join ordered_items as o on p.id=o.product_id where o.order_id=?`, [order.id])
      const {totalBill} = bill[0][0]
      await order.merge({totalBill:totalBill})
      response.send({msg:'proceeded to order successfully',order})

    }

    catch(e)
    {
      response.status(500).send(e)
    }
  }
}

