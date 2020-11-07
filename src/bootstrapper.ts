import ElasticWrapper from "./DB/elastic";
import config from "../config";

export const dbWrapper = new ElasticWrapper(
  config.dbConfig.dbAdress,
  config.dbConfig.index
);
