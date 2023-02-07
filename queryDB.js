import fs from "fs";
import { exit } from "process";

export default async function queryDB(externalFunction) {
  try {
    let info = [];
    if (fs.existsSync("db.json")) {
      await fs.readFile("db.json", function (error, data) {
        if (error) {
          console.log("Reading File Failed!", error);
          return;
        }

        info = JSON.parse(data.toString());

        if (externalFunction && !error) {
          externalFunction(info);
          return;
        }
      });
    } else {
      if (externalFunction) {
        externalFunction(info);
        return;
      }
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
