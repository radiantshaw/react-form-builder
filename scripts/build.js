#!/usr/bin/env node

const fs = require('fs/promises');
fs.rm('./dist', {
  recursive: true,
  force: true
});

const esbuild = require('esbuild');

const defaultConfig = {
  entryPoints: ['./src/'],
  bundle: true,
  loader: {
    '.js': 'jsx'
  }
};

const commonJSConfig = Object.assign({}, {
  platform: 'node',
  outfile: 'dist/react-form-builder.cjs'
}, defaultConfig);

esbuild.build(commonJSConfig).catch(function() {
  process.exit(1);
});

const neutralConfig = Object.assign({}, {
  platform: 'neutral',
  outfile: 'dist/react-form-builder.mjs',
}, defaultConfig);

esbuild.build(neutralConfig).catch(function() {
  process.exit(1);
});
