import {header} from './header/header.js';
import {main} from './main/main.js';

export function init(root) {
	root.appendChild(header);
	root.appendChild(main);
}