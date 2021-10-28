import settings from "./settings.js";
import images from "./images.js";

var img = document.getElementById("slider")
var opacity = 0
var intervalID = 0

function load_img(image)
{
    img.style.opacity = 0

    img.setAttribute("width", settings.width)

    img.setAttribute("height", settings.height)

    img.setAttribute("src", image)

    fadeIn()
}

function fadeIn ()
{
    setInterval(function(){
        opacity = Number(window.getComputedStyle(img).getPropertyValue("opacity"))
        if(opacity < 1)
        {
            opacity = opacity + 0.1
            img.style.opacity = opacity
        }
        else
        {
        clearInterval(intervalID)
        }
        } ,settings.fadespeed)
}

function timer ()
{
    for( let i = 0; i <= images.length; i++)
    {
        setTimeout(function(){
            load_img(images[i])
            if(i == (images.length))
            {
                timer()
            }
        }, settings.duration*i)
    }
}

timer()