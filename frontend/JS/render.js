import check_body from "./check_body.js";
import { moveToDetail } from "./move_to_detail.js";
import moveToHome from "./move_to_home.js";
import { goToRegister } from "./move_to_register.js";
import { login_html } from "./views/login_page.js";
import { register_html } from "./views/register_page.js";
import moveToChat from "./move_to_chat.js";

const container = document.querySelector('.container');

export default function renderingHTML(url, html_str){
    check_body(); //body 안에 요소가 있으면 지우는 함수
    //만약 url에 detail이라는 문자가 포함되어 있으면 detail page로 이동
    if(url.includes('detail')){
        container.insertAdjacentHTML('afterbegin', html_str);
    }
    if(url.includes('searched')){
        container.insertAdjacentHTML('afterbegin', html_str);
        const imgs = document.querySelectorAll('.item_img img');
        imgs.forEach(img => img.addEventListener('click', (e)=>{
            moveToDetail(e.target.alt);
        }))
    }
    if(url.includes('like_list')){
        container.insertAdjacentHTML('afterbegin', html_str);
    }
    if(url.includes('chat_list')){
        container.insertAdjacentHTML('afterbegin', html_str);
        const chat_btns = document.querySelectorAll('#chat');
        chat_btns.forEach((btn) => btn.addEventListener('click',(e)=> {
            let key = e.target.dataset.value;
            moveToChat(key);
        }))
    }
    if(url.includes('chatting')){
        container.insertAdjacentHTML('afterbegin', html_str);
    }
    if(url.includes('location_ctr')){
        container.insertAdjacentHTML('afterbegin', html_str);
    }
    switch (url) {
        case 'login':
                container.insertAdjacentHTML('afterbegin', login_html);
                //렌더링된 로그인 페이지의 회원가입 버튼에 이벤트 등록
                const move_to_register_btn = document.querySelector('.login_content_register_btn');
                move_to_register_btn.addEventListener('click', goToRegister);
            break;
        case 'register':
                container.insertAdjacentHTML('afterbegin', register_html);

                const id_value = document.querySelector('#register_id_input');
                const nickname_value = document.querySelector('#register_nickname_input');
                const password_value = document.querySelector('#register_password_input');
                const register_btn = document.querySelector('.register_btn');

                register_btn.addEventListener('click', ()=> {
                    let username = id_value.value;
                    let password = password_value.value;
                    let nickname = nickname_value.value;

                    $.ajax({
                        type: "POST",
                        url:'/register',
                        data: {
                            username : username,
                            password : password,
                            nickname : nickname
                        },
                        dataType: 'json',
                        success: (response)=>{
                            console.log(response);
                        },
                        error: (log)=>{console.log(log)}
                    });
                })

            break;
        case '': //홈 화면 그리기 (서버 구축 후에 만들 예정) 
                moveToHome();
    }
}