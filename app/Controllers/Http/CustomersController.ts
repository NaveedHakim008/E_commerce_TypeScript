import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCustomerValidator from "App/Validators/CreateCustomerValidator";
import CustomerUpdationValidator from "App/Validators/CustomerUpdationValidator";
import cloudinary from "@ioc:Adonis/Addons/Cloudinary"
import Customer from "App/Models/Customer";
import Cart from "App/Models/Cart";
import user from "App/Models/user";
//import AuthToken from "App/Models/AuthToken";
//import {fn} from "knex";
export default class CustomersController {
  public customerSignUp =async({auth,request,response}: HttpContextContract)=>{

    try {
      await request.validate(CreateCustomerValidator)
      const {name, password, email, alternateAddress, address, phoneNumber} = request.body()

      const customerAvatar = request.file('avatar', {
        size: '2mb', extnames: ['jpg', 'png', 'gif']

      })
      if (customerAvatar) {
        if (customerAvatar.isValid) {
          const imageDetail = await cloudinary.upload(customerAvatar, customerAvatar.clientName)

          const customer=await Customer.create({
            name,
            password,
            address,
            alternateAddress,
            email,
            phoneNumber,
            avatarUrl: imageDetail.public_id
          })
          await Cart.create({
            customerId:customer.id
          })
          const User=await user.create({email:email,password:password})
          const token=await auth.use('api').login(User,{expiresIn:'30 minutes'})
          //await AuthToken.create({userId:customer.id,token:token['token'],expiresAt:token['expires_at']})
          response.status(200).send({msg:'customer signUp successful session created',token:token.token})

        } else
          response.send('this file format is not supported')

      } else {

        const customer=await Customer.create({name, password, address, alternateAddress, email, phoneNumber})
        await Cart.create({
          customerId:customer.id
        })
        const User=await user.create({email:email,password:password})
        //const token=await auth.use('api').login(User,{expiresIn:'30 minutes'})
       // const token=await auth.use('api').login(User,{expiresIn:'30 minutes'})
        //const apiToken=await Database.from('api_tokens').where({user_id:customer.id})
        const token=await auth.use('api').login(User,{expiresIn:'30 minutes'})
        //await AuthToken.create({userId:customer.id,token:token,expiresAt:token['expires_at']})
        //const customer=await Customer.findByOrFail('email',email)
        response.status(200).send({msg:'customer signUp successful session created',token:token.token})

      }
    }

    catch(e) {
      response.status(500).send(e)
    }

  }
  public customerUpdation=async ({auth,request,response})=>{

         try{
           const customer=await auth.use('api').authenticate()
           customer.serialize()
           const {id}=await Customer.findByOrFail('email',customer.email)
           console.log(customer)
          // const token=await AuthToken.query().where('expiresAt', '>', fn.now() ).andWhere('userId',customer.id)
           //request.setHeader('Authorization',`Bearer ${token}`)

           await request.validate(CustomerUpdationValidator)
           //const {id}=request.params()
           const modifiedFields={}
           const updatedFields=Object.keys(request.body())
           const cust=await Customer.findByOrFail('id',id)
           const customerAvatar=request.file('avatar',{
             size:'2mb',
             extnames:['jpg','png','gif']
           })
           if(customerAvatar) {
             if (customerAvatar?.isValid) {
               await cloudinary.destroy(cust.avatarUrl)
               const imageDetail = await cloudinary.upload(customerAvatar, customerAvatar.clientName)
               modifiedFields['avatarUrl'] = imageDetail.public_id

             } else {
               response.status(404).send('this file format is not supported')
             }
           }
           updatedFields.forEach((update)=>modifiedFields[update]=request.body()[update])
           await cust.merge(modifiedFields).save()
           response.status(200).send('updation successful')

         }
         catch(e){
           console.log(e)
           response.status(500).send(e)
         }
  }


public async Login({request,auth}:HttpContextContract){

  const {email,password} = request.body();

  const token = await auth.use('api').attempt(email,password,{
    expiresIn: '30 minutes'
  })

  return token
}
public async getAllUser({}:HttpContextContract){
  const data =await Customer.all()

  return data;
}
public async logout({auth,response}:HttpContextContract){
  await auth.use('api').logout()
  return response.redirect().toPath('customer/login')
}
}
