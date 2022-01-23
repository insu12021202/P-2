import {makeElement} from '../makeHTMLElement.js';
import { makeHeaderDiv } from './headerTopDiv.js';

/* Header 태그 */
export const header = makeElement('header', null, null);
makeHeaderDiv(header);