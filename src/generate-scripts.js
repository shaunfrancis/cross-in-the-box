const fs = require('fs');

// find all js files to bundle
const bespokeFiles = []; // unique files that should be built but not compiled into {country}.js
const files = [...scanDirectory('app/pages'), ...scanDirectory('app/ssr-components')];

function scanDirectory(dir, files = []){
    fs.readdirSync(dir).forEach(path => {
        if(fs.lstatSync(dir + '/' + path).isDirectory()){
            return scanDirectory(dir + '/' + path, files);
        }
        else if(path.endsWith(".js")){
            if(!path.endsWith(".bespoke.js")) files.push({dir: dir, path: path});
            else bespokeFiles.push({dir: dir, path: path});
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
writtenFiles.filter(file => file != sharedFile).forEach( file => {
    fs.writeFileSync(file, fs.readFileSync(sharedFile) + "\n" + fs.readFileSync(file));
});
fs.rmSync(sharedFile);

// Strip out duplicate import statements before esbuild
writtenFiles.forEach( file => {
    if(file === sharedFile) return;

    const lines = fs.readFileSync(file).toString('utf8').split("\n");
    const imports = [];
    let output = "";
    lines.forEach( line => {
        line = line.trim();
        if(line.match(/^import /)){
            if(imports.includes(line)) return;
            else imports.push(line);
        }
        output += line + "\n";
    });
    fs.writeFileSync(file, output);
});
bespokeFiles.forEach(file => {
    fs.writeFileSync("src/built/bespoke/" + file.path, fs.readFileSync(file.dir + '/' + file.path));
});