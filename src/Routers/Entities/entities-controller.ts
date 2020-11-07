import { dbWrapper } from "../../bootstrapper";

export default {
  createEntity: async (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
      res.status(400);
      res.send("bad arguments");
    }

    res.send(
      await dbWrapper.create({ name: name.split("").join(" "), id: id })
    );
  },
  getEntities: async (req, res) => {
    const { numberOfEntities, name } = req.body;

    if (!numberOfEntities || !name) {
      res.status(400);
      return res.send("bad arguments");
    }
    try {
      const results = await dbWrapper.matchText(
        name.split("").join(" "),
        numberOfEntities
      );
      results.map((result) => (result.name = result.name.split(" ").join("")));
      res.send(results);
    } catch (err) {
      res.status(500);
      res.send("error while tried to get entities");
    }
  },
};
