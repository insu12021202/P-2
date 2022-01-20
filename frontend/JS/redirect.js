
$.ajax({
    type: "GET",
    url:'/',
    dataType: 'json',
    success: (response)=>{
        console.log(response);
    },
    error: (log)=>{console.log(log)}
});