// const images = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg'];
const images = [
    new URL('../images/1.jpg', import.meta.url),
    new URL('../images/2.jpg', import.meta.url),
    new URL('../images/3.jpg', import.meta.url),
    new URL('../images/4.jpg', import.meta.url)
];

export default images;
