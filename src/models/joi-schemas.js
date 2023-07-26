// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";



export const idSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");



export const universitySpec = Joi.object()
  .keys({
    name: Joi.string().required(),
    lat: Joi.number().allow("").optional(),
    lng: Joi.number().allow("").optional(),
    description: Joi.string().allow("").optional(),
    countyId: idSpec
  })
  .label("universityDetails");

export const universitySpecPlus = universitySpec.keys(
  {
    _id: idSpec,
    __v: Joi.number(),
    
  }
).label("universityDetailsPlus");

export const universityArraySpec = Joi.array().items(universitySpecPlus).label("universityArray");





export const countySpec = Joi.object()
  .keys({
    name: Joi.string().required(),
    userId: idSpec,
    universities: universityArraySpec,
  })
  .label("countyDetalis");

export const countySpecPlus = countySpec.keys({
  _id: idSpec,
  __v: Joi.number()
})
.label("countyDetailsPlus");

export const countyArraySpec = Joi.array().items(countySpecPlus).label("countyArray");






export const userCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const userEditDetails = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
  }).label("UserEditDetails");


export const userSpec = userCredentialsSpec.keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
  })
  .label("UserDetails");

export const userSpecPlus = userSpec.keys({
  _id: idSpec,
  __v: Joi.number()
  })
  .label("UserDetailsPlus");

export const userArraySpec = Joi.array().items(userSpecPlus).label("UserArray");


export const jwtAuth = Joi.object()
  .keys({
  success: Joi.boolean().example("true").required(),
  token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required()
  })
  .label("JwtAuthDetails")

