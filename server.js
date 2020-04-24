const express = require("express");
const app = express();
const data = require("./data.json");

app.use(express.json());

app.get("/tasks", function(req, res) {
  res.json(data);
});

app.get("/tasks/:id", function(req, res) {
  const { id } = req.params;
  const task = data.find(t => t.id == id);

  if (!task) return res.status(204).json();

  res.json(task);
});

app.post("/tasks", function(req, res) {
  const { description, date_task, responsible } = req.body;

  // salvar - de acordo com cada cliente

  res.json({ description, date_task, responsible });
});

app.put("/tasks/:id", function(req, res) {
  const { id } = req.params;
  const task = data.find(t => t.id == id);

  if (!task) return res.status(204).json();

  const { description } = req.body;

  task.description = description;

  res.json(task);
});

app.delete("/tasks/:id", function(req, res) {
  const { id } = req.params;
  const tasksFiltered = data.filter(task => task.id != id);

  res.json(tasksFiltered);
});

app.listen(3000, function() {
  console.log("Server is running");
});