import { schema } from 'normalizr'

import userSchema from 'schemas/unions/user'
import walletTransactionSchema from 'schemas/walletTransaction'

const walletSchema = new schema.Entity('wallet', {
  owner: userSchema,
  transactions: [walletTransactionSchema]
})

export default walletSchema
