// Initialization.

const colorMap = {
    "[": "codeloop",
    "]": "codeloop",
    "+": "codecrease",
    "-": "codecrease",
    "<": "codemove",
    ">": "codemove",
    ".": "codeio",
    ",": "codeio",
    "!": "codestop"
};

let customArea = document.querySelector(".custom-area");
let backdrop = document.querySelector(".backdrop");

// Event listeners.

textArea.addEventListener("input", updatingText);
textArea.addEventListener("selectionchange", updatingText);
textArea.addEventListener('keypress', updatingText); // Every character written
textArea.addEventListener('keydown', updatingText); // Every character written
textArea.addEventListener('keyup', updatingText); // Every character written
textArea.addEventListener('mousedown', updatingText); // Click down
textArea.addEventListener('mouseup', updatingText); // Click down
textArea.addEventListener('touchstart', updatingText); // Mobile
textArea.addEventListener('input', updatingText); // Other input events
textArea.addEventListener('paste', updatingText); // Clipboard actions
textArea.addEventListener('cut', updatingText);
textArea.addEventListener('select', updatingText); // Some browsers support this event
textArea.addEventListener('selectstart', updatingText); // Some browsers support this event

function updatingText() {
    customArea.innerHTML = applyColors(textArea.value).split("<!").join("&#60;!");
}

textArea.addEventListener("scroll", function () {
    backdrop.scrollTop = textArea.scrollTop;
});

function replacetonext(txt, place) {
    let loopnb = 1;
    let endplace = place;
    while (loopnb > 0 && endplace < txt.length) {
        endplace++;
        if (txt[endplace] == "[") {
            loopnb++;
        } else if (txt[endplace] == "]") {
            loopnb--;
        }
    }
    if (loopnb == 0) {
        txt = txt.biReplaceAt(endplace, `{span class='linkedbracket'}${txt[endplace]}{/span}`, place, `{span class='linkedbracket'}${txt[place]}{/span}`)
    }
    return txt;
}

function replacetoprevious(txt, place) {
    let loopnb = 1;
    let startplace = place;
    while (loopnb > 0 && startplace >= 0) {
        startplace--;
        if (txt[startplace] == "[") {
            loopnb--;
        } else if (txt[startplace] == "]") {
            loopnb++;
        }
    }
    if (loopnb == 0) {
        txt = txt.biReplaceAt(startplace, `{span class='linkedbracket'}${txt[startplace]}{/span}`, place, `{span class='linkedbracket'}${txt[place]}{/span}`)
    }
    return txt;
}

const brkts = ['[', ']'];

function applyColors(text) {
    textcodepos = text.split("<span class='codepos'>").join("{span class='codepos'}").split("</span>").join("{/span}")
    // let re = new RegExp(Object.keys(colorMap).join("|"), "gi");
    var start = textArea.selectionStart;
    var end = textArea.selectionEnd;
    //console.log(start, end, textArea.value[start - 1], textArea.value[start]);
    if (!started && bracket && start != undefined && end != undefined && start == end) {
        // case beginning of text
        if (!textArea.value[start - 1] && textArea.value[start] && textArea.value[start] == "[") {
            textcodepos = replacetonext(textcodepos, start);
        }
        // end of text
        else if (!textArea.value[start] && textArea.value[start - 1] && textArea.value[start - 1] == "]") {
            textcodepos = replacetoprevious(textcodepos, start - 1);
        }
        // middle of text
        else if (textArea.value[start] && textArea.value[start - 1]) {
            // []|[]
            if (brkts.includes(textArea.value[start - 1]) && brkts.includes(textArea.value[start])) {
                if (textArea.value[start] == '[')
                    textcodepos = replacetonext(textcodepos, start);
                else
                    textcodepos = replacetoprevious(textcodepos, start);
            }
            else if (brkts.includes(textArea.value[start - 1])) {
                if (textArea.value[start - 1] == '[')
                    textcodepos = replacetonext(textcodepos, start - 1);
                else
                    textcodepos = replacetoprevious(textcodepos, start - 1);
            }
            else if (brkts.includes(textArea.value[start])) {
                if (textArea.value[start] == '[')
                    textcodepos = replacetonext(textcodepos, start);
                else
                    textcodepos = replacetoprevious(textcodepos, start);
            }
        }
    }
    if (coloring) {
        return textcodepos.replace(/\+|\-|\[|\]|\<|\>|\,|\.|\!/gi, function (m) {
            let c = colorMap[m.toLowerCase()];
            return `<span class="${c}">${m}</span>`;
        }).split("{span class='linkedbracket'}").join("<span class='linkedbracket'>").split("{span class='codepos'}").join("<span class='codepos'>").split("{/span}").join("</span>");
    }
    else {
        return textcodepos.split("{span class='linkedbracket'}").join("<span class='linkedbracket'>").split("{span class='codepos'}").join("<span class='codepos'>").split("{/span}").join("</span>");
    }
}

updatingText()