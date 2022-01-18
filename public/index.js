import {header} from '/header/header.js';
import {changeURL} from '/changeURL.js';

const $ = document;

const root = $.querySelector('#root');

root.appendChild(header);

window.addEventListener('popstate', changeURL());