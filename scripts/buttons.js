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
    }
    else {
        coloring = true;
        document.getElementById("colors").classList.remove('navimgdisabled')
        document.getElementById("customarea").classList.add('codetext')

    }
    if (started) {
        let tmpcode = code.replaceAt([res.posProg - 1], `<span class='codepos'>${code[res.posProg - 1]}</span>`);
        document.querySelector(".custom-area").innerHTML = applyColors(tmpcode).split("\n").join("<br>").split("<!").join("&#60;!")
    } else {
        document.querySelector(".custom-area").innerHTML = applyColors(textArea.value).split("<!").join("&#60;!");
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
    if (started) {
        let tmpcode = code.replaceAt([res.posProg - 1], `<span class='codepos'>${code[res.posProg - 1]}</span>`);
        document.querySelector(".custom-area").innerHTML = applyColors(tmpcode).split("\n").join("<br>").split("<!").join("&#60;!")
    } else {
        document.querySelector(".custom-area").innerHTML = applyColors(textArea.value).split("<!").join("&#60;!");
    }
}

function save() {
    alert("Saves througth cookies will be possible later")
}
function load() {
    alert("Saves througth cookies will be possible later")
}