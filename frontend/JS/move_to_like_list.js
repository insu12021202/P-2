import check_body from "./check_body.js";
import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { makeItemList } from "./views/item_list.js";
import { getLikeListHTML } from "./views/like_list_page.js";

const like_list_btn = document.querySelector('.like_list_btn');
const user_popup = document.querySelector('.user_popup');

function moveToLikeList() {
    check_body();
    $.ajax({
        type: "GET",
        url:'/like_list',
        data: {},
        dataType: 'json',
        success: (response)=>{
            console.log(response);
            if(response.success == 'fail'){
                window.alert('좋아요 하신 목록이 없습니다.');
            }else{
                let url = 'like_list';
                let list = makeItemList(response);
                let html_str = getLikeListHTML(list, response);
                pushUrl(url, response);
                renderingHTML(url, html_str);
                user_popup.classList.toggle('hidden');
            }
        },
        error: (log)=>{console.log(log)}
    });
}

like_list_btn.addEventListener('click', moveToLikeList);