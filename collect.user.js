// ==UserScript==
// @name        Agar Collect
// @version     0.1
// @namespace   http://gnomesley.com
// @updateURL   https://github.com/gnomesley/agar-collect/raw/master/collect.user.js
// @include     http://agar.io/*
// @run-at      document-idle
// @grant       none
// ==/UserScript==

setTimeout(function ()
{
    location.reload();
}, 600000);

setTimeout(function ()
{
    if (name.innerHTML === "Guest" && window.localStorage.collectContext === "facebook") triggerMouseEvent("click", facebookButton, 0, 0);
    if (name.innerHTML === "Guest" && window.localStorage.collectContext === "google") triggerMouseEvent("click", googleButton, 0, 0);
}, 3000);

setInterval(tick, 1000);

var step = 0;
var name = document.getElementsByClassName("agario-profile-name")[0];
var facebookButton = document.getElementsByClassName("btn-fb")[0];
var googleButton = document.getElementsByClassName("btn-gplus")[0];
var coinsButton = document.getElementById("freeCoins");
var canvas = document.getElementById("openfl-content").childNodes[0];

function tick()
{
    if (name.innerHTML === "Guest") return step = 0;
    if (step === 0) triggerMouseEvent("click", coinsButton, 0, 0);
    if (step === 3)
    {
        triggerMouseEvent("mousedown", canvas, window.innerWidth / 2 - 150, window.innerHeight / 2 + 30);
        triggerMouseEvent("mouseup", canvas, window.innerWidth / 2 - 150, window.innerHeight / 2 + 30);
    }
    if (step === 4 || step === 5) triggerKeyboardEvent("keydown", canvas, 27);
    step = (step + 1) % 6;
    if (window.storageInfo.context) window.localStorage.collectContext = window.storageInfo.context;
}

function triggerMouseEvent(type, elem, x, y)
{
    var e = new Event(type, {bubbles: true, cancelable: true});
    e.clientX = x;
    e.clientY = y;
    elem.dispatchEvent(e);
}

function triggerKeyboardEvent(type, elem, keyCode)
{
    var e = new Event(type, {bubbles: true, cancelable: true});
    e.keyCode = keyCode;
    e.which = keyCode;
    elem.dispatchEvent(e);
}
