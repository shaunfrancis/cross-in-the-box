const esbuild = require('esbuild');

async function build(){
    const options = {
        bundle: true,
        minify: true,
        alias: {
            components: './app/csr-components'
        },
    };
    await esbuild.build({
        ...options,
        entryPoints: ['src/built/*.js'],
        outdir: 'compiled',
    });
    await esbuild.build({
        ...options,
        entryPoints: ['src/built/bespoke/*.js'],
        outdir: 'compiled/bespoke',
    });

    console.log('\n✨ Built scripts\n');
}
build();