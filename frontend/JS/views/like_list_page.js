export function getLikeListHTML(list, response) {
    let like_list_html = 
    `<div class="container_content">
        <div class="container_content_header">
            <span class="container_content_header_like_list">${response[0].nickname}님의 좋아요 목록</span>
        </div>
        <div class="container_content_like_list">
        ${list}
        </div>
    </div>`

    return like_list_html;
}