var preferences;

var bracket, coloring, safemode, darktheme, valtime, stepLimit;
function applyPrefs() {
    preferences = getCookie('preferences')

    if (preferences) {
        safemode = preferences.includes('s');
        coloring = preferences.includes('c');
        bracket = preferences.includes('b');
        darktheme = preferences.includes('d');
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
        darktheme = true;
    }
    valtime = getCookie('valtime')
    stepLimit = getCookie('steplimit')
    if (!valtime)
        valtime = 20;
    if (!stepLimit)
        stepLimit = 10000;

    document.getElementById("timesl").value = valtime;
    document.getElementById('timechoice').innerHTML = valtime + "ms";

    document.getElementById("safemaxsteps").value = stepLimit;
}
applyPrefs()

function saveprefs() {
    let pref = ""
    if (safemode) pref += "s"
    if (coloring) pref += "c"
    if (bracket) pref += "b"
    if (darktheme) pref += "d"
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
    console.log(proglisttxt);
    if (proglisttxt) {
        proglist = proglisttxt.split("|")
        for (const prgname of proglist) {
            list += `<div class="prglstElement"><div class="centeringelementlist" id="loadprg${prgname}"><span></span><span id="ltxtprg${prgname}">${prgname}</span><img class="navimg deleteprog" src="images/bin.jpg" onclick="deleteProg('${prgname}')"></div></div>`
        }
    }
    document.getElementById('foundfiles').innerHTML = list
}

function loadprog(progname) {
    console.log("Loading " + progname)
    newprog = getCookie('code' + progname)
    // console.log(newprog)
    document.getElementById("codeinput").value = deconvertfromcookie(newprog);
    updatingText()
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
                setCookie('proglist', proglisttxt, neverdelete);
            }
            else eraseCookie('proglist');
        }

    }
    load()
}

function resetCookies() {
    if (confirm(`All your settings and programs are about to be deleted forever. Do you really want to reset everything ?`))
        eraseAllCookies()
    settings();
    applyPrefs()
    updatingTheme()
    updatingText()
}


window.ontouchstart = function (event) {
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

function settings() {
    document.getElementById('settingspanel').style.display = 'flex'
    document.getElementById("themebtn").src = (darktheme) ? "images/sun.jpg" : "images/moon.jpg"
    document.getElementById('actualcookies').innerHTML = document.cookie;
}

function copyCookiesClipBoard() {
    navigator.clipboard
        .writeText(document.cookie)
        .then(() => alert("Copied to clipboard"))
        .catch((e) => alert(e.message));
}

function changeTheme() {
    darktheme = !darktheme
    saveprefs()
    settings()
    updatingTheme();
}

function updatingTheme() {
    if (darktheme) {
        document.documentElement.style.setProperty('--blackest', '#07020D');
        document.documentElement.style.setProperty('--black', '#1B161D');
        document.documentElement.style.setProperty('--black-hover', '#221D24');
        document.documentElement.style.setProperty('--dark-gray', '#2E292D');
        document.documentElement.style.setProperty('--dark-desat-gray', '#342F33');
        document.documentElement.style.setProperty('--gray', '#554F4C');
        document.documentElement.style.setProperty('--not-so-light-gray', '#7C756C');
        document.documentElement.style.setProperty('--light-gray', '#A39B8B');
        document.documentElement.style.setProperty('--white', '#F1E9DB');
        document.documentElement.style.setProperty('--dark-blue', '#325D76');
        document.documentElement.style.setProperty('--blue', '#5DB7DE');
        document.documentElement.style.setProperty('--light-blue', '#A7D0DD');
        document.documentElement.style.setProperty('--dark-red', '#80382E');
        document.documentElement.style.setProperty('--red', '#D1462F');
        document.documentElement.style.setProperty('--dark-green', '#515C41');
        document.documentElement.style.setProperty('--green', '#748E54');
        document.documentElement.style.setProperty('--dark-yellorange', '#905C17');
        document.documentElement.style.setProperty('--yellorange', '#F18F01');
        document.documentElement.style.setProperty('--dark-pink', '#7C3396');
        document.documentElement.style.setProperty('--pink', '#CA3CFF');

        document.documentElement.style.setProperty('--codecrease', '#D5FF57');
        document.documentElement.style.setProperty('--codemove', '#FF8566');
        document.documentElement.style.setProperty('--codeloop', '#F3BA71');
        document.documentElement.style.setProperty('--codeio', '#EA80FF');
    }
    else {
        //document.documentElement.style.setProperty('--white', '#07020D'); //--blackest
        document.documentElement.style.setProperty('--white', '#1B161D');//--black
        document.documentElement.style.setProperty('--light-gray', '#221D24');//--black-hover
        document.documentElement.style.setProperty('--not-so-light-gray', '#A39B8B');//--dark-gray
        document.documentElement.style.setProperty('--gray', '#CAC2B3');//--dark-desat-gray
        document.documentElement.style.setProperty('--dark-desat-gray', '#DED6C7');//--gray
        document.documentElement.style.setProperty('--dark-gray', '#DED6C7');//--not-so-light-gray
        document.documentElement.style.setProperty('--black-hover', '#A39B8B');//--light-gray
        document.documentElement.style.setProperty('--black', '#F1E9DB');//--white
        document.documentElement.style.setProperty('--blackest', '#FFFFFF');//--whitest


        document.documentElement.style.setProperty('--light-blue', '#325D76');
        document.documentElement.style.setProperty('--blue', '#5DB7DE');
        document.documentElement.style.setProperty('--dark-blue', '#A7D0DD');
        document.documentElement.style.setProperty('--red', '#80382E');
        document.documentElement.style.setProperty('--dark-red', '#D1462F');
        document.documentElement.style.setProperty('--green', '#515C41');
        document.documentElement.style.setProperty('--dark-green', '#748E54');
        document.documentElement.style.setProperty('--yellorange', '#905C17');
        document.documentElement.style.setProperty('--dark-yellorange', '#F18F01');
        document.documentElement.style.setProperty('--pink', '#7C3396');
        document.documentElement.style.setProperty('--dark-pink', '#CA3CFF');

        document.documentElement.style.setProperty('--codecrease', '#5C7800');
        document.documentElement.style.setProperty('--codemove', '#7C1900');
        document.documentElement.style.setProperty('--codeloop', '#7C4600');
        document.documentElement.style.setProperty('--codeio', '#6B0081');
    }
}

function importAll() {
    copyALlcookies(document.getElementById('yourcookies').value);

    applyPrefs()

    current = getCookie('current')
    if (current)
        textArea.value = deconvertfromcookie(current)
    updatingTheme()
    settings()
    updatingText()
}

window.onclick = function (event) {
    if (event.target.id.startsWith("loadingfile")) {
        document.getElementById('loadingfile').style.display = 'none'
    }
    if (event.target.id.startsWith("settingspanel")) {
        document.getElementById('settingspanel').style.display = 'none'
    }
    if (event.target.id.startsWith("loadprg")) {
        loadprog(event.target.id.slice(7))
    }
    if (event.target.id.startsWith("ltxtprg")) {
        loadprog(event.target.id.slice(7))
    }
}

updatingTheme()