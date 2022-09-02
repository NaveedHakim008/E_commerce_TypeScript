import Route from "@ioc:Adonis/Core/Route";

Route.post('/seller',async (ctx)=>{
  const {default:SellersController}=await import('App/Controllers/Http/SellersController')
  return new SellersController().sellerSignUp(ctx)
})
// Route.post('/login')
Route.patch('/seller/:id',async(ctx)=> {
  try {

    const {default: SellersController} = await import('App/Controllers/Http/SellersController')
    return new SellersController().sellerSignUp(ctx)
  } catch (e) {
    ctx.response.send(e)
  }
})
Route.post('seller/login',async (ctx)=>{
  const {default:SellersController}=await import('App/Controllers/Http/SellersController')
  return new SellersController().Login(ctx)

})
Route.post('seller/logout',async (ctx)=>{
  const {default:SellersController}=await import('App/Controllers/Http/SellersController')
  return new SellersController().logout(ctx)
})
