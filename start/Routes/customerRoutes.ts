import Route from "@ioc:Adonis/Core/Route";
//import Customer from "App/Models/Customer";


Route.post('/customers',async (ctx)=>{
  const {default:CustomersController}=await import('App/Controllers/Http/CustomersController')
  return new CustomersController().customerSignUp(ctx)
})
Route.post('customer/login',async (ctx)=>{
  const {default:CustomersController}=await import('App/Controllers/Http/CustomersController')
  return new CustomersController().Login(ctx)

})
Route.post('customer/logout',async (ctx)=>{
  const {default:CustomersController}=await import('App/Controllers/Http/CustomersController')
  return new CustomersController().logout(ctx)
})


Route.patch('/customer',async(ctx)=> {


    const {default: CustomersController} = await import('App/Controllers/Http/CustomersController')
    return new CustomersController().customerUpdation(ctx)

})
Route.post('/carts/:productId',async(ctx)=>{
  const {default: CartsController} = await import('App/Controllers/Http/CartsController')
  return new CartsController().addItem(ctx)
})
Route.delete('/carts/:productId',async(ctx)=>{
  const {default: CartsController} = await import('App/Controllers/Http/CartsController')
  return new CartsController().removeItem(ctx)
})

Route.post('/cart',async(ctx)=>{
  const {default:CartsController}=await import('App/Controllers/Http/CartsController')
  return new CartsController().proceedToOrder(ctx)

})

