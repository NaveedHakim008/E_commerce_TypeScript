import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules} from "@ioc:Adonis/Core/Validator";

export default class ProductPostingValidator {
    constructor(protected ctx: HttpContextContract) {}
    public schema = schema.create({
    name:schema.string({},[rules.required(),rules.minLength(5),]),
    details:schema.string({},[rules.required(),rules.minLength(10)]),
    quantity:schema.number(),
      cost:schema.number(),

  })


  public messages: CustomMessages = {

  }
}
