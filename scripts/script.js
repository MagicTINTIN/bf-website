document.getElementById("nojs").style.display = "none";

var valtime = 20;
var militimel, militimer;
var globaltimer;

var rmv = 0;
var lmv = 0;
var party;

var started = false;
var pause = false;
var side = "none";

var alldata = {
    ltimes: [],
    rtimes: [],
    times: []
}

function actucounter() {
    valtime = document.getElementById("timesl").value //gets the oninput value
    document.getElementById('timechoice').innerHTML = Math.floor(valtime / 2) + ":" + ((valtime % 2 == 1) ? "30" : "00"); //displays this value to the html page
    console.log("new time set : ", valtime);
}

function resetTime() {
    side = "none";
    militimel = valtime * 30000;
    militimer = valtime * 30000;
    rmv = 0;
    lmv = 0;
    alldata = {
        ltimes: [],
        rtimes: [],
        times: []
    }
    globaltimer = 0;
    started = false;
    pause = false;
    clearInterval(party);
    // document.getElementById("left").style.backgroundColor = "rgb(" + Math.floor(255 * ((valtime * 30000 - militimel) / (valtime * 30000))) + ",100,100)";
    // document.getElementById("right").style.backgroundColor = "rgb(" + Math.floor(255 * ((valtime * 30000 - militimer) / (valtime * 30000))) + ",100,100)";
    document.getElementById("left").style.backgroundColor = "#222";
    document.getElementById("right").style.backgroundColor = "#222";

    document.getElementById("lmv").innerHTML = lmv;
    document.getElementById("rmv").innerHTML = rmv;
    document.getElementById("ltime").innerHTML = militimel < 0 ? militimel / 1000 : (militimel < 10000) ?
        ("00:0" + (militimel / 1000))
        : (((Math.floor(militimel / 60000) < 10) ? "0" : "") + (Math.floor(militimel / 60000)) + ":" + ((Math.floor(militimel % 60000 / 1000) < 10) ? "0" : "") + (Math.floor(militimel % 60000 / 1000)));
    document.getElementById("rtime").innerHTML = militimer < 0 ? militimer / 1000 : (militimer < 10000) ?
        ("00:0" + (militimer / 1000))
        : (((Math.floor(militimer / 60000) < 10) ? "0" : "") + (Math.floor(militimer / 60000)) + ":" + ((Math.floor(militimer % 60000 / 1000) < 10) ? "0" : "") + (Math.floor(militimer % 60000 / 1000)));
}

function playpause() {
    if (!started) return;
    pause = !pause;
    document.getElementById("playpause").innerHTML = (pause) ? "⏸️" : "▶️";
}

function rightSide() {
    if (side == "left") return;
    addtograph();
    if (!started) start();
    document.getElementById("right").style.backgroundColor = "#222"
    //document.getElementById("left").style.backgroundColor = "rgb(" + Math.floor(255 - 255 * (valtime * 30000 - militimel)) + ",100,100)";
    side = "left";
    rmv++;
    document.getElementById("rmv").innerHTML = rmv;
}

function leftSide() {
    if (side == "right") return;
    addtograph();
    if (!started) start();
    //document.getElementById("right").style.backgroundColor = "rgb(" + Math.floor(255 - 255 * (valtime * 30000 - militimer)) + ",100,100)";
    document.getElementById("left").style.backgroundColor = "#222"
    side = "right";
    lmv++;
    document.getElementById("lmv").innerHTML = lmv;
}

function addtograph() {
    alldata.rtimes.push({ x: Math.round(globaltimer / 50) / 20, y: Math.round(militimer / 100) / 10 })
    alldata.ltimes.push({ x: Math.round(globaltimer / 50) / 20, y: Math.round(militimel / 100) / 10 })
    alldata.times.push(Math.round(globaltimer / 50) / 20);
}

const ctxtime = document.getElementById('timeStat');
mixedChart = new Chart(ctxtime, {
    data: {
        datasets: [{
            type: 'line',
            label: 'Temps Gauche',
            data: alldata.ltimes,
            borderColor: 'rgb(200, 50, 50)',
            tension: 0.1
        }, {
            type: 'line',
            label: 'Temps Droite',
            data: alldata.rtimes,
            borderColor: 'rgb(50, 100, 200)',
            tension: 0.1
        }],
        //labels: alldata.times
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            x: {
                min: 0,
                type: 'linear',
            }
        }
    }
});

function start() {
    started = true;
    party = setInterval(() => {

        /*mixedChart = new Chart(ctxtime, {
            data: {
                datasets: [{
                    type: 'line',
                    label: 'Temps Gauche',
                    data: alldata.ltimes,
                    borderColor: 'rgb(200, 50, 50)',
                    tension: 0.1
                }, {
                    type: 'line',
                    label: 'Temps Droite',
                    data: alldata.rtimes,
                    borderColor: 'rgb(50, 100, 200)',
                    tension: 0.1
                }],
                labels: alldata.times
            },
            options: {
                maintainAspectRatio: false,
            }
        });
        /* */
        mixedChart.data.datasets[0].data = alldata.ltimes;
        mixedChart.data.datasets[1].data = alldata.rtimes;
        mixedChart.data.labels = alldata.times;

        mixedChart.update();
        if (!pause && side == "right") {
            militimer -= 10;
            globaltimer += 10;
            document.getElementById("rtime").innerHTML = militimer < 0 ? militimer / 1000 : (militimer < 10000) ?
                ("00:0" + (militimer / 1000))
                : (((Math.floor(militimer / 60000) < 10) ? "0" : "") + (Math.floor(militimer / 60000)) + ":" + ((Math.floor(militimer % 60000 / 1000) < 10) ? "0" : "") + (Math.floor(militimer % 60000 / 1000)));
            document.getElementById("right").style.backgroundColor = "rgb(" + Math.floor(255 * ((valtime * 30000 - militimer) / (valtime * 30000))) + ",100,100)";
        } else if (!pause && side == "left") {
            militimel -= 10;
            globaltimer += 10;
            document.getElementById("ltime").innerHTML = militimel < 0 ? militimel / 1000 : (militimel < 10000) ?
                ("00:0" + (militimel / 1000))
                : (((Math.floor(militimel / 60000) < 10) ? "0" : "") + (Math.floor(militimel / 60000)) + ":" + ((Math.floor(militimel % 60000 / 1000) < 10) ? "0" : "") + (Math.floor(militimel % 60000 / 1000)));
            document.getElementById("left").style.backgroundColor = "rgb(" + Math.floor(255 * ((valtime * 30000 - militimel) / (valtime * 30000))) + ",100,100)";
        }
    }, 10);
}




resetTime();

