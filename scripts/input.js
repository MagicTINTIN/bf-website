// Initialization.

const colorMap = {
    "[": "codeloop",
    "]": "codeloop",
    "+": "codecrease",
    "-": "codecrease",
    "<": "codemove",
    ">": "codemove",
    ".": "codeio",
    ",": "codeio"
};
let textArea = document.getElementById("codeinput");
let customArea = document.querySelector(".custom-area");
let backdrop = document.querySelector(".backdrop");

// Event listeners.

textArea.addEventListener("input", function () {
    customArea.innerHTML = applyColors(textArea.value).split("<!").join("&#60;!");
});

textArea.addEventListener("scroll", function () {
    backdrop.scrollTop = textArea.scrollTop;
});

function applyColors(text) {
    // let re = new RegExp(Object.keys(colorMap).join("|"), "gi");
    if (coloring) {
        return text.split("<span class='codepos'>").join("{span class='codepos'}").split("</span>").join("{/span}").replace(/\+|\-|\[|\]|\<|\>|\,|\./gi, function (m) {
            let c = colorMap[m.toLowerCase()];
            return `<span class="${c}">${m}</span>`;
        }).split("{span class='codepos'}").join("<span class='codepos'>").split("{/span}").join("</span>");
    }
    else {
        return text;
    }
}