/**
 * ==========================================================================
 * DEAR NANDINI V2 - PREMIUM 3D GALLERY ENGINE & LIGHTBOX CONTEXT
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const galleryWrapper = document.getElementById("gallery-wrapper");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeLightbox = document.querySelector(".close-lightbox");

    // Premium Dataset Matrix for Nandini's Gallery (Supports 10-20 Photos easily)
    // Add paths to your images folder inside 'src'
    const memoriesData = [
        { src: "images/photo1.webp", title: "Eternal Grace", desc: "Every time you smile, the world gets a little brighter." },
        { src: "images/pic2.webp", title: "Purest Heart", desc: "Kindness is your superpower, and love is your language." },
        { src: "images/pic3.webp", title: "Mesmerizing Eyes", desc: "Looking into your eyes feels like a beautiful dream." },
        { src: "images/pic4.webp", title: "Unstoppable Joy", desc: "Spreading warmth wherever you step." },
        { src: "images/pic5.webp", title: "The Queen Style", desc: "Elegance isn't noticed, it's remembered forever." },
        { src: "images/photo6.webp", title: "Sweetest Memories", desc: "Moments turned into treasures, locked in my heart." },
        { src: "images/photo7.webp", title: "Radiant Glow", desc: "Shinning brighter than a thousand stars combined." },
        { src: "images/photo8.webp", title: "My Happy Place", desc: "With you, every single second feels like home." },
        { src: "images/photo9.webp", title: "Timeless Beauty", desc: "Growing more breathtakingly beautiful each day." },
        { src: "images/photo10.webp", title: "Absolute Perfection", desc: "Created with pure magic and absolute perfection." }
    ];

    // 1. DYNAMICALLY BUILD GALLERY SLIDER CARDS
    function renderGalleryCards() {
        memoriesData.forEach((item) => {
            const card = document.createElement("div");
            card.className = "gallery-card";
            
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${item.src}" alt="${item.title}" loading="lazy">
                </div>
                <div class="card-info">
                    <h4 class="card-title">${item.title}</h4>
                    <p class="card-desc">${item.desc}</p>
                </div>
            `;
            
            // Interaction: Open Zoom Lightbox on Click
            card.addEventListener("click", () => openPremiumLightbox(item.src, item.title));
            galleryWrapper.appendChild(card);
        });
    }

    renderGalleryCards();

    // 2. SLIDER NAVIGATIONAL STEPPERS
    const scrollAmount = 330; // Card width (300px) + Gap (30px)

    nextBtn.addEventListener("click", () => {
        galleryWrapper.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });

    prevBtn.addEventListener("click", () => {
        galleryWrapper.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    });

    // 3. INTERACTIVE LIGHTBOX WINDOW SYSTEM
    function openPremiumLightbox(imgSrc, titleText) {
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = titleText;
        lightbox.classList.remove("hidden");
        // Tiny structural delay to ensure CSS transition triggers smoothly
        setTimeout(() => {
            lightbox.classList.add("active");
        }, 10);
        // document.body.style.overflow = "hidden"; // Disable scroll when open
    }

    function closePremiumLightbox() {
        lightbox.classList.remove("active");
        setTimeout(() => {
            lightbox.classList.add("hidden");
        }, 500); // Time mirrors style transitions
        // document.body.style.overflow = "auto"; // Re-enable window scroll
    }

    closeLightbox.addEventListener("click", closePremiumLightbox);
    
    // Close lightbox instantly if clicked outside image frame
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closePremiumLightbox();
        }
    });

    // Escape Key compatibility for premium desktop interactions
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
            closePremiumLightbox();
        }
    });
});