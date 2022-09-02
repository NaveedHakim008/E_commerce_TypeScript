import Route from "@ioc:Adonis/Core/Route";

Route.get('/product/:name',async (ctx)=>{
  const {default:ProductsController}=await import('App/Controllers/Http/ProductsController')
  return new ProductsController().findProductByName(ctx)
})
Route.patch('/product/:id',async(ctx)=>{
  const {default:ProductsController}=await import('App/Controllers/Http/ProductsController')
  return new ProductsController().productUpdation(ctx)
})
Route.post('/product',async(ctx)=>{
  const {default:ProductsController}=await import('App/Controllers/Http/ProductsController')
  return new ProductsController().productPosting(ctx)
})
Route.get('/products',async(ctx)=>{
  const {default:ProductsController}=await import('App/Controllers/Http/ProductsController')
  return new ProductsController().getProductBySeller(ctx)

})
Route.delete('/product/:id',async (ctx)=>{
  const {default:ProductsController}=await import('App/Controllers/Http/ProductsController')
  return new ProductsController().productDeletion(ctx)
})
