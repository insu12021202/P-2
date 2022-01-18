const container = document.querySelector('.container');

export default function check_body(){
    if(container.childNodes[0]) {  
        container.removeChild(container.childNodes[0]);
        }
};
