export function getDetailHTML(response) {
    let like = '';
    if(response[0].like_status === '1'){
        like = `<i data-key="${response[0].id}" class="fas fa-heart fa-2x like"></i>`;
    }else {
        like = `<i data-key="${response[0].id}" class="far fa-heart fa-2x like"></i>`;
    }
    let images = response[0].paths.split(',');
    let detail_page_html = 
    `<div class="detail">
        <div class="detail_header">
            <button class="prev">＜</button>
            <div class="carousel-wrapper">
                <div class="carousel">
                    <img src="${images[0]}">
                    <img src="${images[1]}">
                    <img src="${images[2]}">
                </div>
            </div>
            <button class="next">＞</button>
        </div>
        <div class="detail_content">
            <div class="profile_img_box">
                <img src="${response[0].owner_profile}" alt="" class="detail_img">
            </div>
            <div class="profile_info">
                <div class="profile_info_box">
                    <span class="profile_title">${response[0].name}</span>
                    <span class="profile_phone_num">${response[0].phone_num}</span>
                </div>
                <div class="profile_sub_func">
                    <i class="fas fa-comment-dots fa-2x chat"></i>
                    ${like}
                </div>   
            </div>
        </div>
        <div class="detail_footer">
            <span class="detail_footer_title">상세 설명</span>
            <div class="detail_footer_info">
                <span>주소: ${response[0].location}</span>
                <span>보증금: ${response[0].deposit}</span>
                <span>전/월세: ${response[0].rental_cost}</span>
                <span>관리비: ${response[0].m_fee}</span>
                <span>옵션: TV, 냉장고 등</span>
            </div>
            <div class="detail_footer_chat">
                <button class="chat_btn">채팅 하기</button>
            </div>
        </div>
    </div>
    `;

    return detail_page_html;
}


