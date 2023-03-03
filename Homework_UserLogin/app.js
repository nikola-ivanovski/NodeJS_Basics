const colors = require("colors");

let users = [
  {
    role: "admin",
    fullName: "John Doe",
    username: "qwerty",
    password: "123qwe",
  },
  {
    role: "client",
    fullName: "Bob Bobski",
    username: "asdasd",
    password: "asdzxdfx",
  },
];

const loggedIn = (username, password) => {
  for (const user of users) {
    if (user.username === username && user.password === password) {
      console.log("User is logged in".green);
    } else {
      console.log("User not found".red);
    }
  }
};

loggedIn("qwerty", "123qwe");
loggedIn("asdasd", "sadqwrfa");
loggedIn("afasfw", "fqfwfasd");
