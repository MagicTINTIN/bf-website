var preferences = getCookie('preferences')
var bracket, coloring, safemode
if (preferences) {
    safemode = preferences.includes('s');
    coloring = preferences.includes('c');
    bracket = preferences.includes('b');
    if (safemode)
        document.getElementById("safe").classList.remove('navimgdisabled')
    else
        document.getElementById("safe").classList.add('navimgdisabled')
    if (coloring)
        document.getElementById("colors").classList.remove('navimgdisabled')
    else
        document.getElementById("colors").classList.add('navimgdisabled')
    if (bracket)
        document.getElementById("brackets").classList.remove('navimgdisabled')
    else
        document.getElementById("brackets").classList.add('navimgdisabled')
} else {
    safemode = false;
    coloring = true;
    bracket = true;
}

function saveprefs() {
    let pref = ""
    if (safemode) pref += "s"
    if (coloring) pref += "c"
    if (bracket) pref += "b"
    setCookie('preferences', pref, neverdelete);
}


function safe() {
    if (safemode) {
        safemode = false;
        document.getElementById("safe").classList.add('navimgdisabled')
    }
    else {
        safemode = true;
        document.getElementById("safe").classList.remove('navimgdisabled')
    }
    saveprefs()
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
    saveprefs()
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
    saveprefs()
}

////////////// SAVES

document.getElementById("codeinput").addEventListener("input", updatecurrent);

var textArea = document.getElementById("codeinput");

function converttocookie(txt) {
    return txt.split('\n').join('\\').split(";").join("")
}

function deconvertfromcookie(txt) {
    return txt.split('\\').join('\n')
}

var current = getCookie('current')
if (current)
    textArea.value = deconvertfromcookie(current)

function updatecurrent() {
    setCookie('current', converttocookie(textArea.value), neverdelete)
}

function save() {
    var proglisttxt = getCookie('proglist')
    var proglist;
    if (proglisttxt)
        proglist = proglisttxt.split("|")


    let progname = prompt('Name of the program (no space just letters and numbuers)')

    if (proglisttxt && proglist.includes(progname)) {
        if (confirm(`${progname} already exist. Do you want to overwrite it ?`))
            saveprg(progname, false)
    }
    else
        saveprg(progname)
}

function saveprg(progname, newone = true) {
    console.log("Saving " + progname)
    var proglisttxt = getCookie('proglist')
    var proglist;
    if (proglisttxt) {
        proglist = proglisttxt.split("|")
        proglist.push(progname)
        proglisttxt = proglist.join("|")
    }
    else {
        proglisttxt = progname;
    }
    if (newone) setCookie('proglist', proglisttxt, neverdelete);
    setCookie('code' + progname, converttocookie(textArea.value), neverdelete);
}
function load() {
    document.getElementById('loadingfile').style.display = 'flex'
    var list = ""
    var proglisttxt = getCookie('proglist')
    var proglist;
    if (proglisttxt) {
        proglist = proglisttxt.split("|")
        for (const prgname of proglist) {
            list += `<div class="prglstElement"><div class="centeringelementlist" id="loadprg${prgname}"><span></span><span id="ltxtprg${prgname}">${prgname}</span><img class="navimg deleteprog" src="images/bin.jpg" onclick="deleteProg('${prgname}')"></div></div>`
        }
        document.getElementById('foundfiles').innerHTML = list
    }
}

function loadprog(progname) {
    console.log("Loading " + progname)
    newprog = getCookie('code' + progname)
    // console.log(newprog)
    document.getElementById("codeinput").value = deconvertfromcookie(newprog);
    updatingText()
}

window.onclick = function (event) {
    if (event.target.id.startsWith("loadingfile")) {
        document.getElementById('loadingfile').style.display = 'none'
    }
    if (event.target.id.startsWith("loadprg")) {
        loadprog(event.target.id.slice(7))
    }
    if (event.target.id.startsWith("ltxtprg")) {
        loadprog(event.target.id.slice(7))
    }
}

function deleteProg(progname) {
    console.log("Deleting " + progname)
    if (confirm(`${progname} is about to be deleted forever. Do you want to delete it ?`)) {
        eraseCookie('code' + progname);
        var proglisttxt = getCookie('proglist')
        var proglist;
        if (proglisttxt) {
            proglist = proglisttxt.split("|")
            if (proglist.length > 1) {
                proglist = proglist.filter(item => item !== progname)
                proglisttxt = proglist.join("|")
            }
            else proglisttxt = ""
            console.log(proglisttxt);
        }
        setCookie('proglist', proglisttxt, neverdelete);
    }
    load()
}