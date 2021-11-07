import settings from '../config/settings.js';
import images from 'url:../images/*.jpg';

let img = document.getElementById('slider');
let opacity = 0;
let intervalID = 0;
let slideCounter = 1;
const numberofImages = Object.keys(images).length;

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
    img.setAttribute('src', image);
    img.classList.add('slider');
    fadeIn();
}

function arrowNavigate() {
    img.setAttribute('width', settings.width);
    img.setAttribute('height', settings.height);
    img.setAttribute('src', images[1]);

    const arrow1 = document.getElementById('arrow1');
    const arrow2 = document.getElementById('arrow2');

    arrow1.addEventListener('click', prevImage);
    arrow2.addEventListener('click', nextImage);
}

function nextImage() {
    if (slideCounter === numberofImages) {
        slideCounter = 0;
    }
    slideCounter++;
    img.setAttribute('src', images[slideCounter]);
}

function prevImage() {
    slideCounter--;
    if (slideCounter === 0) {
        slideCounter = numberofImages;
    }
    img.setAttribute('src', images[slideCounter]);
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
    for (let i = 1; i <= numberofImages; i++) {
        setTimeout(function () {
            if (i === numberofImages) {
                loadImage(images[i]);
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
