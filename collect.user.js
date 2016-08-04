// ==UserScript==
// @name        Agar Collect
// @version     0.1
// @namespace   http://gnomesley.com
// @updateURL   https://github.com/gnomesley/agar-collect/raw/master/collect.user.js
// @include     http://agar.io/*
// @run-at      document-idle
// @grant       none
// ==/UserScript==


var step = 0;
var name = ".agario-profile-name";
var facebookButton = document.getElementsByClassName("btn-fb")[0];
var googleButton = document.getElementsByClassName("btn-gplus")[0];
var coinsButton = document.getElementById("freeCoins");
var canvas = document.getElementById("openfl-content").childNodes[0];
const tenMinutes = 600000;

function tick() {
    if (step >= 0 && $(name).text() === "Guest" ) step = -20;
    switch (step) {
        case -20:
            loginUser();
            break;
        case 0:
            triggerMouseEvent("click", coinsButton, 0, 0);
            break;
        case 3:
            triggerMouseEvent("mousedown", canvas, window.innerWidth / 2 - 150, window.innerHeight / 2 + 30);
            triggerMouseEvent("mouseup", canvas, window.innerWidth / 2 - 150, window.innerHeight / 2 + 30);
            break;
        case 4:
        case 5:
            triggerKeyboardEvent("keydown", canvas, 27);
            break;
        case tenMinutes:
            step = -1;
            break;
        default:
    }
    step = step + 1;
    if (window.storageInfo.context) window.localStorage.collectContext = window.storageInfo.context;
}

function triggerMouseEvent(type, elem, x, y) {
    var e = new Event(type, {bubbles: true, cancelable: true});
    e.clientX = x;
    e.clientY = y;
    elem.dispatchEvent(e);
}

function triggerKeyboardEvent(type, elem, keyCode) {
    var e = new Event(type, {bubbles: true, cancelable: true});
    e.keyCode = keyCode;
    e.which = keyCode;
    elem.dispatchEvent(e);
}

function loginUser() {
    $('.btn-login-play')[0].click();
    setTimeout(function () {
        if (window.localStorage.collectContext === "facebook") $("#socialLoginContainer .btn-fb")[0].click();
        if (window.localStorage.collectContext === "google") $("#socialLoginContainer .btn-gplus")[0].click();
    }, 1000);
}

setInterval(tick, 1000);
