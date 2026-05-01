import Lenis from 'lenis';

// const holi = 'world';
// console.log('Hello ' + holi);

// SMOOTH SCROLL CON LENIS
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);



// SCROLL CON ANIMACIÓN

document.getElementById('top-button').addEventListener('click', () => {
    lenis.scrollTo(0);
});



// BOTON QUE DESAPARECE

const buttonTop = document.getElementById('top-button');

if (buttonTop) {
    buttonTop.addEventListener('click', () => {
        lenis.scrollTo(0);
    });

    window.onscroll = function() {
        var scroll = document.documentElement.scrollTop;
        if (scroll > 200) {
            buttonTop.style.transform = "scale(1)";
        } else {
            buttonTop.style.transform = "scale(0)";
        }
    }
}




// ANIMACIÓN DEL LOGO AL HACER CLICK

const logoImg = document.getElementById('logo-img');
const logoLink = logoImg?.parentElement;

if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault(); // Previene la navegación

        // Agrega la clase de rotación
        logoImg.classList.add('spin-animation');

        // Después de 0.5 segundos, remueve la clase y navega
        setTimeout(() => {
            logoImg.classList.remove('spin-animation');
            window.location.href = logoLink.href;
        }, 500);
    });
}


// HEADER Y FOOTER

// async function loadPartial(selector, url) {
//     const el = document.querySelector(selector);
//     if (!el) return;
//     const res = await fetch(url);
//     el.innerHTML = await res.text();
// }

// loadPartial('header', 'partials/header.html');
// loadPartial('footer', 'partials/footer.html');



