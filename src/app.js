const holi = 'world';
console.log('Hello ' + holi);


// SCROLL CON ANIMACIÓN

document.getElementById('top-button').addEventListener('click', scrollTop);

function scrollTop(){

    var currentScroll = document.documentElement.scrollTop;
    
    if(currentScroll > 50){
        window.requestAnimationFrame(scrollTop);
        window.scrollTo(0, currentScroll - (currentScroll/8));
    }
}

// BOTON QUE DESAPARECE

buttonTop = document.getElementById('top-button');

window.onscroll = function() {
    var scroll = document.documentElement.scrollTop;

    if(scroll > 200){
        buttonTop.style.transform = "scale(1)";

    }else{
        buttonTop.style.transform = "scale(0)";
    }
}





