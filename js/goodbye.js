const music = document.getElementById("bgMusic");

if(sessionStorage.getItem("musicPlaying")==="true"){
    music.currentTime =
        parseFloat(sessionStorage.getItem("musicTime")) || 0;
    music.play();
}

setInterval(()=>{

    if(!music.paused){
        sessionStorage.setItem(
            "musicTime",
            music.currentTime
        );
    }
},1000);

// ======================================
// FADE IN
// ======================================

window.addEventListener("load", () => {

    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 1s ease";

    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);

});

// ======================================
// RESTART EXPERIENCE
// ======================================

const restartBtn = document.querySelector(".restart");

restartBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    sessionStorage.removeItem("musicTime");
    sessionStorage.removeItem("musicPlaying");

    document.body.style.opacity="0";

    setTimeout(()=>{

        window.location.href="index.html";

    },800);

});

// ======================================
// FLOATING TITLE EFFECT
// ======================================

const title = document.querySelector(".content h1");

let direction = 1;
let offset = 0;

function floatTitle() {

    offset += direction * 0.2;

    if (offset >= 8) direction = -1;
    if (offset <= -8) direction = 1;

    title.style.transform = `translateY(${offset}px)`;

    requestAnimationFrame(floatTitle);

}

floatTitle();