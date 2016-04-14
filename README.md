# Incerts.SupportSite.Spa

## Getting Started

## Requirements:

*  Node.js (4.2+)
*  Bower
*  Gulp
*  Mercurial

## Installation Guide
```bash
hg clone https://bitbucket.org/incerts/incerts.supportsite
cd ./incerts.supportsite/Incerts.SupportSite.Spa/
npm install bower -g
npm install gulp -g
npm install
```

## Development
```bash
node ./server.js
```

## Gulp tasks available:

 name | description
 --- | ---
js | Compile JS
js-app | Concat all application scripts
js-libs | Concat and minify 3rd parties scripts
styles | Compile Sass
templates | Compile JADE
copy-fonts | Copy fonts into `/dist/fonts`
copy-images | Copy images into `/dist/images`
copy-clean | Removing all compiled files `/dist/images`
install | Run all tasks above