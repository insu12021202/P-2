const user_btn = document.querySelector('.user_btn');
const user_popup = document.querySelector('.user_popup');

function togglePopup(){
    user_popup.classList.toggle('hidden');
}

user_btn.addEventListener('click', togglePopup);