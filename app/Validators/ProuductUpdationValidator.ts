import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProuductUpdationValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    name:schema.string.nullableAndOptional({},[rules.minLength(5),]),
    details:schema.string.nullableAndOptional({},[rules.minLength(50)]),
    sellerId:schema.string.nullableAndOptional(),
    quantity:schema.number.nullableAndOptional(),
    cost:schema.number.nullableAndOptional(),
    category:schema.enum.nullableAndOptional(['Style and Fashion', 'Home and Garden', 'Consumer Electronic', 'Health & Wellness',
      'Children & Infants', 'Home & Garden', 'Apparel & Accessories'])
  })


  public messages: CustomMessages = {
    'minLength':'the {{field}} must be atleast {{options.minLength}} long',
    'maxLength':'the {{field}} must be atmost {{options.maxLength}} long',
     required:'the {{field}} can not be null',
    'enum': 'The value must be one of {{ options.choices }}'

  }
}
