const fs = require('fs');

fs.writeFileSync('src/style.css','');
scanDirectory('app/pages');
scanDirectory('app/ssr-components');
scanDirectory('app/csr-components');
function scanDirectory(dir){
    fs.readdirSync(dir).forEach(path => {
        if(fs.lstatSync(dir + '/' + path).isDirectory()){
            scanDirectory(dir + '/' + path);
        }
        else if(path.endsWith(".css")){
            fs.appendFileSync('src/style.css', "@import '../" + (dir + "/" + path) + "';\n");
        }
    });
}