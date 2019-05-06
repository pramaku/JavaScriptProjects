const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname;
    console.log(pathName);
    const productId = url.parse(req.url, true).query.id;

    // PRODUCT OVERVIEW
    if (pathName === '/products' || pathName === '/') {
        res.writeHead('200', {'Content-Type': 'text/html'});

        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                const cards = laptopData.map(laptop => replaceTemplate(data, laptop)).join(' ');
                overviewOutput = overviewOutput.replace('{%CARDS%}', cards);
                res.end(overviewOutput);
            });
        });
    } else if (pathName === '/laptop' && productId < laptopData.length) {
        // LAPTOP DETAIL
        res.writeHead('200', {'Content-Type': 'text/html'});
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[productId];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        });
    } else if ((/\.(jpg|jepg|png|gif)$/i).test(pathName)) {
        // IMAGES
        fs.readFile(`${__dirname}/data/img/${pathName}`, (err, data) => {
            res.writeHead('200', {'Content-Type': 'image/jpg'});
            res.end(data);
        });
    } else {
        // URL NOT FOUND
        res.writeHead(404);
        res.end(`URL not found`);
    }

});

server.listen(1337, '127.0.0.1', () => {
    console.log('listening on 1337');
});

function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.storage);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}
