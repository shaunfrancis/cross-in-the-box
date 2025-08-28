const fs = require('fs');

fs.writeFileSync('src/shared.js', fs.readFileSync('app/pages/script.js') + '\n');
const writtenFiles = ['src/shared.js'];

scanDirectory('app/components');
function scanDirectory(dir){
    fs.readdirSync(dir).forEach(path => {
        if(fs.lstatSync(dir + '/' + path).isDirectory()){
            scanDirectory(dir + '/' + path);
        }
        else if(path.endsWith(".js")){
            const label = dir.split("/")[2] || "shared";
            const writeToPath = 'src/' + label + '.js';
            const content = fs.readFileSync(dir + '/' + path).toString('utf8').replace(/[\n\r]+/g, '\n');
            if(writtenFiles.includes(writeToPath)) fs.appendFileSync(writeToPath, content + '\n');
            else{
                fs.writeFileSync(writeToPath, content + '\n');
                writtenFiles.push(writeToPath);
            }
        }
    });
}