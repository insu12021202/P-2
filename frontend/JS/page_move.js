import { location_arr } from "./location_data.js";
import renderingHTML from "./render.js";
import { getDetailHTML } from "./views/detail_page.js";
import { getSearchedHTML } from "./views/item_list.js";
const container = document.querySelector('.container');

window.onpopstate = function(e) {
    let url = location.pathname;
    if(url.includes('searched')){
        //url의 끝 숫자로 검색어 값 뽑기
        let index = url.substring(10,);
        let value = location_arr[index];
        let html_str = getSearchedHTML(value);
        renderingHTML(url.substring(1,), html_str);
    }
    if(url.includes('detail')){
        //url의 끝 숫자로 검색어 값 뽑기
        let index = url.substring(7,);
        let html_str = getDetailHTML(index);
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
