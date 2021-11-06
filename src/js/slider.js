import settings from '../config/settings.js';
import images from './images.js';

let img = document.getElementById('slider');
let opacity = 0;
let intervalID = 0;
let slideCounter = 0;

function hideArrows() {
    const arrow1 = document.getElementById('arrow1');
    const arrow2 = document.getElementById('arrow2');
    arrow1.classList.add('hidden');
    arrow2.classList.add('hidden');
}

function loadImage(image) {
    img.style.opacity = 0;
    img.setAttribute('width', settings.width);
    img.setAttribute('height', settings.height);
    img.setAttribute('src', image.href);
    img.classList.add('slider');
    fadeIn();
}

function arrowNavigate() {
    img.setAttribute('width', settings.width);
    img.setAttribute('height', settings.height);
    img.setAttribute('src', images[0].href);

    const arrow1 = document.getElementById('arrow1');
    const arrow2 = document.getElementById('arrow2');

    arrow1.addEventListener('click', prevImage);
    arrow2.addEventListener('click', nextImage);
}

function nextImage() {
    slideCounter++;
    if (slideCounter === images.length) {
        slideCounter = 0;
    }
    img.setAttribute('src', images[slideCounter].href);
}

function prevImage() {
    if (slideCounter === 0) {
        slideCounter = images.length;
    }
    slideCounter--;
    img.setAttribute('src', images[slideCounter].href);
}

function fadeIn() {
    setInterval(function () {
        opacity = Number(
            window.getComputedStyle(img).getPropertyValue('opacity')
        );
        if (opacity < 1) {
            opacity = opacity + 0.1;
            img.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, settings.fadespeed);
}

function timer() {
    for (let i = 0; i <= images.length; i++) {
        setTimeout(function () {
            if (i === images.length) {
                timer();
            } else {
                loadImage(images[i]);
            }
        }, settings.duration * i);
    }
}

if (settings.arrows === true) {
    arrowNavigate();
} else {
    hideArrows();
    timer();
}
