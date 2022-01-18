import { location_arr } from "./location_data.js";
import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { getSearchedHTML } from "./views/item_list.js";

const choose_location = document.querySelector('#choose_location');
 //나중에 이 배열을 따로 받아오고 export 해줄 수 있게끔 만들어야 함

export default function chooseLocaiton(event){
    let value = event.target.value;
    let key = switchValue(value)
    let url = 'searched_' + key //이게 key값
    let html_str = getSearchedHTML(value);
    pushUrl(url);
    renderingHTML(url, html_str);
}

choose_location.addEventListener('change', chooseLocaiton);

function switchValue(value) {
    return location_arr.indexOf(`${value}`); //value를 location 배열의 인덱스로 전환
}