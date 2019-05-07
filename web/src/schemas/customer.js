import { schema } from 'normalizr'

import inquirySchema from 'schemas/inquiry'
import subscriptionSchema from 'schemas/subscription'
import invoiceSchema from 'schemas/invoice'
import addressSchema from 'schemas/address'
import walletSchema from 'schemas/wallet'
import walletTransactionSchema from 'schemas/walletTransaction'
import cardSchema from 'schemas/card'
import tagSchema from 'schemas/tag'
import invitationSchema from 'schemas/invitation'
import deviceSchema from 'schemas/device'
import omniauthIdentitySchema from 'schemas/omniauthIdentity'
import commentSchema from 'schemas/comment'
import eventSchema from 'schemas/event'

const customerSchema = new schema.Entity('customers', {
  inquiries: [inquirySchema],
  subscriptions: [subscriptionSchema],
  invoices: [invoiceSchema],
  addresses: [addressSchema],
  wallet: walletSchema,
  wallet_transactions: [walletTransactionSchema],
  cards: [cardSchema],
  tags: [tagSchema],
  invitations: [invitationSchema],
  devices: [deviceSchema],
  omniauth_identities: [omniauthIdentitySchema],
  comments: [commentSchema],
  events: [eventSchema]
})

export default customerSchema
