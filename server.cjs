const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

let items = [];
app.get("/api/items", (_req, res) => res.json(items));
app.post("/api/items", (req, res) => {
  const item = { id: Date.now(), ...req.body };
  items.push(item);
  res.status(201).json(item);
});
app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  items = items.filter(i => i.id !== id);
  res.json({ deleted: id });
});

const PORT = process.env.PORT || 3000;
- app.listen(PORT, () => console.log("API running on :" + PORT));
+ app.listen(PORT, "0.0.0.0", () => console.log("API running on :" + PORT));

