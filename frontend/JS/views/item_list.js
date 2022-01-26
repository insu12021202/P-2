export function getSearchedHTML(list, location) {
    let item_list_html = 
    `<div class="container_content">
    <div class="container_content_header">
        <span class="container_content_header_location">${location} 검색 결과입니다</span>
    </div>
    <div class="container_content_item_list">
    ${list}
    </div>
    </div>`
    return item_list_html;
}

export function makeItemList(response) {
    let like = ``;
    let list = '';
    let i = 0;
    while(i < response.length){
        if(response[i].like === 1){
            like = `<i id="like" data-key="${response[i].id}" class="fas fa-heart fa-2x"></i>`;
        }else {
            like = `<i id="like" data-key="${response[i].id}" class="far fa-heart fa-2x"></i>`;
        }
        list = list + 
        `<li> <div class="item_img">
        <img src="${response[i].image}" data-key="${response[i].id}">
        </div>
        <div class="item_info">
            <span>위치: ${response[i].location}</span>
            <span>보증금: ${response[i].deposit}</span>
            <span>전/월세: ${response[i].rental_cost}</span>
            <span>관리비: ${response[i].m_fee}</span>
            <span>부동산: ${response[i].name}</span>
        </div>
        <div class="item_sub_func">
            <i id="chat" class="fas fa-comment-dots fa-2x"></i>
            ${like}
        </div></li>`;
        i = i + 1;
    }
    return list;
}
 
