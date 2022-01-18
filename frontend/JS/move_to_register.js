import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";

const register_btn = document.querySelector('.go_to_register_btn');

export function goToRegister(){
    let url = 'register';
    pushUrl(url);
    renderingHTML(url);
}

register_btn.addEventListener('click', goToRegister);