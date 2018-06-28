import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console */

fs.readFile('src/main/index.html', 'utf8', (err, markup) => {
    if(err) {
        return console.log(err.bold.red);
    }

    const $ = cheerio.load(markup);

    $('head').prepend('<link rel="stylesheet" href="styles.css">');

    fs.writeFile('dist/index.html', $.html(), 'utf8', function(err) {
        if(err) {
            return console.log(err.red);
        }
        console.log('index.html written to /dist folder'.green);
    });
});