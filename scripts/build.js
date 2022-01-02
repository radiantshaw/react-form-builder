#!/usr/bin/env node

require('fs/promises').rm('./dist', {
  recursive: true,
  force: true
});

const esbuild = require('esbuild');

const defaultConfig = {
  entryPoints: ['./src/'],
  bundle: true,
  minify: true,
  loader: {
    '.js': 'jsx'
  },
  external: ['react']
};

const commonJSConfig = Object.assign({}, {
  platform: 'node',
  outfile: 'dist/react-form-builder.cjs'
}, defaultConfig);

const es6Config = Object.assign({}, {
  platform: 'neutral',
  outfile: 'dist/react-form-builder.mjs'
}, defaultConfig);

[
  commonJSConfig,
  es6Config
].forEach(function(config) {
  esbuild.build(config).catch(function() {
    process.exit(1);
  });
});
