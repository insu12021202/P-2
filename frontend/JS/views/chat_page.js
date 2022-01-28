export function getChatHTML(response){
    let chat_html =
    `<div class="chat_popup hidden">
    <span class="chat_popup_text">채팅방을 나가시겠습니까?</span>
    <div class="chat_popup_btns">
        <button class="chat_popup_cancle_btn">취소</button>
        <button class="chat_popup_exit_btn" data-user="${response[0].user_id}" data-key="${response[0].id}">나가기</button>
    </div>
</div>
<div class="chat_box">
    <div class="chat_header">
        <img src="${response[0].owner_profile}" alt="" class="chat_profile_img">
        <div class="chat_profile_info">
            <span class="chat_profile_name">${response[0].name}</span>
            <span class="chat_profile_num">${response[0].phone_num}</span>
        </div>
        <button class="chat_exit_btn">나가기</button>
    </div>
    <div class="chat_content type1">
        <li class="my_chat_line">
            <div class="chat_user_text_box">
                <span class="my_text">사용자 말풍선</span>
            </div>
        </li>
        <li class="opponent_chat_line">
            <div class="chat_opponent_text_box">
                <span class="opponent_text">상대방 말풍선</span>
            </div>
        </li>
    </div>
    <div class="chat_footer">
        <input type="text" class="chat_input">
        <button class="send_chat_btn">전송</button>
    </div>
</div>`;

    return chat_html;
}