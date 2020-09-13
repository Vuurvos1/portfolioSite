const drainUpdateTime = 100; //ms
const vloeistofLevel = 300;
let drainSpeed = 7; //lager is sneller
const x = 0; //drain variabele voor bijhouden hoe lang voorbij is
let refillActive = true;

let touches = 0;
let clearTouchTrack = 0;

const newPosition = ["85px", "83px"]; //width, height

let potOpen = false;

const etenKleur = ["#585858", "#767676", "#101010", "#b7b7b7", "#dcdcdcx"];
const divEten = document.querySelectorAll(".eten");
let etenReset = 1;

//Animate pickle on click
function newPos() {
  newPosition[0] = Math.floor(Math.random() * 157) + "px";
  newPosition[1] = Math.floor(Math.random() * 101) + "px";
  return newPosition;
}

function pickleNew() {
  var prevNW = newPosition[0];
  var prevNH = newPosition[1];
  newPos();

  document.querySelector("img.pickle").animate(
    [
      //keyframes
      {
        top: prevNH,
        left: prevNW,
      },
      {
        top: newPosition[1],
        left: newPosition[0],
      },
    ],
    {
      //timing ms
      duration: 1000,
      easing: "ease-in-out",
    }
  );
  document.querySelector("img.pickle").style =
    "top:" + newPosition[1] + ";left:" + newPosition[0];
}

document.querySelector("img.pickle").addEventListener("click", pickleNew);

//vloeistof minder worden
function vloeistof() {
  x++;
  if (x >= drainSpeed) {
    x = 0;
    if (vloeistofLevel > 1) {
      vloeistofLevel--;
      document.querySelector("div.pickleSaus").style =
        "height: " + vloeistofLevel + "px";
    } else {
      document.querySelector("div.pickleSaus").style = "height: 0px";
      document.querySelector("img.pickle").src =
        "/img/partyPickle/pickleVies.png";
    }
  }
}

setInterval(vloeistof, drainUpdateTime);

//Water Refill mechanic
function waterTimout() {
  refillActive = true;
  console.log(refillActive);
}

function addWater() {
  if (refillActive == true) {
    //max vloeistof 300
    if (vloeistofLevel < 275) {
      vloeistofLevel += 25;
      refillActive = false;
      setTimeout(waterTimout, 1000);
    } else if (vloeistofLevel <= 300) {
      vloeistofLevel = 300;
      refillActive = false;
      setTimeout(waterTimout, 1000);
      console.log("vol");
    }
  }
}

document.querySelector("div#drink").addEventListener("click", addWater);

//Pot kapot maken
function clearTouches() {
  touches = 0;
  clearTouchTrack = 0;
}

function potKapot() {
  touches++;
  if (touches > 25) {
    console.log("kapot");
    document.querySelector("img.jar").src = "/img/partyPickle/jarKapot.png";
    drainSpeed = 1;
  }

  if (clearTouchTrack == 0) {
    setTimeout(clearTouches, 2000);
    clearTouchTrack = 1;
  }
}

function potRepareren() {
  document.querySelector("img.jar").src = "/img/partyPickle/jar.png";
  drainSpeed = 7;
}

document.querySelector("img.jar").addEventListener("mouseenter", potKapot);
document.querySelector("img.jar").addEventListener("mouseleave", potKapot);
document.querySelector("img.jar").addEventListener("dblclick", potRepareren);

//pot openen
function openPot() {
  if (potOpen == true) {
    document.querySelector("div.deksel").classList.add("dekselAnimateClose");
    document.querySelector("div.deksel").classList.remove("dekselAnimate");
    potOpen = false;
  } else {
    document.querySelector("div.deksel").classList.add("dekselAnimate");
    document.querySelector("div.deksel").classList.remove("dekselAnimateClose");
    potOpen = true;
  }
}

document.querySelector("div.deksel").addEventListener("click", openPot);

//eten geven
function removeEtenAni() {
  for (let i = 0; i < divEten.length; i++) {
    divEten[i].classList.remove("etenAnimate");
  }
  etenReset = 1;
}

document
  .querySelector("div.eten")
  .addEventListener("animationend", removeEtenAni);

function geefEten() {
  if (potOpen == true && etenReset == 1) {
    var eetNummer = Math.floor(Math.random() * 3) + 2;

    var positie;
    var grote;
    var offset;

    for (let i = 0; i < eetNummer; i++) {
      positie = Math.floor(Math.random() * 15) - 7.5 + 50;
      offset = Math.floor(Math.random() * 50) + 25 + "px";
      grote = Math.floor(Math.random() * 10) + 10 + "px";

      var kleur = Math.floor(Math.random() * etenKleur.length);
      divEten[i].style =
        `width:${grote};height:${grote};` +
        `left:${positie}%;top:-${offset}` +
        `;background-color: ${etenKleur[kleur]}`;
      divEten[i].classList.add("etenAnimate");
    }
    etenReset = 0;

    if (vloeistofLevel >= 275) {
      document.querySelector("img.pickle").src = "/img/partyPickle/pickle.png";
    }
  }
}

document.querySelector("div#eten").addEventListener("click", geefEten);

//animatie klass deksel openen we halen
function removeOpenPot() {
  document.querySelector("div.deksel").classList.add("dekselOpen");
  document.querySelector("div.deksel").classList.remove("dekselAnimate");
}

document
  .querySelector("div.deksel")
  .addEventListener("animationend", removeOpenPot);
