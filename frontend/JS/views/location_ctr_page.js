export function getLocationCtrHTML(key) {
    let location_ctr_html =
    `<div class="location_ctr_add_popup hidden">
    <span class="location_ctr_add_title">위치를 입력하세요</span>
    <input type="text" name="location_add_input" id="location_add_input">
    <div class="location_ctr_add_popup_btns">
        <button class="location_ctr_add_popup_cancle_btn">취소</button>
        <button class="location_ctr_add_popup_add_btn">추가하기</button>
    </div>
</div>
<div class="location_ctr_delete_popup hidden">
    <span class="location_ctr_delete_popup_text">정말 삭제하시겠습니까?</span>
    <div class="location_ctr_delete_popup_btns">
        <button class="location_ctr_delete_popup_cancle_btn">취소</button>
        <button class="location_ctr_delete_popup_delete_btn">삭제하기</button>
    </div>
</div>
<div class="location_ctr">
    <div class="location_ctr_header">
        <span class="location_ctr_header_title">지역 관리창입니다</span>
        <span class="location_ctr_header_subtitle">원하시는 지역을 추가하거나 삭제하세요</span>
    </div>
    <div class="location_ctr_content">
        <table class="location_ctr_table">
            <tr>
                <td>우만동</td>
                <td>원천동</td>
                <td>우만동</td>
                <td>우만동</td>
                <td>우만동</td>
            </tr>
            <tr>
                <td>우만동</td>
                <td>우만동</td>
                <td>우만동</td>
                <td>우만동</td>
                <td>우만동</td>
            </tr>
        </table>
    </div>
    <div class="location_ctr_footer">
        <button class="delete_location">삭제하기</button>
        <button class="add_location">추가하기</button>
    </div>
</div>`

    return location_ctr_html;
}