const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');



// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is your project called?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('You gotta give me a project title.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'What does your project do and why did you make it?',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Your project MUST do something!? Tell me about it.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How would someone install this?',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('You must tell them how to install it!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Should we know anything about the usage of this project?',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('You have to give us something.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'What contributions are you looking for? Are there guidelines others should follow?',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('Please let users know how to contribute!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'test',
        message: 'What tests have you run for this project?',
        validate: testInput => {
            if (testInput) {
                return true;
            } else {
                console.log('Please enter test information!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license will you display?',
        choices: ['MIT', 'ISC', 'GNUGPLv3'],
        validate: licenseChoice => {
            if (licenseChoice) {
                return true;
            } else {
                console.log('Please pick a license!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your github username?',
        validate: githubInput => {
            if (githubInput){
                return true;
            } else {
                console.log('Please type your github username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email?',
        validate: emailInput => {
            if (emailInput){
                return true;
            } else {
                console.log('Please enter an email otherwise nobody can tell you how good this project is!');
                return false;
            }
        }
    }
];

// function to write README file
function writeToFile(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/readme.md', data, err => {
        // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                reject(err);
                // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

        // if everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
}

// function to initialize program
function init() {
    return inquirer.prompt(questions)
}

// function call to initialize program
init()
.then(userAnswerData => {
    return generateMarkdown(userAnswerData);
}).then(markdownData => {

    console.log(markdownData)
    return writeToFile(markdownData);
});


// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README