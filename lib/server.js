import http from 'http';
import { utils } from './utils.js';

import { Page404 } from '../pages/Page404.js';
import { PageHome } from '../pages/PageHome.js';
import { PageLogin } from '../pages/PageLogin.js';
import { PageRegister } from '../pages/PageRegister.js';

const server = {};
server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method.toLowerCase();
    const parsedPathName = parsedURL.pathname;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');
    const header = req.headers;
    console.log('Bandom atidaryti:', trimmedPath);

    req.on('data', () => {
        console.log('Klientas atsiunte duomenu...');
    })
    req.on('end', () => {
        // failo turinys
        // - tekstiniai failai:
        //   - css
        //   - js
        //   - svg
        // - binary failai
        //   - png/jpg/ico
        //   - woff, ttf
        //   - mp3, exe
        // API (www.psl.com/api/....)
        // puslapio html
            
        const fileExtension = utils.fileExtension(trimmedPath);
        const textFileExtension = ['css', 'js', 'svg'];
        const binaryFileExtension = ['png', 'jpg', 'ico', 'eot', 'ttf', 'woff', 'woff2', 'otf'];
        const isTextFile = textFileExtension.includes(fileExtension);
        const isBinaryFile = binaryFileExtension.includes(fileExtension);
        const isAPI = trimmedPath.split('/')[0] === 'api';
        const isPage = !isTextFile && !isBinaryFile && !isAPI;

        let responseContent = '';

        if (isTextFile) {
            responseContent = 'TEXT FILE CONTENT'
        }
        if (isBinaryFile) {
            responseContent = 'BINARY FILE CONTENT'
        }
        if (isAPI) {
            responseContent = 'API CONTENT'
        }
        if (isPage) {
            // http://localhost:3000/
            // http://localhost:3000/register
            // http://localhost:3000/login
            // http://localhost:3000/404
            const pageClass = server.routes[trimmedPath]
                ? server.routes[trimmedPath]
                : server.routes['404'];
            const pageObj = new pageClass();
            
            responseContent = pageObj.render();
        }
        res.end(responseContent);
    });               
});

server.routes = {
    '': PageHome,
    '404': Page404,
    'register': PageRegister,
    'login': PageLogin,
    // 'blog': PageBlog,
}

server.init = () => {
    console.log('Bandau paleisti serverio procesa...');
    const port = 3000;
    server.httpServer.listen(port, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${port}`);
    });
}
export { server }