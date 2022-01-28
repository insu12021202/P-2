export function chattingFunc(event) {
    const exit_btn = document.querySelector('.chat_exit_btn');
    const chatting_popup_cancle_btn = document.querySelector('.chat_popup_cancle_btn');
    const chatting_popup_exit_btn = document.querySelector('.chat_popup_exit_btn');

    let item_id = chatting_popup_exit_btn.dataset.key;
    let user_id = chatting_popup_exit_btn.dataset.user;

    exit_btn.addEventListener('click', toggleChattingPopup);
    chatting_popup_cancle_btn.addEventListener('click', toggleChattingPopup);
    chatting_popup_exit_btn.addEventListener('click', ()=>{
        ExitChatting(item_id, user_id);
    });
}

function ExitChatting(item_id, user_id){
    $.ajax({
        type: "POST",
        url:'/chatting_exit',
        data: {
            item_id : item_id,
            user_id : user_id
        },
        dataType: 'json',
        success: (response)=>{
            if(response.success == 'success'){
                history.back();
            }
        },
        error: (log)=>{console.log(log)}
    });
}

function toggleChattingPopup(){
    const chatting_popup = document.querySelector('.chat_popup');
    chatting_popup.classList.toggle('hidden');
}