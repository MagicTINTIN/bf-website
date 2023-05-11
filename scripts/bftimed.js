document.getElementById("nojs").style.display = "none";

const codeCharsList = [",", ".", "+", "-", "[", "]", "<", ">", "!"]

const stepLimit = 100000000;
const debugbf = false;
/**
 * @typedef {Object} bfreturn
 * @property {string} code cleaned code
 * @property {int} step step number
 * @property {string} str string output
 * @property {int[]} mem memory
 * @property {boolean} success if no error has occurred
 * @property {int} posProg program position
 * @property {int} posMem memory frame
 */

String.prototype.cleantobf = function () {
    return this.replace(/[^\+\-\[\]\<\>\,\.]+/g, "");
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index, this.length).substring(1); //replacement.length
}

var started = false;
var pause = true;
var valtime = 20;
var interval;
var savedcode = "";
var quickstarted = false;

var code, res;




// Panel exec Commands
function actucounter() {
    valtime = document.getElementById("timesl").value //gets the oninput value
    document.getElementById('timechoice').innerHTML = valtime + "ms"; //displays this value to the html page
    console.log("new time set : ", valtime);
    if (started) {
        clearInterval(interval);
        interval = setInterval(() => {
            executer();
        }, valtime);
    }
}

function cleanMem(mem) {
    while (mem.length > 1 && mem[mem.length - 1] == 0) {
        mem.pop();
    }
    return mem;
}

function resetTime() {
    document.getElementById('output').innerHTML = "";
    document.getElementById('memory').innerHTML = "[ <span style='font-weight: bold; '>0</span> ]";
    started = false;
    pause = false;
    document.getElementById("playpause").innerHTML = "▶️";
    clearInterval(interval)
    resetInput();
}


function playpause() {
    if (!started) {
        quickstarted = false;
        pause = false;
        started = true;
        document.getElementById("playpause").innerHTML = (pause) ? "▶️" : "⏸️";
        start();
    }
    else {
        pause = !pause;
        quickstarted = false;
        document.getElementById("playpause").innerHTML = (pause) ? "▶️" : "⏸️";
        clearInterval(interval);
        interval = setInterval(() => {
            executer();
        }, valtime);
    }
}

/**
        * Returns what have been imported
        *
        * @param {string} rawcode to be executed
        * @return {bfreturn} brainfuck execution
        */
function exe(rawcode) {


    // starting exe

    code = rawcode//.cleantobf();
    res = {
        code: code,
        step: 0,
        str: "",
        mem: [0],
        success: true,
        posProg: 0,
        posMem: 0,
    }
    interval = setInterval(() => {
        executer();
    }, valtime);

}

/**
        * Returns what have been imported
        *
        * @param {string} rawcode to be executed
        * @return {bfreturn} brainfuck execution
        */
function quickexe(rawcode) {


    // starting exe

    code = rawcode//.cleantobf();
    res = {
        code: code,
        step: 0,
        str: "",
        mem: [0],
        success: true,
        posProg: 0,
        posMem: 0,
    }

    quickexecuter();


}

function resetInput() {
    document.getElementById('codeinput').outerHTML = `<textarea id="codeinput" name="codeinput"></textarea>`
    document.getElementById('codeinput').value = savedcode;
}

function start() {
    started = true;
    pause = false;
    savedcode = document.getElementById('codeinput').value
    document.getElementById('codeinput').outerHTML = "<p id='codeinput'>"
        + "</p>";
    document.getElementById('codeinput').innerText = savedcode
    document.getElementById("playpause").innerHTML = "⏸️";
    exe(savedcode);
}

function quickend() {
    if (!started) {
        started = true;
        quickstarted = true;
        pause = false;
        savedcode = document.getElementById('codeinput').value
        document.getElementById('codeinput').outerHTML = "<p id='codeinput'>"
            + "</p>";
        document.getElementById('codeinput').innerText = savedcode
        document.getElementById("playpause").innerHTML = "⏸️";
        quickexe(savedcode);
    }
    else {
        quickstarted = true;
        pause = false;
        document.getElementById("playpause").innerHTML = "⏸️";
        quickexecuter();
    }
}