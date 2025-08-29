const fs = require('fs');

fs.writeFileSync('src/built/style.css','');
scanDirectory('app/pages');
scanDirectory('app/ssr-components');
scanDirectory('app/csr-components');
function scanDirectory(dir){
    fs.readdirSync(dir).forEach(path => {
        if(fs.lstatSync(dir + '/' + path).isDirectory()){
            scanDirectory(dir + '/' + path);
        }
        else if(path.endsWith(".css")){
            fs.appendFileSync('src/built/style.css', "@import '../../" + (dir + "/" + path) + "';\n");
        }
    });
}