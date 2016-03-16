cmd /c jsdoc ./js/reel.js -d docs/deploy/ -t docs/template/ -c docs/template/conf.json -r README.md
cmd /c uglifyjs js/reel.js -o js/reel.min.js
