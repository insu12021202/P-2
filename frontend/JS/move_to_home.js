import check_body from "./check_body.js";
import pushUrl from "./pushUrl.js";

const logo = document.querySelector('.header_logo');

export default function moveToHome() {
    pushUrl('');
    check_body();
}

logo.addEventListener('click', moveToHome);