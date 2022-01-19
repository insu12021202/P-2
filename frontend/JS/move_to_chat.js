import check_body from "./check_body.js";
import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { getChatHTML } from "./views/chat_page.js";

const user_btn = document.querySelector('.user_btn');

export default function moveToChat(key) {
    check_body();
    let user_name = user_btn.innerText;
    let html_str = getChatHTML(key);
    let url = `${user_name}/chatting${key}`;
    pushUrl(url);
    renderingHTML(url, html_str);
}
