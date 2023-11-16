import { create } from "apisauce";

const client = create({
  baseURL: "http://192.168.0.117:8443/api",
});

export default client;
