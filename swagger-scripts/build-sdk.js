const executeSync = require('child_process').execSync;
const args = process.argv;
const language = args[2];

const outputFolderMap = {
    'javascript': 'OrderCloud-Javascript-SDK',
    'typescript-angular': 'angular-client',
    'typescript-jquery': 'typescript-jquery-sdk'
}
const allLanguages = Object.keys(outputFolderMap);
if(!language || !allLanguages.includes(language)) {
    throw new Error('The language you are trying to generate does not exist');
}

const command = 'java -jar ./modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate';
const options = [
    '-i https://api.ordercloud.io/v1/swagger', // location of swagger spec definition file
    `-l ${language}`, // language to generate
    `-o ../${outputFolderMap[language]}`, // where to output the generated content
    `-t ./ordercloud-templates/templates/${language}`, // mustache templates folder
    `-c ./ordercloud-templates/config/${language}.json` // configuration file
]

executeSync(`${command} ${options.join(' ')}`);