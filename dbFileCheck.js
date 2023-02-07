import fs from "fs";
import { exit } from "process";

if (fs.existsSync("db.json")) {
  console.log("File exists!");
  exit(1);
}
