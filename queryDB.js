import fs from "fs";
import { exit } from "process";

fs.readFile("db.json", function (error, data) {
  if (error) {
    console.log("Something went wrong", error);
    exit(1);
  }
  console.log(data);
});
