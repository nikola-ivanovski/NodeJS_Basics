import fs from "fs";

const writeToFile = (path, data) => {
  fs.writeFileSync(path, data);
};

const readFromFile = (path) => {
  console.log("1");
  const content = fs.readFileSync(path, { encoding: "utf-8" });
  console.log(typeof content);
  const parsedContent = JSON.parse(content);
  console.log(parsedContent);
  console.log("2");
  return content;
};

const appendToFile = (path, data) => {
  fs.appendFileSync(path, data);
};

export default {
  writeToFile,
  readFromFile,
  appendToFile,
};
