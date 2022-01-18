import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";

const login_btn = document.querySelector('.go_to_login_btn');

function goToLogin(){
    let url = 'login';
    pushUrl(url);
    renderingHTML(url);
}

login_btn.addEventListener('click', goToLogin);
