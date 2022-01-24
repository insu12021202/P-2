export function deleteLocation() {
    const td_btns = document.querySelectorAll('td');
    td_btns.forEach(element => {
        element.addEventListener('click', (e)=>{
            e.target.classList.toggle('blue');
        })
    });

    const delete_btn = document.querySelector('.delete_location');
    const delete_cancle_btn = document.querySelector('.delete_popup_cancle_btn');
    const delete_popup_delete_btn = document.querySelector('.delete_popup_delete_btn');

    delete_popup_delete_btn.addEventListener('click', deleteLc);
    delete_btn.addEventListener('click', togglePopup);
    delete_cancle_btn.addEventListener('click', togglePopup);
}

function deleteLc() {
    const delete_target = document.querySelectorAll('.blue');
    const arr = [];
    delete_target.forEach(data => {
        arr.push(data.innerText);
    });
    $.ajax({
        type: "DELETE",
        url:'/location_ctr_delete',
        traditional: true,
        data: {
            target : JSON.stringify(arr)
        },
        dataType: 'json',
        success: (response)=>{
            if(response.success === 'success'){
                window.alert('삭제 되었습니다.');
                history.back();
            }
        },
        error: (log)=>{console.log(log)}
    });
}

function togglePopup() {
    const location_ctr_delete_popup = document.querySelector('.location_ctr_delete_popup');
    location_ctr_delete_popup.classList.toggle('hidden');
}