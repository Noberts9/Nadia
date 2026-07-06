// ======================================
// IMAGE REVEAL EFFECT
// ======================================

const canvas = document.getElementById("revealCanvas");
const ctx = canvas.getContext("2d");
const box = document.querySelector(".image-box");
const img1 = new Image();
const img2 = new Image();

// Change these if your filenames are different
img1.src = "assets/img/nadia1.jpeg";
img2.src = "assets/img/nadia 2.jpeg";

const mouse = {
    x: -9999,
    y: -9999
};

const smooth = {
    x: -9999,
    y: -9999
};

const trail = [];
const TRAIL_LENGTH = 60;
const HEAD_RADIUS = 180;

// ----------------------------
// Resize Canvas
// ----------------------------

function resizeCanvas() {

    canvas.width = box.clientWidth;
    canvas.height = box.clientHeight;

}

window.addEventListener("resize", resizeCanvas);

// ----------------------------
// Draw Image (Object Fit Cover)
// ----------------------------

function drawCoverImage(context, image) {

    const cw = canvas.width;
    const ch = canvas.height;

    const iw = image.width;
    const ih = image.height;

    const scale = Math.min(
    cw / iw,
    ch / ih
    );

    const w = iw * scale;
    const h = ih * scale;

    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    context.drawImage(image, x, y, w, h);

}

// ----------------------------
// Mouse
// ----------------------------

box.addEventListener("mousemove", (e)=>{

    const rect = box.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

});

box.addEventListener("mouseleave", ()=>{
    mouse.x = -9999;
    mouse.y = -9999;
});

// ----------------------------
// Main Animation
// ----------------------------

function animate(){
    requestAnimationFrame(animate);
    smooth.x += (mouse.x - smooth.x) * 0.13;
    smooth.y += (mouse.y - smooth.y) * 0.13;
    trail.unshift({
        x:smooth.x,
        y:smooth.y
    });

    if(trail.length > TRAIL_LENGTH){
        trail.length = TRAIL_LENGTH;

    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawCoverImage(ctx,img1);

    const offCanvas = document.createElement("canvas");
    offCanvas.width = canvas.width;
    offCanvas.height = canvas.height;

    const off = offCanvas.getContext("2d");

    for(let i=0;i<trail.length;i++){

        const t = 1 - i/trail.length;
        const radius =
            HEAD_RADIUS *
            (0.25 + 0.75*t);

        const alpha =
            Math.pow(t,1.5);

        off.beginPath();

        off.arc(
            trail[i].x,
            trail[i].y,
            radius,
            0,
            Math.PI*2
        );

        off.fillStyle =
        `rgba(0,0,0,${alpha})`;
        off.fill();

    }

    off.globalCompositeOperation =
    "source-in";

    drawCoverImage(off,img2);
    ctx.drawImage(
        offCanvas,
        0,
        0
    );

    if(trail.length){
        const head = trail[0];
        const glow = ctx.createRadialGradient(
            head.x,
            head.y,
            0,

            head.x,
            head.y,

            HEAD_RADIUS*1.4

        );

        glow.addColorStop(
            0,
            "rgba(255,190,215,.30)"
        );

        glow.addColorStop(
            .5,
            "rgba(255,190,215,.12)"
        );

        glow.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );

        ctx.beginPath();
        ctx.arc(
            head.x,
            head.y,

            HEAD_RADIUS*1.4,

            0,
            Math.PI*2
        );

        ctx.fillStyle = glow;
        ctx.fill();
    }

}

// ======================================
// START WHEN IMAGES LOAD
// ======================================

let loaded = 0;
function imageLoaded(){
    loaded++;
    if(loaded === 2){
        resizeCanvas();
        animate();
    }

}

img1.onload = imageLoaded;
img2.onload = imageLoaded;

// ======================================
// LOADING SCREEN
// ======================================
const celebrateBtn = document.getElementById("celebrateBtn");
const loadingScreen = document.getElementById("loadingScreen");
const heroSection = document.getElementById("hero");

celebrateBtn.addEventListener("click", async ()=>{

    try{
        await music.play();
        sessionStorage.setItem("musicPlaying","true");
    }catch(e){
        console.log("Music blocked.",e);
    }

    loadingScreen.classList.add("fadeOut");

    setTimeout(()=>{
        loadingScreen.style.display="none";
        heroSection.classList.remove("hidden");
        heroSection.style.display="flex";
    },1000);

});

// ======================================
// MUSIC PLAYER
// ======================================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

// Resume music if it was already playing
if (sessionStorage.getItem("musicPlaying") === "true") {

    music.currentTime =
        parseFloat(sessionStorage.getItem("musicTime")) || 0;

    music.play();

    isPlaying = true;

    musicBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

}

// Save current position every second
setInterval(() => {

    if (!music.paused) {

        sessionStorage.setItem(
            "musicTime",
            music.currentTime
        );

        sessionStorage.setItem(
            "musicPlaying",
            "true"
        );

    }

},1000);

// Music Button

musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        sessionStorage.setItem("musicPlaying","true");

        isPlaying = true;

        musicBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

    } else {

        music.pause();

        sessionStorage.setItem("musicPlaying","false");

        isPlaying = false;

        musicBtn.innerHTML =
        '<i class="fa-solid fa-music"></i>';

    }

});

// ======================================
// GALLERY BUTTON
// ======================================

const galleryBtn = document.getElementById("galleryBtn");

galleryBtn.addEventListener("click", () => {

    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href = "gallery.html";

    }, 700);

});