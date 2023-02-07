import fs from "fs";
import { exit } from "process";

if (!fs.existsSync("db.json")) {
  console.log("File does not exist!");
  exit(1);
}
