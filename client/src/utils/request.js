import superagent from "superagent";
import prefix from "superagent-prefix";
// import { normalize } from 'normalizr'

// import { updateEntities } from 'actions/entities'

const agent = superagent.agent();

agent
  // .auth(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_PASSWORD)
  .use(prefix(process.env.REACT_APP_BASE_API))
  .on("error", error => console.warn(error));

// Create helper method for attaching Access Tokens
// superagent.Request.prototype.accessToken = function (accessToken) {
//   return this.set('Authorization', 'Bearer ' + accessToken)
// }

// Create helper method for setting locale
// superagent.Request.prototype.locale = function (locale) {
//   return this.query({ locale })
// }

// Create helper method for normalizing data
// superagent.Request.prototype.normalize = function (schema, dispatch) {
//   if (!schema) {
//     return this.then(response => response)
//   }
//
//   return this.then(function (response) {
//     const normalizedData = normalize(response.body, schema)
//     const total = response.headers['total'] || 0
//     const perPage = response.headers['per-page'] || 0
//     const totalPage = parseInt((total / perPage).toFixed(0), 10)
//
//     dispatch && dispatch(updateEntities(normalizedData.entities))
//
//     return { normalizedData, totalPage }
//   })
// }

export default agent;
