export function sendSubFuncData(event) {
    let item_id = event.target.dataset.key;
    let like_status = event.target.classList[0];
    if(like_status === 'fas'){ //이미 좋아요 되어있는 상태면 1
        like_status = 1
    }else{
        like_status = 0 //만약 아니면 0
    }
    $.ajax({
        type: "POST",
        url:'/sub_func',
        data: {
            item_id : item_id,
            like_status : like_status
        },
        dataType: 'json',
        success: (response)=>{
            if(response.success == 'success1'){ //만약 좋아요 취소면 꽉 찬 하트에서 빈 하트로 바꾸기
                event.target.classList.replace('fas','far');
            }
            if(response.success == 'success0'){ //만약 좋아요를 한 거면 빈 하트에서 꽉 찬 하트로 바꾸기
                event.target.classList.replace('far','fas');
            }
        },
        error: (log)=>{console.log(log)}
    });
}