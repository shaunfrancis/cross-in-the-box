const fs = require('fs');

const writtenFiles = [];
scanDirectory('app/components');
function scanDirectory(dir){
    fs.readdirSync(dir).forEach(path => {
        if(fs.lstatSync(dir + '/' + path).isDirectory()){
            scanDirectory(dir + '/' + path);
        }
        else if(path.endsWith(".js")){
            const label = dir.split("/")[2] || "shared";
            const writeToPath = 'compiled/' + label + '.js';
            if(writtenFiles.includes(writeToPath)) fs.appendFileSync(writeToPath, fs.readFileSync(dir + '/' + path) + '\n');
            else fs.writeFileSync(writeToPath, fs.readFileSync(dir + '/' + path) + '\n');
        }
    });
}