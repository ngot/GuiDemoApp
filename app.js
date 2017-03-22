const gui = require('gui');
const co = require('coroutine');
const path = require('path');
const fs = require('fs');
const http = require('http');

gui.setVersion(gui.EDGE);

const webview = gui.open(path.join(__dirname, 'index.html'), { debug: true });

webview.onmessage = function (message) {
    message = JSON.parse(message);
    dispatch(message);
}

var router = {
    "message": function (message) {
        console.log('[webview message]: ', message);
    },
    "error": function (error) {
        console.error('[webview error]: ', error);
    },
    "saveToFile": function (param) {
        fs.writeFile(param.path, param.txt);
        console.log('[native log]: save to local file.');
    }
};

function dispatch(msg) {
    if (router[msg.name] && typeof router[msg.name] === 'function') {
        router[msg.name](msg.param);
    } else {
        throw new Error(`can't found handler for : ${msg.name}`);
    }
}

webview.postMessage("message from native!");

// avoid main process stop!
co.current().join();
