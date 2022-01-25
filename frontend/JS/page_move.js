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
        let index = url.substring(7,);
        let html_str = getDetailHTML(index);
        renderingHTML(url.substring(1,), html_str);
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
        //url의 끝 숫자로 검색어 값 뽑기
        let index = url.slice(-1);
        let html_str = getChatHTML(index);
        renderingHTML(url.substring(1,), html_str);
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