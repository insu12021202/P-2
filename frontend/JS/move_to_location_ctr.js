import check_body from "./check_body.js";
import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { rednerSelect } from "./select_location.js";
import { getLocationCtrHTML, makeTdList } from "./views/location_ctr_page.js";

const location_ctr_btn = document.querySelector('.location_ctr_btn');
const user_btn = document.querySelector('.user_btn');
const user_popup = document.querySelector('.user_popup');

function moveToLocationCtr() {
    check_body();
    $.ajax({
        type: "GET",
        url:'/location_ctr',
        data: {},
        dataType: 'json',
        success: (response)=>{
            let user_name = user_btn.innerText;
            let list = makeTdList(response);
            rednerSelect(response);
            let html_str = getLocationCtrHTML(list);
            let url = `${user_name}/location_ctr`;
            pushUrl(url);
            renderingHTML(url, html_str);
            user_popup.classList.toggle('hidden');
        },
        error: (log)=>{console.log(log)}
    });


}

location_ctr_btn.addEventListener('click', moveToLocationCtr);