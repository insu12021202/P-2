import { location_arr } from "./location_data.js";
import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { getSearchedHTML, makeItemList } from "./views/item_list.js";

const choose_location = document.querySelector('#choose_location');
const choose_location_logined = document.querySelector('#choose_location_logined');
 //나중에 이 배열을 따로 받아오고 export 해줄 수 있게끔 만들어야 함

export default function chooseLocaiton(event){
    let value = event.target.value;
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

function login_check() {
    window.alert('로그인을 먼저 진행해주세요.');
}

//만약 로그인 안 한 상태면 choose_location에 로그인을 하라는 이벤트 등록
if(choose_location) {
    choose_location.addEventListener('click', login_check);
}
//만약 로그인 한 상태면 choose_location_logined에 지역 검색 이벤트 등록
if(choose_location_logined) {
    choose_location_logined.addEventListener('change', chooseLocaiton);
}



// function switchValue(value) {
//     return location_arr.indexOf(`${value}`); //value를 location 배열의 인덱스로 전환
// }