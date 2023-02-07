import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

export default async function addData(info) {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Please Enter Your Name:",
      },
      {
        type: "number",
        name: "phone",
        message: "Please Enter Your Number:",
      },
      {
        type: "list",
        name: "age",
        message: "Are You An Adult?",
        choices: [
          {
            name: "Y",
            value: "Adult",
          },
          {
            name: "N",
            value: "Minor",
          },
        ],
      },
    ]);

    const data = {
      id: uuidv4(),
      name: answers.name,
      phone: answers.phone,
      age: answers.age,
    };

    info.push(data);

    if (fs.existsSync("db.json")) {
      createDetails(info);
    } else {
      fs.appendFile("db.json", "[]", function (error) {
        if (error) {
          console.log("Could not create db.json", error);
          return;
        }
        createDetails(info);
      });
    }
  } catch (error) {
    console.error(`Something Happened: ${error.message}`);
  }
}

async function createDetails(info) {
  await fs.writeFile("db.json", JSON.stringify(info), function (error) {
    if (error) {
      console.log(error);
    }
    console.log("Saved!");
  });
}

queryDB(addData);
