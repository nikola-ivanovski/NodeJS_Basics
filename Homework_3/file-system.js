import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

const writeToFile = (path, data) => {
  fs.writeFileSync(path, data);
};

const appendToFile = (path, data) => {
  fs.appendFileSync(path, data);
};

const readFromFile = (path) => {
  return fs.readFileSync(path, { encoding: "utf-8" });
};

const registerStudent = (studentFullname, studentEmail, studentPassword) => {
  const student = {
    id: uuidv4(),
    fullname: studentFullname,
    email: studentEmail,
    password: studentPassword,
  };

  eventEmitter.emit("student", student.fullname);
  saveStudent(student);
  appendToFile("greeting_log.txt", student.fullname + "\n");
};

const saveStudent = (student) => {
  readFromFile("./students.json", (err, data) => {
    let students = [];
    if (!err) {
      students = JSON.parse(data);
    }
    students.push(student);

    writeToFile("./students.json", JSON.stringify(students, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
};
eventEmitter.on("student", (fullname) => {
  console.log(`Welcome, ${fullname}`);
});

registerStudent("John Doe", "test@example.com", "asdasdasd");
