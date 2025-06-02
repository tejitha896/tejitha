 const buttons = document.querySelectorAll("[data-filter]");
const items = document.querySelectorAll(".item");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");

        buttons.forEach(btn => btn.classList.remove("active-button"));
        button.classList.add("active-button");

        items.forEach(item => {
            const category = item.getAttribute("data-category");
            if (filter === "all" || filter === category) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// Image Viewer Logic
const viewer = document.getElementById("image-viewer");
const fullImage = document.getElementById("full-image");
const closeBtn = document.getElementById("close-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

let currentIndex = 0;
let visibleImages = [];

function updateVisibleImages() {
    visibleImages = Array.from(document.querySelectorAll(".item"))
        .filter(item => item.style.display !== "none")
        .map(item => item.querySelector("img"));
}

function showImage(index) {
    if (visibleImages.length === 0) return;
    currentIndex = (index + visibleImages.length) % visibleImages.length;
    fullImage.src = visibleImages[currentIndex].src;
    viewer.style.display = "flex";
}

document.querySelectorAll(".item img").forEach((img, index) => {
    img.addEventListener("click", () => {
        updateVisibleImages();
        currentIndex = visibleImages.indexOf(img);
        showImage(currentIndex);
    });
});

closeBtn.addEventListener("click", () => {
    viewer.style.display = "none";
});

nextBtn.addEventListener("click", () => {
    showImage(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {
    showImage(currentIndex - 1);
});

document.addEventListener("keydown", e => {
    if (viewer.style.display === "flex") {
        if (e.key === "ArrowRight") showImage(currentIndex + 1);
        else if (e.key === "ArrowLeft") showImage(currentIndex - 1);
        else if (e.key === "Escape") viewer.style.display = "none";
    }
});