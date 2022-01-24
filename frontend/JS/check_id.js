export function checkId(){
    const check_id_btn = document.querySelector('#register_id_check_btn');

    check_id_btn.addEventListener('click',()=>{
        const id_input = document.querySelector('#register_id_input');
        $.ajax({
        type: "POST",
        url:'/check_id',
        data: {
            id : id_input.value
        },
        dataType: 'json',
        success: (response)=>{
            if(response.success === 'success'){
                window.alert('사용 가능한 아이디입니다.');
            }
            else {
                window.alert('다른 아이디를 사용 해주세요.');
            }
            
        },
        error: (log)=>{console.log(log)}
        });
    })
}