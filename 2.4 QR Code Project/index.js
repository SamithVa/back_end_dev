/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from 'qr-image'
import fs from 'fs'


(async () => {
    try {
        const answers = await getAnswers();
        console.log('The answers are: ', answers);

        // create qr image
        var qr_svg = qr.image(answers['website'], { type: 'svg' });
        qr_svg.pipe(fs.createWriteStream('qr.svg'));

        // Write answer into text file
        fs.writeFile('answers.txt', answers['website'], ()=>{})

    } catch (err) {
      console.error(`There was an error while talking to the API: ${err.message}`, err);
    }
  })();

function getAnswers(){
    return inquirer.prompt([{
        name: 'website',
        message: 'Enter a website:',
        type: "input"
    }])
} 


