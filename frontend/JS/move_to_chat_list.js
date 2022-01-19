import check_body from "./check_body.js";
import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { getChatListHTML } from "./views/chat_list_page.js";

const chat_list_btn = document.querySelector('.chat_list_btn');
const user_btn = document.querySelector('.user_btn');
const user_popup = document.querySelector('.user_popup');

function moveToChatList() {
    check_body();
    let user_name = user_btn.innerText;
    let html_str = getChatListHTML(user_name);
    let url = `${user_name}/chat_list`;
    pushUrl(url);
    renderingHTML(url, html_str);
    user_popup.classList.toggle('hidden');
}

chat_list_btn.addEventListener('click', moveToChatList);