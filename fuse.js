const path = require('path')
const fb = {
  FuseBox, CopyPlugin, QuantumPlugin,
  LESSPlugin, CSSPlugin, CSSResourcePlugin, EnvPlugin
} = require('fuse-box')
const fs = require('fs')
let env
fs.readFile('.env', function (err, data) {
  if(data)
  {
    env = JSON.parse(data.toString('utf-8'))
  }
  const production = process.env.NODE_ENV === 'production'
    || process.env.ENV === 'production'
    || process.argv.includes('--production')

  const fuse = FuseBox.init({
    homeDir: 'frontend',
    output: 'public/$name.js',
    useTypescriptCompiler: true,
    sourceMaps: true,
    target: 'browser',
    plugins: [
      [CSSResourcePlugin({ dist: 'public/css-resources', inline: false }),
      CSSPlugin({ group: 'app.css', outFile: 'public/app.css', inject: false }),
      ],
      EnvPlugin(env)
      ,
      production && QuantumPlugin({
        bakeApiIntoBundle: 'app',
        treeshake: true,
        uglify: true
      })
    ]
  })

  const bundle = fuse.bundle('app')
    .instructions('> main.jsx')

  if (!production) {
    fuse.dev({ port: 4444, fallback: 'index.html' })
    bundle.hmr().watch()
  }

  fuse.run()
})