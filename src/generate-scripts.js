const fs = require('fs');

// find all js files to bundle
const files = [...scanDirectory('app/pages'), ...scanDirectory('app/ssr-components')];
function scanDirectory(dir, files = []){
    fs.readdirSync(dir).forEach(path => {
        if(fs.lstatSync(dir + '/' + path).isDirectory()){
            return scanDirectory(dir + '/' + path, files);
        }
        else if(path.endsWith(".js")){
            files.push({dir: dir, path: path});
        }
    });
    return files;
}

// write shared.js and [country].js files
const writtenFiles = [];
files.forEach( ({dir, path}) => {
    const label = dir.split("/")[2] || "shared";
    const writeToPath = 'src/built/' + label + '.js';
    const content = fs.readFileSync(dir + '/' + path).toString('utf8').replace(/[\n\r]+/g, '\n');
    if(writtenFiles.includes(writeToPath)) fs.appendFileSync(writeToPath, content + '\n');
    else{
        fs.writeFileSync(writeToPath, content + '\n');
        writtenFiles.push(writeToPath);
    }
});

// Bundle shared.js into each [country].js file
const sharedFile = writtenFiles.find( file => file === "src/built/shared.js" );
writtenFiles.filter(file => file != sharedFile).forEach( (file, index) => {
    fs.writeFileSync(file, fs.readFileSync(sharedFile) + "\n" + fs.readFileSync(file));
});
fs.rmSync(sharedFile);