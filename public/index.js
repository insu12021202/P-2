import {header} from '/header/header.js';
import {main} from '/main/main.js';
import {changeURL} from '/changeURL.js';
import {init} from '/init.js';

const $ = document;

const root = $.querySelector('#root');

init(root);

window.addEventListener('popstate', changeURL());