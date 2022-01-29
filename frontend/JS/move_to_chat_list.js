import check_body from "./check_body.js";
import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { getChatListHTML } from "./views/chat_list_page.js";
import { makeItemList } from "./views/item_list.js";

const chat_list_btn = document.querySelector('.chat_list_btn');
const user_btn = document.querySelector('.user_btn');
const user_popup = document.querySelector('.user_popup');

function moveToChatList() {
    check_body();
    $.ajax({
        type: "GET",
        url:'/chat_list',
        data: {},
        dataType: 'json',
        success: (response)=>{
            let url = 'chat_list';
            let list = makeItemList(response);
            let html_str = getChatListHTML(list, response);
            pushUrl(url, response);
            renderingHTML(url, html_str);
        },
        error: (log)=>{console.log(log)}
    });
    user_popup.classList.toggle('hidden');
}

chat_list_btn.addEventListener('click', moveToChatList);