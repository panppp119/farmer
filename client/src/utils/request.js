import superagent from "superagent";
import prefix from "superagent-prefix";
import nocache from "superagent-no-cache";
// import { normalize } from 'normalizr'

// import { updateEntities } from 'actions/entities'

const agent = superagent.agent();

agent
  // .auth(process.env.REACT_APP_CLIENT_ID, process.env.REACT_APP_CLIENT_PASSWORD)
  .use(prefix(process.env.REACT_APP_BASE_API))
  .use(nocache)
  .on("error", error => console.warn(error));

// Create helper method for attaching Access Tokens
superagent.Request.prototype.accessToken = function(accessToken) {
  return this.set("Authorization", "Bearer " + accessToken);
};

export default agent;
