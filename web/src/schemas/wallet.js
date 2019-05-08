import { schema } from "normalizr";

import userSchema from "schemas/user";

const walletSchema = new schema.Entity("wallet", {
  owner: userSchema
});

export default walletSchema;
