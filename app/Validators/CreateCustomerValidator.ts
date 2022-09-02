import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules} from "@ioc:Adonis/Core/Validator";

export default class CreateCustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name:schema.string({},[rules.minLength(3),rules.maxLength(50)]),
    password:schema.string({},[rules.minLength(8),rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    email:schema.string({trim:true},[rules.email()]),
    address:schema.string({},[rules.required()]),
    alternateAddress:schema.string.nullableAndOptional()
   ,
    phoneNumber:schema.string({},[rules.regex(/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/)])



  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
   public messages: CustomMessages = {
    'minLength':'the {{field}} must be atleast {{options.minLength}} long',
     'maxLength':'the {{field}} must be atmost {{options.maxLength}} long',
     'required':'the {{field}} can not be null',
     'email':'the is not a valid email'

   }



}
