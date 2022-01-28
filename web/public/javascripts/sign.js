const close01 = document.getElementById('close01');
const close02 = document.getElementById('close02');
const open01 = document.getElementById('login_open');
const open02 = document.getElementById('signup_open');
const modal01 = document.getElementById('modal01');
const modal02 = document.getElementById('modal02');
// 로그인 창 출력
open01.addEventListener('click', () => modal01.classList.add('show-modal'));


// 회원가입 창 출력

open02.addEventListener('click', () => modal02.classList.add('show-modal'));

// 회원가입, 로그인 창 닫기

close01.addEventListener('click', () => modal01.classList.remove('show-modal'));
close02.addEventListener('click', () => modal02.classList.remove('show-modal'));




