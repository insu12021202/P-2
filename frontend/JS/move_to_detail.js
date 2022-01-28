import pushUrl from "./pushUrl.js";
import renderingHTML from "./render.js";
import { getDetailHTML } from "./views/detail_page.js";

export function moveToDetail(key, user_id, like_class) {
    if(like_class === 'fas'){ // 이미 좋아요 되어있는 상태면 1
        like_class = 1
    }else{
        like_class = 0 // 만약 아니면 0
    }
    let url = 'detail'
    let item_id = key;
    $.ajax({
        type: "POST",
        url:'/detail',
        data: {
            item_id : item_id,
            user_id : user_id,
            like_status : like_class
        },
        dataType: 'json',
        success: (response)=>{
            let html_str = getDetailHTML(response);
            pushUrl(url, response);
            renderingHTML(url,html_str);
        },
        error: (log)=>{console.log(log)}
    });
}