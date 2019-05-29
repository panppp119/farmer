import { schema } from "normalizr";

const transactionSchema = new schema.Entity("transactions", {});

export default transactionSchema;
