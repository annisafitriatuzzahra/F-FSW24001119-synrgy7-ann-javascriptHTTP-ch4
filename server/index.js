// console.log("Implement servermu disini yak 😝!");
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = './public' + req.url;
    if (req.url === '/' || req.url === '/index.html') {
        filePath = './public/index.html';
    } else if (req.url === '/cars' || req.url === '/cari-mobil.html') {
        filePath = './public/cari-mobil.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.svg': 'image/svg+xml', 
        '.png': 'image/png',     
        '.jpg': 'image/jpeg',   
    };

    if (extname === '.svg' || extname === '.png' || extname === '.jpg') {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end('404 Not Found');
                } else {
                    res.writeHead(500);
                    res.end(`Internal Server Error: ${err.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType[extname] });
                res.end(content);
            }
        });
    } else {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end('404 Not Found');
                } else {
                    res.writeHead(500);
                    res.end(`Internal Server Error: ${err.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType[extname] });
                res.end(content, 'utf-8');
            }
        });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
