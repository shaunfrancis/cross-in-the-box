const esbuild = require('esbuild');

async function build(){
    await esbuild.build({
        entryPoints: ['src/built/*.js'],
        bundle: true,
        minify: true,
        outdir: 'compiled',
        alias: {
            components: './app/csr-components'
        },
    });
    console.log('\n✨ Built scripts\n');
}
build();