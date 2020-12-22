import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createPromise } from "redux-promise-middleware";
import reducer from "./reducers";
const __PRODUCTION__ = process.env.NODE_ENV === "production";

const middlewares = [];
const promise = createPromise({ types: { fulfilled: "success" } });
middlewares.push(promise);
middlewares.push(thunk);

if (!__PRODUCTION__) {
  const { createLogger } = require("redux-logger");
  middlewares.push(createLogger());
}

const middleware = applyMiddleware(...middlewares);

export default createStore(reducer, middleware);
