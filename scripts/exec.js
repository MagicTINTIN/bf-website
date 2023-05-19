function actuaff() {
    res.step++;
    let tmpcode = code.replaceAt([res.posProg], `<span id='codepos' class='codepos'>${code[res.posProg]}</span>`)

    //console.log(tmpcode);
    document.getElementById('customarea').innerHTML = applyColors(tmpcode).split("\n").join("<br>").split("<!").join("&#60;!");
    var codeposobject = document.getElementById('codepos');
    var bdi = document.getElementById('backdropinput');
    var icdiv = document.getElementById('codeinputdiv');
    if (codeposobject)
        bdi.scrollTop = codeposobject.offsetTop - Math.max(icdiv.scrollHeight, icdiv.clientHeight) / 2;
}

/**
 * Brainfuck executor
 */
function executer() {
    if (!(res.posProg >= 0 && res.posProg < code.length)) {

        clearInterval(interval);
        res.mem = cleanMem(res.mem);

        document.getElementById("playpause").src = "images/play.jpg";

        started = false;
        pause = false;
        resetInput();

        console.log(res);
        return res;
    }

    if (safemode && res.step > stepLimit) {
        res.success = false;
        clearInterval(interval)
        pause = false;
        started = false;
        res.mem = cleanMem(res.mem);
        res.str += "\n**SAFEMODE :** The program has reached the maximum of step defined";
        resetInput();
        document.getElementById("output").innerHTML = res.str;
        alert("SAFEMODE : The program has reached the maximum of step defined");
        document.getElementById("playpause").src = "images/play.jpg";
        return res;
    }

    if (!pause) {

        while (!codeCharsList.includes(code[res.posProg])) {
            res.posProg++;
        }

        const cmd = code[res.posProg];

        actuaff();

        if (cmd == "[") {
            if (debugbf) console.log("[ pointing", res.posMem, res.mem[res.posMem]);
            if (res.mem[res.posMem] == 0) {
                let loopnb = 1;
                while (loopnb > 0 && res.posProg < code.length) {
                    res.posProg++;
                    if (code[res.posProg] == "[") {
                        loopnb++;
                    } else if (code[res.posProg] == "]") {
                        loopnb--;
                    }
                }
            }
        }
        else if (cmd == "!") {
            pause = true;
            document.getElementById("playpause").src = "images/play.jpg";
        }
        else if (cmd == "]") {
            if (debugbf) console.log("] pointing", res.posMem, res.mem[res.posMem]);
            if (res.mem[res.posMem] != 0) {
                let loopnb = 1;
                while (loopnb > 0 && res.posProg >= 0) {
                    res.posProg--;
                    if (code[res.posProg] == "[") {
                        loopnb--;
                    } else if (code[res.posProg] == "]") {
                        loopnb++;
                    }
                }
            }
        }
        else if (cmd == "." && (res.mem[res.posMem] >= 32 || true)) {
            if (debugbf) console.log(res.mem[res.posMem], String.fromCharCode(res.mem[res.posMem]))
            res.str += String.fromCharCode(res.mem[res.posMem]);

            var div = document.getElementById("output");
            var scrollHeight = Math.max(div.scrollHeight, div.clientHeight);
            div.scrollTop = scrollHeight - div.clientHeight;
        }
        else if (cmd == ",") {
            let inputvalue = prompt("Please enter a character");
            if (inputvalue) {
                res.mem[res.posMem] = inputvalue.charCodeAt(0);
            }
        }
        else if (cmd == ">") {
            res.posMem++;
            if (!res.mem[res.posMem])
                res.mem[res.posMem] = 0;
            if (debugbf) console.log("pointing", res.posMem, res.mem[res.posMem]);
        }
        else if (cmd == "<") {
            if (res.posMem > 0)
                res.posMem--;
            else {
                res.success = false;
                clearInterval(interval)
                pause = false;
                started = false;
                res.mem = cleanMem(res.mem);
                res.str += "\n**ERROR :** Cursor tried to go before first memory frame";
                resetInput();
                document.getElementById("output").innerHTML = res.str;
                alert("ERROR : Cursor tried to go before first memory frame");
                document.getElementById("playpause").src = "images/play.jpg";
                return res;
            }
        }
        else if (cmd == "+") {
            if (debugbf) console.log("adb", res.posMem, res.mem[res.posMem]);
            if (res.mem[res.posMem] >= 255)
                res.mem[res.posMem] = 0;
            else
                res.mem[res.posMem]++;
            if (debugbf) console.log("ada", res.posMem, res.mem[res.posMem]);
        }
        else if (cmd == "-") {
            if (debugbf) console.log("rmb", res.posMem, res.mem[res.posMem]);
            if (res.mem[res.posMem] <= 0)
                res.mem[res.posMem] = 255;
            else
                res.mem[res.posMem]--;
            if (debugbf) console.log("rma", res.posMem, res.mem[res.posMem]);
        }
        res.posProg++;
        // actualising
        let affmem = res.mem.slice();
        if (res.posMem < res.mem.length)
            affmem[res.posMem] = `<span class='mempos'>${affmem[res.posMem]}</span>`;
        document.getElementById("memory").innerHTML = "[ " + affmem.join(" | ") + " ]<br>Memory frame n°" + (res.posMem + 1)
        document.getElementById("output").innerText = res.str;

    }
}

