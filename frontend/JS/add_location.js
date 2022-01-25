export function addLocation() {
    const add_location = document.querySelector('.add_location');
    const location_ctr_add_popup = document.querySelector('.location_ctr_add_popup');
    const add_popup_cancle_btn = document.querySelector('.add_popup_cancle_btn');
    const add_popup_add_btn = document.querySelector('.add_popup_add_btn');
    const location_add_input = document.querySelector('#location_add_input');

    add_popup_add_btn.addEventListener('click', () => {
        console.log('cadasd');
        $.ajax({
            type: "POST",
            url:'/location_ctr_add',
            data: {
                location_name : location_add_input.value
            },
            dataType: 'json',
            success: (response)=>{
                if(response.success === 'success'){
                    window.alert('성공적으로 지역이 추가 되었습니다.');
                    location.href = 'http://localhost:8000/';
                }
            },
            error: (log)=>{console.log(log)}
        });
    })        
    add_location.addEventListener('click', () => {
        location_ctr_add_popup.classList.toggle('hidden');
    })

    add_popup_cancle_btn.addEventListener('click', () => {
        location_ctr_add_popup.classList.toggle('hidden');
    })
}