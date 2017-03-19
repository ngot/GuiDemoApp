const gui = require('gui');
const co = require('coroutine');
const path = require('path');
const os = require('os');
const http = require('http');
const registry = require('registry');

const exe = path.basename(os.execPath);

// registry.set(registry.CURRENT_USER,
// 	                   "SOFTWARE\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE_BROWSER_EMULATION\\" + exe,
// 	                   11000, registry.DWORD);

gui.setVersion(gui.EDGE);

const webview = gui.open(path.join(__dirname, 'index.html'), { debug : true });

webview.onmessage = function (message) {
    message = JSON.parse(message);
    if (message.name === 'error') {
        console.error('[webview error]: ', message.param);
    } else if (message.name === 'message') {
        console.log('[webview message]: ', message.param);
    }
}

webview.postMessage("哈哈哈！");

co.sleep(1000000);
