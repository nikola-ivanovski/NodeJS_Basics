const fs = require("fs");
const path = require("path");

const pathToHomeworkFile = path.join(__dirname, "homework.txt");

fs.writeFileSync(pathToHomeworkFile, "Homework 02 in Basic Node", (err) => {
  if (err) throw err;
});

fs.appendFileSync(pathToHomeworkFile, "\nFINISHED!");
const content = fs.readFileSync(pathToHomeworkFile, { encoding: "utf-8" });
console.log(content);
