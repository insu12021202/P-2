import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { getChatHTML } from "./views/chat_page.js";

export function showChatPopup(event) {
    const detail_chat_popup = document.querySelector('.detail_page_chat_popup');
    const detail_chat_popup_cancle_btn = document.querySelector('.detail_page_chat_popup_cancle_btn');
    const detail_chat_popup_add_btn = document.querySelector('.detail_page_chat_popup_add_btn');

    let item_id = event.target.dataset.key;
    let user_id = event.target.dataset.user;
    detail_chat_popup.classList.toggle('hidden');
    detail_chat_popup_cancle_btn.addEventListener('click', toggleChatPopup);
    detail_chat_popup_add_btn.addEventListener('click', ()=>{
        openChatPage(item_id, user_id);
    });
}

function toggleChatPopup() {
    const detail_chat_popup = document.querySelector('.detail_page_chat_popup');
    detail_chat_popup.classList.toggle('hidden');
}

function openChatPage(item_id, user_id) {
    $.ajax({ //해당 유저의 채팅 신청 목록에 추가하기
        type: "POST",
        url:'/chat',
        data: {
            item_id : item_id,
            user_id : user_id
        },
        dataType: 'json',
        success: (response)=>{
            getOwnerDataForChat(item_id, user_id);
        },
        error: (log)=>{console.log(log)}
    });
}

function getOwnerDataForChat(item_id, user_id){
    $.ajax({ //해당 유저의 채팅 신청 목록에 추가하기
        type: "POST",
        url:'/chat_data',
        data: {
            item_id : item_id,
            user_id : user_id
        },
        dataType: 'json',
        success: (response)=>{
            console.log(response);
            let url = 'chatting'
            let html_str = getChatHTML(response);
            pushUrl(url, response);
            renderingHTML(url, html_str);
        },
        error: (log)=>{console.log(log)}
    });
}