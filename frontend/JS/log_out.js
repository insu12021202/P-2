const logout_btn = document.querySelector('.log_out');

function logOut() {
    window.location.href = 'http://localhost:8000/logout';
}

logout_btn.addEventListener('click', logOut);