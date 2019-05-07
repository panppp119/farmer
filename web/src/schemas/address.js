import { schema } from 'normalizr'

import addressOwnerSchema from './unions/addressOwner'

const addressSchema = new schema.Entity('addresses')

addressSchema.define({
  owner: addressOwnerSchema
})

export default addressSchema
