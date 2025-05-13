const modal=document.querySelector('#modal');
console.log(modal);
const modalText=document.querySelector('#modalText');
const modalButton=document.querySelector("#modalButton");


const showModal=(text)=>{
    modalText.innerText=text;
    modal.style.display='flex';
};

const removeModal=()=>{
    modal.style.display='none';
};



export {showModal , removeModal };

