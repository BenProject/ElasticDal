import { Client } from "@elastic/elasticsearch";
import { SearchResponse } from "elasticsearch";

interface Id {
  id: string;
}
interface Entity {
  name: string;
  id: string;
}

export default class ElasticWrapper {
  private _client: Client | null = null;
  private _dbAdress: string;
  public readonly Index: string;

  constructor(dbAdress: string, index: string) {
    this._dbAdress = dbAdress;
    this.Index = index;
    this._init();
  }

  private _init() {
    this._client = new Client({ node: this._dbAdress });
  }

  async create(properties: Object): Promise<boolean> {
    try {
      const response = await this._client.index({
        index: this.Index,
        body: {
          ...properties,
        },
      });
      return Promise.resolve(response.body.result === "created");
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async matchText(text: string, entitiesCount: number): Promise<[Entity]> {
    try {
      const response = await this._client.search({
        index: this.Index,
        body: {
          from: 0,
          size: entitiesCount,
          query: {
            bool: {
              should: [
                {
                  match: {
                    name: {
                      query: text,
                      operator: "AND",
                    },
                  },
                },
                {
                  match: {
                    name: {
                      query: text,
                      minimum_should_match: "80%",
                    },
                  },
                },
              ],
            },
          },
        },
      });
      return Promise.resolve(
        response.body?.hits?.hits?.map((hit) => hit._source)
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
