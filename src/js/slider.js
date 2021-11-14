import settings from '../config/settings.js';
import images from 'url:../images/*.jpg';

import 'animate.css';

const img = document.getElementById('slider');
const numberofImages = Object.keys(images).length;
let slideCounter = 1;
let preloaded = 0;

document.addEventListener('DOMContentLoaded', preLoader, true);

function preLoader() {
    for (let i = 1; i <= numberofImages; i++) {
        let tempImage = new Image();
        tempImage.addEventListener('load', progress, true);
        tempImage.src = images[i];
        console.log(tempImage.src);
    }
}

function progress() {
    preloaded++;
    console.log(preloaded);

    if (settings.arrows === false) {
        hideArrows();
        timer();
    }
    arrowNavigate();
}

function fadeSpeedToString() {
    let float = (settings.fadespeed / 1000) % 60;
    let string = float.toString();
    let result = string + 's';
    return result;
}

function hideArrows() {
    const arrow1 = document.getElementById('arrow1');
    const arrow2 = document.getElementById('arrow2');
    arrow1.classList.add('hidden');
    arrow2.classList.add('hidden');
}

function loadImage(image) {
    img.setAttribute('width', settings.width);
    img.setAttribute('height', settings.height);
    img.setAttribute('src', image);
    img.classList.add('slider');
}

function arrowNavigate() {
    img.setAttribute('width', settings.width);
    img.setAttribute('height', settings.height);
    img.setAttribute('src', images[slideCounter]);

    const arrow1 = document.getElementById('arrow1');
    const arrow2 = document.getElementById('arrow2');

    arrow1.addEventListener('click', prevImage);
    arrow2.addEventListener('click', nextImage);
}

function nextImage() {
    animateIn();
    if (slideCounter === numberofImages) {
        slideCounter = 0;
    }
    slideCounter++;
    console.log(slideCounter);
    img.setAttribute('src', images[slideCounter]);
    
}

function prevImage() {
    slideCounter--;
    animateIn();
    if (slideCounter === 0) {
        slideCounter = numberofImages;
    }
    img.setAttribute('src', images[slideCounter]);
    
}

function animateIn() {
    img.style.setProperty('--animate-duration', fadeSpeedToString());
    img.classList.add('animate__animated', settings.animateEffect);

    setTimeout(function () {
        img.classList.remove(settings.animateEffect);
    }, settings.fadespeed);
}

function timer() {
    for (let i = 1; i <= numberofImages; i++) {
        setTimeout(function () {
            animateIn();
            loadImage(images[i]);
            if (i === numberofImages) {
                timer();
            }
        }, settings.duration * i);
    }
}
