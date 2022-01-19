const container = document.querySelector('.container');

export default function check_body(){
    if(container.childNodes) { 
        container.childNodes.forEach((node) => {
            container.removeChild(node);
        }) 
    }
};
