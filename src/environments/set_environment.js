#!/bin/node
const fs = require("fs");
const environment = process.argv[2] // dev, preprod ou prod
const environmentFileContent = require(`./environment.${environment}.ts`);
fs.writeFileSync("environment.json", JSON.stringify(environmentFileContent.default));