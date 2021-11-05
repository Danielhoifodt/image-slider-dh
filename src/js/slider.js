import settings from './settings.js';
import images from './images.js';

let img = document.getElementById('slider');
let opacity = 0;
let intervalID = 0;

// console.log(images[0].href);

function loadImage(image) {
    console.log('Image: ', image);

    img.style.opacity = 0;

    img.setAttribute('width', settings.width);

    img.setAttribute('height', settings.height);

    img.setAttribute('src', image.href);

    img.classList.add('.slider');

    fadeIn();
}

function next_prev() {
    console.log('Called next_prev ...');
    console.log(images[0].href);

    img.setAttribute('width', settings.width);

    img.setAttribute('height', settings.height);

    img.setAttribute('src', images[0].href);

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
    img.setAttribute('src', image.href);
}

function prev() {
    let image = images--;
    img.setAttribute('src', image.href);
}

function fadeIn() {
    console.log('Calling fadeIn');
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
    console.log('Calling timer');
    console.log('Images length ...', images.length);
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
    console.log('Arrows is true');
    next_prev();
} else {
    timer();
}
