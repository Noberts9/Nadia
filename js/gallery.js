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
// HIDDEN WISHES
// ======================================

const stars = document.querySelectorAll(".star");
const popup = document.getElementById("wishPopup");
const wishText = document.getElementById("wishText");

const wishes = [
    "Keep collecting beautiful moments, not just beautiful photos.",
    "May this year bring more coffee dates, sunsets and unforgettable adventures.",
    "🤍 Never stop being the reason someone smiles. Happy Birthday, Nadia."
];

let found = 0;
const clicked = new Set();

stars.forEach((star, index) => {

    star.addEventListener("click", () => {

        // Prevent clicking the same star twice
        if (clicked.has(index)) return;

        clicked.add(index);
        found++;

        // Show message
        wishText.innerHTML = wishes[index];
        popup.classList.add("show");

        // Hide the clicked star
        star.style.display = "none";

        // Hide popup after 3 seconds
        setTimeout(() => {
            popup.classList.remove("show");
        }, 3000);

        // Found all stars
        if (found === stars.length) {

            setTimeout(() => {

                wishText.innerHTML =
                    "🌟 You found every hidden wish.<br><br>Some surprises are worth looking for.";

                popup.classList.add("show");

                setTimeout(() => {
                    popup.classList.remove("show");
                }, 4000);

            }, 3200);

        }

    });

});

// ======================================
// FINISH BUTTON
// ======================================

const finishBtn = document.getElementById("finishBtn");

finishBtn.addEventListener("click", () => {

    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href = "goodbye.html";

    }, 800);

});

// ======================================
// PAGE FADE IN
// ======================================

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    document.body.style.transition = "opacity .8s ease";

    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);

});