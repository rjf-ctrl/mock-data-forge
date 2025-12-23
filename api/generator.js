// api/generator.js
const { generateData } = require("../mockgen-cli/generator");

module.exports = async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const schema = req.body;
      const output = generateData(schema);
      res.status(200).json(output);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
