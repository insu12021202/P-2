export function getSearchedHTML(value) {
    let item_list_html = 
    `<div class="container_content">
    <div class="container_content_header">
        <span class="container_content_header_location">${value} 검색 결과입니다</span>
    </div>
    <div class="container_content_item_list">
    <li>
        <div class="item_img">
            <img src="https://image.ohou.se/i/bucketplace-v2-development/uploads%2Fadvices%2Fcover_images%2F1486024820409_eZ3O.JPG?gif=1&w=720" alt="1">
        </div>
        <div class="item_info">
                <span>위치: ${value}</span>
                <span>보증금: 5000만원</span>
                <span>월세: 80만원</span>
                <span>관리비: 17만원</span>
                <span>${value} 부동산</span>
        </div>
        <div class="item_sub_func">
                <i id="chat" class="fas fa-comment-dots fa-2x"></i>
                <i id="unlike" class="far fa-heart fa-2x"></i>
                <i id="like" class="fas fa-heart fa-2x"></i>
            </div>
    </li>
    <li>
            <div class="item_img">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Wohnzimmer_2007.jpg/1200px-Wohnzimmer_2007.jpg" alt="2">
            </div>
            <div class="item_info">
                <span>위치: ${value}</span>
                <span>보증금: 5000만원</span>
                <span>월세: 80만원</span>
                <span>관리비: 17만원</span>
                <span>${value} 부동산</span>
            </div>
            <div class="item_sub_func">
                <i id="chat" class="fas fa-comment-dots fa-2x"></i>
                <i id="unlike" class="far fa-heart fa-2x"></i>
                <i id="like" class="fas fa-heart fa-2x"></i>
            </div>
        </li>
    </div>
    </div>`
    return item_list_html;
}
 