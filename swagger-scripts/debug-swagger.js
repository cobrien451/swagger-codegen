const executeSync = require('child_process').execSync;
const args = process.argv;
const language = args[2];
const debugType = args[3];
/**
 * debug types:
 * swagger: prints the swagger specification as interpreted by the codegen
 * models: prints models passed to mustache templates
 * operations: prints operations passed to the mustache templates
 * supportingFiles: prints additional data passed to the mustache templates
 * 
 */
const debugTypes = ['swagger', 'models', 'operations', 'supportingFiles'];
if(!language || !debugType) {
    throw new Error('Please enter a language and the type of thing you want to debug');
}
if(!debugTypes.includes(debugType)) {
    throw new Error('Please enter one of the following debug types: swagger, models, operations, supportingFiles');
}

const capitalizedDebugType = debugType.charAt(0).toUpperCase() + debugType.slice(1);
const command = `java -jar ./modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate`;
const options = [
    `-Ddebug${capitalizedDebugType}`, // debug type
    '-i https://api.ordercloud.io/v1/swagger', // location of swagger spec definition file
    `-l ${language}`, // language to debug
    `> output.json` // output data to output.json
];
executeSync(`${command} ${options.join(' ')}`);
console.log('see output.json at the root of the project for data');