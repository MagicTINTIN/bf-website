/**
 * Brainfuck executor
 */
function executer() {
    if (!(res.posProg >= 0 && res.posProg < code.length && res.step < stepLimit)) {

        clearInterval(interval);
        res.mem = cleanMem(res.mem);

        if (res.step >= stepLimit) {
            res.success = false;
            res.str += "\n**ERROR :** Too many steps";
        }
        document.getElementById("playpause").innerHTML = "▶️";

        started = false;
        pause = false;
        resetInput();
        console.log(res);
        return res;
    }


    if (!pause) {

        while (!codeCharsList.includes(code[res.posProg])) {
            res.posProg++;
        }

        const cmd = code[res.posProg];
        res.step++;
        let tmpcode = code.replaceAt([res.posProg], `<span style='font-weight: bold; background:cyan; '>${code[res.posProg]}</span>`)

        //console.log(tmpcode);
        document.getElementById('codeinput').innerHTML = tmpcode.split("\n").join("<br>").split("<!").join("&#60;!")
        if (cmd == "[") {
            if (debugbf) console.log("[ pointing", res.posMem, res.mem[res.posMem]);
            if (res.mem[res.posMem] == 0) {
                let loopnb = 1;
                while (loopnb > 0) {
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
            document.getElementById("playpause").innerHTML = "▶️";
        }
        else if (cmd == "]") {
            if (debugbf) console.log("] pointing", res.posMem, res.mem[res.posMem]);
            if (res.mem[res.posMem] != 0) {
                let loopnb = 1;
                while (loopnb > 0) {
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
        }
        else if (cmd == ",") {
            let inputvalue = prompt("Please enter a character");
            res.mem[res.posMem] = inputvalue.charCodeAt(0);

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
                document.getElementById("playpause").innerHTML = "▶️";
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
            affmem[res.posMem] = `<span style="font-weight: bold;">${affmem[res.posMem]}</span>`;
        document.getElementById("memory").innerHTML = "[ " + affmem.join(" | ") + " ]<br>Memory frame n°" + res.posMem
        document.getElementById("output").innerText = res.str;

    }
}

/**
 * Brainfuck executor
 */
function quickexecuter() {
    while (res.posProg >= 0 && res.posProg < code.length && res.step < stepLimit) {
        if (!pause) {

            while (!codeCharsList.includes(code[res.posProg])) {
                res.posProg++;
            }

            const cmd = code[res.posProg];
            res.step++;
            let tmpcode = code.replaceAt([res.posProg], `<span style='font-weight: bold; background:cyan; '>${code[res.posProg]}</span>`)

            //console.log(tmpcode);
            document.getElementById('codeinput').innerHTML = tmpcode.split("\n").join("<br>").split("<!").join("&#60;!");
            if (cmd == "[") {
                if (debugbf) console.log("[ pointing", res.posMem, res.mem[res.posMem]);
                if (res.mem[res.posMem] == 0) {
                    let loopnb = 1;
                    while (loopnb > 0) {
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
                res.posProg++;
                //console.log(tmpcode);
                return document.getElementById("playpause").innerHTML = "▶️";
            }
            else if (cmd == "]") {
                if (debugbf) console.log("] pointing", res.posMem, res.mem[res.posMem]);
                if (res.mem[res.posMem] != 0) {
                    let loopnb = 1;
                    while (loopnb > 0) {
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
            }
            else if (cmd == ",") {
                let inputvalue = prompt("Please enter a character");
                res.mem[res.posMem] = inputvalue.charCodeAt(0);

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
                    document.getElementById("playpause").innerHTML = "▶️";
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
                affmem[res.posMem] = `<span style="font-weight: bold;">${affmem[res.posMem]}</span>`;
            document.getElementById("memory").innerHTML = "[ " + affmem.join(" | ") + " ]<br>Memory frame n°" + res.posMem
            document.getElementById("output").innerText = res.str;

        }
    }

    res.mem = cleanMem(res.mem);

    if (res.step >= stepLimit) {
        res.success = false;
        res.str += "\n**ERROR :** Too many steps";
    }
    document.getElementById("playpause").innerHTML = "▶️";

    started = false;
    pause = false;
    resetInput();
    console.log(res);
    return res;
}