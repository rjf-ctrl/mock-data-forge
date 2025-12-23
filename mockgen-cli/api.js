const express = require("express");
const cors = require("cors");
const {generateData} = require("./generator");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generator", (req, res) => {
  try {
    const schema = req.body;
    const output = generateData(schema);
    res.json(output);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("MockGen API running on http://localhost:3001");
});