import settings from './settings.js';
import images from './images.js';

var img = document.getElementById('slider');
var opacity = 0;
var intervalID = 0;

function load_img(image) {
    img.style.opacity = 0;

    img.setAttribute('width', settings.width);

    img.setAttribute('height', settings.height);

    img.setAttribute('src', image);

    img.classList.add('.slider');

    fadeIn();
}

function next_prev() {
    img.setAttribute('width', settings.width);

    img.setAttribute('height', settings.height);

    img.setAttribute('src', images[0]);

    img.classList.add('slider');

    let arrow1 = document.createElement('div');
    let arrow2 = document.createElement('div');

    arrow1.classList.add('arrow1');
    arrow2.classList.add('arrow2');

    arrow1.addEventListener('click', next);
    arrow2.addEventListener('click', prev);

    img.appendChild(arrow1);
    img.appendChild(arrow2);
}

function next() {
    let image = images++;
    img.setAttribute('src', image);
}

function prev() {
    let image = images--;
    img.setAttribute('src', image);
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
            load_img(images[i]);
            if (i == images.length) {
                timer();
            }
        }, settings.duration * i);
    }
}
if (settings.arrows === true) {
    next_prev();
} else {
    timer();
}
