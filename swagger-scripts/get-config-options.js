// prints the possible config variables that can be set for each language (stored in ./swagger-codegen/ordercloud-templates/{language}.json
const executeSync = require('child_process').execSync;
const args = process.argv;
const language = args[2];
executeSync(`java -jar ./modules/swagger-codegen-cli/target/swagger-codegen-cli.jar config-help -l ${language} > output.json`);