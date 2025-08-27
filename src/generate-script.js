const fs = require('fs');

fs.writeFileSync('compiled/script.js','');
scanDirectory('app/pages');
scanDirectory('app/components');
function scanDirectory(dir){
    fs.readdirSync(dir).forEach(path => {
        if(fs.lstatSync(dir + '/' + path).isDirectory()){
            scanDirectory(dir + '/' + path);
        }
        else if(path.endsWith(".js")){
            fs.appendFileSync('compiled/script.js', fs.readFileSync(dir + '/' + path) + '\n');
        }
    });
}