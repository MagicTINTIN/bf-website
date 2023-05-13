var safemode = false;
var coloring = true;
var bracket = true;

function safe() {
    if (safemode) {
        safemode = false;
        document.getElementById("safe").classList.add('navimgdisabled')
    }
    else {
        safemode = true;
        document.getElementById("safe").classList.remove('navimgdisabled')
    }
}

function colors() {
    if (coloring) {
        coloring = false;
        document.getElementById("colors").classList.add('navimgdisabled')
        document.getElementById("customarea").classList.remove('codetext')
        document.querySelector(".custom-area").innerHTML = applyColors(textArea.value);
    }
    else {
        coloring = true;
        document.getElementById("colors").classList.remove('navimgdisabled')
        document.getElementById("customarea").classList.add('codetext')
        document.querySelector(".custom-area").innerHTML = applyColors(textArea.value);
    }
}

function brackets() {
    if (bracket) {
        bracket = false;
        document.getElementById("brackets").classList.add('navimgdisabled')
    }
    else {
        bracket = true;
        document.getElementById("brackets").classList.remove('navimgdisabled')
    }
}