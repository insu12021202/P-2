const container = document.querySelector('.container');

export default async function check_body(){
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    };
};
