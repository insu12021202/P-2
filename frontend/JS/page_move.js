import chooseLocaiton from "./choose_location.js";
import { location_arr } from "./location_data.js";
import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { getChatListHTML } from "./views/chat_list_page.js";
import { getChatHTML } from "./views/chat_page.js";
import { getDetailHTML } from "./views/detail_page.js";
import { getSearchedHTML, makeItemList } from "./views/item_list.js";
import { getLikeListHTML } from "./views/like_list_page.js";
import { getLocationCtrHTML } from "./views/location_ctr_page.js";
const container = document.querySelector('.container');

window.onpopstate = function(e) {
    let url = location.pathname;
    router(url);
}
function router(url) {
    if(url.includes('searched')){
        //url의 끝 숫자로 검색어 값 뽑기
        let value = history.state.data;
        let url = 'searched_item';
        $.ajax({
            type: "POST",
            url: url,
            data: {
                location : value
            },
            dataType: 'json',
            success: (response)=>{
                if(response.success === 'fail'){
                    window.alert('검색하신 지역의 매물이 없습니다.');
                    location.href = 'http://localhost:8000/';
                }
                else{
                    console.log(response); //나중에 지울 것
                    let list = makeItemList(response);
                    let html_str = getSearchedHTML(list,response[0].location);
                    pushUrl(url, value);
                    renderingHTML(url, html_str);
                }
            },
            error: (log)=>{console.log(log)}
        });
    }
    if(url.includes('detail')){
        //url의 끝 숫자로 검색어 값 뽑기
        let data = history.state.data
        let html_str = getDetailHTML(data);
        renderingHTML(url, html_str);
    }
    if(url.includes('like_list')){
        //로그인 구축하고 나서 사용자 정보 파악해서 getLikeListHTML에 넣어주자
        let index = '사용자';
        let html_str = getLikeListHTML(index);
        renderingHTML(url.substring(1,), html_str);
    }
    if(url.includes('chat_list')){
        //로그인 구축하고 나서 사용자 정보 파악해서 getChatListHTML에 넣어주자
        let index = '사용자';
        let html_str = getChatListHTML(index);
        renderingHTML(url.substring(1,), html_str);
    }
    if(url.includes('chatting')){
        let item_id = history.state.data[0].id;
        let user_id = history.state.data[0].user_id;
        //만약 해당 매물의 chat == 0 이면 채팅 신청을 하고 들어가라고 알림 띄우기
        $.ajax({
            type: "POST",
            url:'/chat_data',
            data: {
                item_id : item_id,
                user_id : user_id
            },
            dataType: 'json',
            success: (response)=>{
               console.log(response);
               if(response[0].chat === 1){ //채팅 신청이 되어 있으면 앞으로 가기나 뒤로 가기로 접근 가능
                   let html_str = getChatHTML(response);
                   renderingHTML(url, html_str);
               }
               else{ //채팅 신청이 안 되어 있으면 접근 불가 메시지 출력
                   window.alert('채팅 신청이 된 경우에만 채팅창을 열 수 있습니다.');
               }
            },
            error: (log)=>{console.log(log)}
        });
    }
    if(url.includes('location_ctr')){
        //로그인 구축하고 나서 사용자 정보 파악해서 getChatListHTML에 넣어주자
        let index = '사용자';
        let html_str = getLocationCtrHTML(index);
        renderingHTML(url.substring(1,), html_str);
    }
    switch (url) {
        case '/login':
                renderingHTML(url.substring(1,));
            break;
        case '/register':
            renderingHTML(url.substring(1,));
            break;
        case '/':
            renderingHTML(url.substring(1,));
            break;
    }
}