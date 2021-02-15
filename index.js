const axios = require('axios');
const fs = require('fs');
const htmlparser2 = require('htmlparser2');
const {DomHandler} = require('domhandler');

//fs.open('test.txt', 'w', (e, fd) => {
//    if (e)
//        return console.error(err);
//
//    fs.write(fd, 'Hello ', err => console.error(err));
//    fs.write(fd, 'World!', err => console.error(err));
//});

let html = '';
if (!fs.existsSync('html/index.html')) {
    axios.get('http://mhgu.kiranico.com').then(response => {
        fs.writeFile('html/index.html', response.data, err => {
            if (err)
                throw err;
            console.log('File has been saved!');
        });
    });

    html = response.data;
} else {
    html = fs.readFileSync('html/index.html', {encoding: 'utf8'});
}

const parser = new htmlparser2.Parser(new DomHandler((error, dom) => {
    if (error) {
        throw error;
    } else {
        //console.log(dom);
        console.log(dom);
    }
}));
parser.write(html);
parser.end();

/*
 * app
 *  (3rd element, 2nd div) container
 *      (2nd element, 1st div) row
 *          (2nd elem, 2nd div) col-lg-10
 *              card
 *                  card-block
 *                      row
 *                          
*/
