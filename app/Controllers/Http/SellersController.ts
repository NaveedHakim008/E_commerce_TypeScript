import CreateCustomerValidator from "App/Validators/CreateCustomerValidator";
import cloudinary from "@ioc:Adonis/Addons/Cloudinary";
import user from "App/Models/user";
import CustomerUpdationValidator from "App/Validators/CustomerUpdationValidator";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Seller from "App/Models/Seller";
//import Customer from "App/Models/Customer";
export default class SellersController {
  public sellerSignUp = async ({auth, request, response}: HttpContextContract) => {

    const {name, password, email, address, phoneNumber} = request.body()

    try {
      await request.validate(CreateCustomerValidator)

      const sellerAvatar = request.file('avatar', {
        size: '2mb', extnames: ['jpg', 'png', 'gif']

      })
      if (sellerAvatar) {
        if (sellerAvatar.isValid) {
          const imageDetail = await cloudinary.upload(sellerAvatar, sellerAvatar.clientName)

          await Seller.create({
            name,
            password,
            inventoryAddress: address,
            email,
            phoneNumber,
            avatarUrl: imageDetail.public_id
          })

          const User=await user.create({email:email, password:password})
      const token=    await auth.use('api').login(User, {expiresIn: '30 minutes'})
          response.status(200).send({msg:'customer signUp successful session created',token:token.token})

        } else
          response.send('this file format is not supported')

      } else {

        await Seller.create({name, password, inventoryAddress: address, email, phoneNumber})
        const User = await user.create({email:email, password:password})
        const token=await auth.use('api').login(User, {expiresIn: '30 minutes'})
        response.status(200).send({msg:'customer signUp successful session created',token:token.token})

      }
    } catch (e) {
      response.send(e)
    }

  }
  public sellerUpdation = async ({auth, request, response}) => {

    try {
      const authSeller = await auth.use('api').authenticate()
      authSeller.serialize()
      await request.validate(CustomerUpdationValidator)

      const modifiedFields = {}
      const updatedFields = Object.keys(request.body())
      const seller = await Seller.findByOrFail('id', authSeller.id)
      const sellerAvatar = request.file('avatar', {
        size: '2mb',
        extnames: ['jpg', 'png', 'gif']
      })
      if (sellerAvatar) {
        if (sellerAvatar?.isValid) {
          await cloudinary.destroy(seller.avatarUrl)
          const imageDetail = await cloudinary.upload(sellerAvatar, sellerAvatar.clientName)
          modifiedFields['avatarUrl'] = imageDetail.public_id

        } else {
          response.status(404).send('this file format is not supported')
        }
      }
      updatedFields.forEach((update) => modifiedFields[update] = request.body()[update])
      await seller.merge(modifiedFields).save()
      response.status(200).send('updation successful')

    } catch (e) {
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
  public async logout({auth,response}:HttpContextContract){
    await auth.use('api').logout()
    return response.redirect().toPath('seller/login')
  }
}
