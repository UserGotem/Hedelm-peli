const imagesPath = 'images/';
const images = [
    '7.png',
    'diamond.png',
    'clover.png',
    'lemon.png',
    'bar.png',
    'horsehoe.png',
];

var kuva1 = document.querySelectorAll('.ruutu img')[0];
var kuva2 = document.querySelectorAll('.ruutu img')[1];
var kuva3 = document.querySelectorAll('.ruutu img')[2];
var kuva4 = document.querySelectorAll('.ruutu img')[3];
const taulukko1Panos = [
    '10',
    '6',
    '5'
];
const taulukko2Panos = [
    '5',
    '3',
    '5'
];

const voittolinjat = new Map([
    ["0,0,0,0", 10],
    ["1,1,1,1", 6],
    ["2,2,2,2", 5],
    ["3,3,3,3", 3],
    ["4,4,4,4", 5],
]);

let slots = [0, 0, 0, 0];
const locks = [0, 0, 0, 0];
let saaLukita = true;
var raha = 0;
var panosNyt = 1;

document.getElementById("raha").innerHTML = raha;
document.getElementById("panos").innerHTML = panosNyt;

vaihdaKuva();

function arvonta(indevoittoteksti) {
    let num = Math.floor(Math.random() * 6);
    let image = imagesPath + images[num];
    slots[indevoittoteksti] = num;
    return image;
}

function pelaa() {
        if (saaLukita) {
            rahaa();
        }
        vaihdaKuva();
        lukituksenTarkistus();
        voitto();
    }

function rahaa() {
    if (locks.some(lock => lock === 1)) {
        document.getElementById("raha").innerHTML = raha;
    }
}

function vaihdaKuva() {
    if (locks[0] == 0) { kuva1.src = arvonta(0); }
    if (locks[1] == 0) { kuva2.src = arvonta(1); }
    if (locks[2] == 0) { kuva3.src = arvonta(2); }
    if (locks[3] == 0) { kuva4.src = arvonta(3); }
}
function voitto() {
    let line = slots.join(',');

    if (voittolinjat.has(line)) {
        let tulo = voittolinjat.get(line) * panosNyt;
        raha += tulo;
        voittotekstiNäkyy(tulo);
        document.getElementById("raha").innerHTML = raha;
    } else if (
        (kuva1.src.includes("horsehoe") && kuva2.src.includes("horsehoe") && kuva3.src.includes("horsehoe")) ||
        (kuva2.src.includes("horsehoe") && kuva3.src.includes("horsehoe") && kuva4.src.includes("horsehoe")) ||
        (kuva1.src.includes("horsehoe") && kuva3.src.includes("horsehoe") && kuva4.src.includes("horsehoe")) ||
        (kuva1.src.includes("horsehoe") && kuva2.src.includes("horsehoe") && kuva4.src.includes("horsehoe"))
    ) {
        let tulo = taulukko2Panos[2] * panosNyt;
        raha += tulo;
        console.log(tulo);
        voittotekstiNäkyy(tulo);
        document.getElementById("raha").innerHTML = parseFloat(raha).toString();
    }
}
function lukituksenTarkistus() {
    if (locks[0] + locks[1] + locks[2] + locks[3] > 0) {
        for (let i = 0; i < locks.length; i++) {
            if (locks[i] == 1) {
                lukitse(i)
            }
        }
        saaLukita = false
    } else {
        saaLukita = true
    }
}

function lukitse(indevoittoteksti) {
    if (!saaLukita) {
        return
    }

    const lockButtons = document.querySelectorAll('.lukitse');

    if (locks[indevoittoteksti] == 0) {
        locks[indevoittoteksti] = 1
        lockButtons[indevoittoteksti].style.color = "white";
        lockButtons[indevoittoteksti].innerHTML = "LUKITTU";
    } else {
        locks[indevoittoteksti] = 0
        lockButtons[indevoittoteksti].style.color = "black";
        lockButtons[indevoittoteksti].innerHTML = "LUKITSE";
    }
}

function panos() {
    if (panosNyt >= 10) {
        panosNyt = 0;
    }
    panosNyt += 1;
    document.getElementById("panos").innerHTML = panosNyt;
    taulukonKerroin(panosNyt);
}

function taulukonKerroin(panosNyt) {
    for (let i = 0; i < 3; i++) {
        var tauluPanos1 = taulukko1Panos[i];
        tauluPanos1 *= panosNyt;
        document.getElementById("voittotaulu1").rows[i].cells.item(1).innerHTML = tauluPanos1;

        var tauluPanos2 = taulukko2Panos[i];
        tauluPanos2 *= panosNyt;
        document.getElementById("voittotaulu2").rows[i].cells.item(1).innerHTML = tauluPanos2;
    }
}

function voittotekstiNäkyy(raha) {
    let voittoteksti = document.getElementById("voittoteksti");
    if (voittoteksti.style.visibility = "hidden") {
        voittoteksti.innerHTML = "VOITIT " + raha;
        voittoteksti.style.visibility = "visible"
        setTimeout(() => {
            voittoteksti.style.visibility = "hidden";
        }, 2000);
    }
}