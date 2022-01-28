import check_body from "./check_body.js";
import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { getLikeListHTML } from "./views/like_list_page.js";

const like_list_btn = document.querySelector('.like_list_btn');
const user_popup = document.querySelector('.user_popup');

function moveToLikeList() {
    check_body();
    
    // let html_str = getLikeListHTML();
    // let url = `${user_name}/like_list`;
    // pushUrl(url);
    // renderingHTML(url, html_str);
    // user_popup.classList.toggle('hidden');
}

like_list_btn.addEventListener('click', moveToLikeList);