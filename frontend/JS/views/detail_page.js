export function getDetailHTML(key) {
    let detail_page_html = 
    `<div class="detail">
    <div class="detail_header">
        <button class="prev">＜</button>
        <div class="carousel-wrapper">
            <div class="carousel">
                <img src="imgs/detail_img/1.jpg">
                <img src="imgs/detail_img/2.jpg">
                <img src="imgs/detail_img/3.jpg">
                <img src="imgs/detail_img/4.jpg">
                <img src="imgs/detail_img/5.jpg">
            </div>
        </div>
        <button class="next">＞</button>
    </div>
    <div class="detail_content">
        <div class="profile_img_box">
            <img src="imgs/detail_img/profile.png" alt="" class="detail_img">
        </div>
        <div class="profile_info">
            <div class="profile_info_box">
                <span class="profile_title">key:${key}인 데이터</span>
                <span class="profile_phone_num">010-XXXX-XXXX</span>
            </div>
            <div class="profile_sub_func">
                <i id="chat" class="fas fa-comment-dots fa-2x"></i>
                <i id="unlike" class="far fa-heart fa-2x"></i>
            </div>   
        </div>
    </div>
    <div class="detail_footer">
        <span class="detail_footer_title">상세 설명</span>
        <div class="detail_footer_info">
            <span>주소: 우만동 74-1</span>
            <span>보증금: 5000만원</span>
            <span>월세: 89만원</span>
            <span>관리비: 47만원</span>
            <span>옵션: TV, 냉장고 등</span>
        </div>
        <div class="detail_footer_chat">
            <button class="chat_btn">채팅 하기</button>
        </div>
    </div>
    </div>`;

    return detail_page_html;
}


