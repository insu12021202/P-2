import {header} from '/header/header.js';
import {main} from '/main/main.js';
import {changeURL} from '/changeURL.js';

const $ = document;

const root = $.querySelector('#root');

root.appendChild(header);
root.appendChild(main);

window.addEventListener('popstate', changeURL());