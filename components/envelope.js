// ======================================
// ELEMENTS
// ======================================

const overlay = document.getElementById("envelopeOverlay");
const envelope = document.querySelector(".envelope");
const seal = document.getElementById("seal");
const letter = document.getElementById("letter");
const closeBtn = document.getElementById("closeLetter");
const surpriseBtn = document.getElementById("surpriseBtn");

// Hide gallery button initially
galleryBtn.classList.remove("show");

// ======================================
// OPEN ENVELOPE
// ======================================

surpriseBtn.addEventListener("click", () => {

    overlay.classList.add("show");

    // Reset every time
    envelope.classList.remove("open");
    letter.classList.remove("show");

});

// ======================================
// OPEN LETTER
// ======================================

seal.addEventListener("click", () => {

    envelope.classList.add("open");

    setTimeout(() => {

        letter.classList.add("show");

    }, 450);

});

// ======================================
// CLOSE ENVELOPE
// ======================================

function closeEnvelope() {

    letter.classList.remove("show");

    setTimeout(() => {

        envelope.classList.remove("open");

    }, 200);

    setTimeout(() => {

        overlay.classList.remove("show");

        // Reveal gallery button after closing
        document.getElementById("galleryBtn").classList.add("show");

    }, 500);

}

// ======================================
// CLOSE BUTTON
// ======================================

closeBtn.addEventListener("click", () => {

    closeEnvelope();

});

// ======================================
// CLICK OUTSIDE TO CLOSE
// ======================================

overlay.addEventListener("click", (e) => {

    if (e.target === overlay) {

        closeEnvelope();

    }

});

// ======================================
// ESC TO CLOSE
// ======================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && overlay.classList.contains("show")) {

        closeEnvelope();

    }

});