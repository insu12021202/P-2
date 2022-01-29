export function getChatListHTML(list, response){
    let chat_list_html =
    `<div class="container_content">
        <div class="container_content_header">
            <span class="container_content_header_chat_list">${response[0].nickname}님 채팅 신청 목록</span>
        </div>
        <div class="container_content_chat_list">
        ${list}
        </div>
    </div>`

    return chat_list_html;
}