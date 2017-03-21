const gui = require('gui');
const co = require('coroutine');
const path = require('path');
const fs = require('fs');
const os = require('os');
const http = require('http');
const registry = require('registry');

// const exe = path.basename(os.execPath);
// const IEPATH = "SOFTWARE\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_BROWSER_EMULATION\\";
// function setWebviewVersion(n){
//     registry.set(
//         registry.CURRENT_USER,
// 	    `${IEPATH}${exe}`,
// 	    n,
//         registry.DWORD
//     );
// }
// setWebviewVersion(11001);

gui.setVersion(12001);

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
    "saveToFile": function (txt) {
        fs.writeFile(path.join(__dirname, 'demo.txt'), txt);
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

webview.postMessage("哈哈哈！");

co.current().join();