/**
 * Brainfuck executor
 */
function quickexecuter() {
    while (res.posProg >= 0 && res.posProg < code.length) {
        if (safemode && res.step > stepLimit) {
            res.success = false;
            clearInterval(interval)
            pause = false;
            started = false;
            res.mem = cleanMem(res.mem);
            res.str += "\n**SAFEMODE :** The program has reached the maximum of step defined";
            resetInput();
            document.getElementById("output").innerHTML = res.str;
            alert("SAFEMODE : The program has reached the maximum of step defined");
            document.getElementById("playpause").src = "images/play.jpg";
            return res;
        }

        if (!pause) {

            while (!codeCharsList.includes(code[res.posProg])) {
                res.posProg++;
            }

            const cmd = code[res.posProg];


            if (cmd == "[") {
                if (debugbf) console.log("[ pointing", res.posMem, res.mem[res.posMem]);
                if (res.mem[res.posMem] == 0) {
                    let loopnb = 1;
                    while (loopnb > 0 && res.posProg < code.length) {
                        res.posProg++;
                        if (code[res.posProg] == "[") {
                            loopnb++;
                        } else if (code[res.posProg] == "]") {
                            loopnb--;
                        }
                    }
                }
            }
            else if (cmd == "!") {
                actuaff();
                pause = true;
                res.posProg++;
                //console.log(tmpcode);
                return document.getElementById("playpause").src = "images/play.jpg";
            }
            else if (cmd == "]") {
                if (debugbf) console.log("] pointing", res.posMem, res.mem[res.posMem]);
                if (res.mem[res.posMem] != 0) {
                    let loopnb = 1;
                    while (loopnb > 0 && res.posProg >= 0) {
                        res.posProg--;
                        if (code[res.posProg] == "[") {
                            loopnb--;
                        } else if (code[res.posProg] == "]") {
                            loopnb++;
                        }
                    }
                }
            }
            else if (cmd == "." && (res.mem[res.posMem] >= 32 || true)) {
                if (debugbf) console.log(res.mem[res.posMem], String.fromCharCode(res.mem[res.posMem]))
                res.str += String.fromCharCode(res.mem[res.posMem]);

                var div = document.getElementById("output");
                var scrollHeight = Math.max(div.scrollHeight, div.clientHeight);
                div.scrollTop = scrollHeight - div.clientHeight;
            }
            else if (cmd == ",") {
                let inputvalue = prompt("Please enter a character");
                if (inputvalue) {
                    res.mem[res.posMem] = inputvalue.charCodeAt(0);
                }
            }
            else if (cmd == ">") {
                res.posMem++;
                if (!res.mem[res.posMem])
                    res.mem[res.posMem] = 0;
                if (debugbf) console.log("pointing", res.posMem, res.mem[res.posMem]);
            }
            else if (cmd == "<") {
                if (res.posMem > 0)
                    res.posMem--;
                else {
                    res.success = false;
                    clearInterval(interval)
                    pause = false;
                    started = false;
                    res.mem = cleanMem(res.mem);
                    res.str += "\n**ERROR :** Cursor tried to go before first memory frame";
                    resetInput();
                    document.getElementById("output").innerHTML = res.str;
                    alert("ERROR : Cursor tried to go before first memory frame");
                    document.getElementById("playpause").src = "images/play.jpg";
                    return res;
                }
            }
            else if (cmd == "+") {
                if (debugbf) console.log("adb", res.posMem, res.mem[res.posMem]);
                if (res.mem[res.posMem] >= 255)
                    res.mem[res.posMem] = 0;
                else
                    res.mem[res.posMem]++;
                if (debugbf) console.log("ada", res.posMem, res.mem[res.posMem]);
            }
            else if (cmd == "-") {
                if (debugbf) console.log("rmb", res.posMem, res.mem[res.posMem]);
                if (res.mem[res.posMem] <= 0)
                    res.mem[res.posMem] = 255;
                else
                    res.mem[res.posMem]--;
                if (debugbf) console.log("rma", res.posMem, res.mem[res.posMem]);
            }
            res.posProg++;
            // actualising
            let affmem = res.mem.slice();
            if (res.posMem < res.mem.length)
                affmem[res.posMem] = `<span class='mempos'>${affmem[res.posMem]}</span>`;
            document.getElementById("memory").innerHTML = "[ " + affmem.join(" | ") + " ]<br>Memory frame n°" + (res.posMem + 1)
            document.getElementById("output").innerText = res.str;

        }
        else {
            actuaff();
            return;
        }
    }

    res.mem = cleanMem(res.mem);

    document.getElementById("playpause").src = "images/play.jpg";

    started = false;
    pause = false;
    resetInput();
    console.log(res);
    return res;
}