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
    }
    else {
        coloring = true;
        document.getElementById("colors").classList.remove('navimgdisabled')
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