import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { getDetailHTML } from "./views/detail_page.js";


export function moveToDetail(key) {
    let url = 'detail' + key;
    let html_str = getDetailHTML(key);
    pushUrl(url);
    renderingHTML(url,html_str);
}