/**
 * ==========================================================================
 * DEAR NANDINI V2 - UNIVERSAL MASTER CODE (HEX SECURED STATE)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. ALL CORE DOM HOOKS SETUP
    const loader = document.getElementById("cinematic-loader");
    const progressFill = document.querySelector(".progress-fill");
    const mainContent = document.getElementById("main-content");
    const musicToggle = document.getElementById("music-toggle");
    const startJourneyBtn = document.getElementById("start-journey-btn");
    const finalCelebrateBtn = document.getElementById("final-celebrate-btn");
    
    const initialPrompt = document.getElementById("loader-initial-prompt");
    const progressZone = document.getElementById("loader-progress-zone");

    // ==========================================================================
    // PREMIUM PASSWORD MODAL SYSTEM LOGIC (CINEMATIC STOP FLOW)
    // ==========================================================================
    // "password"
    const p1_hex = "616268693134336e616e6475"; 
    
    const passwordModal = document.getElementById('passwordModal');
    const submitPassBtn = document.getElementById('submitPassBtn');
    const unlockPassInput = document.getElementById('unlockPass');
    const errorMsg = document.getElementById('errorMsg');
    const loaderInteractivePulse = document.getElementById('loader-interactive-pulse');

    // Helper function to decode text smoothly
    function _parse(h) {
        let s = '';
        for (let i = 0; i < h.length; i += 2) {
            s += String.fromCharCode(parseInt(h.substr(i, 2), 16));
        }
        return s;
    }

    if (loaderInteractivePulse) {
        loaderInteractivePulse.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof switchTrack === "function") {
                switchTrack('loading');
            }
            if (passwordModal) {
                passwordModal.style.setProperty('display', 'flex', 'important');
            }
        });
    }

    if (submitPassBtn) {
        submitPassBtn.addEventListener('click', verifyAndUnlock);
    }

    if (unlockPassInput) {
        unlockPassInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verifyAndUnlock();
            }
        });
    }

    function verifyAndUnlock() {
        if (!unlockPassInput || !passwordModal || !loader) return;
        
        const inputVal = unlockPassInput.value.trim();

        if (inputVal === _parse(p1_hex)) {
            passwordModal.style.setProperty('display', 'none', 'important');
            
            const pulseWrapper = document.getElementById("loader-interactive-pulse");
            const progressZone = document.getElementById("loader-progress-zone");

            if (pulseWrapper) pulseWrapper.style.opacity = "0";
            
            setTimeout(() => {
                if (pulseWrapper) pulseWrapper.classList.add("hidden");
                if (progressZone) progressZone.style.setProperty('display', 'block', 'important');
            }, 400);

            let progress = 0;
            const loadingInterval = setInterval(() => {
                progress += 2.5; 
                if (progressFill) progressFill.style.width = `${progress}%`;

                if (progress >= 100) {
                    clearInterval(loadingInterval);
                    
                    loader.style.opacity = "0";
                    setTimeout(() => {
                        loader.classList.add("hidden");
                        if (mainContent) {
                            mainContent.classList.remove("hidden");
                            mainContent.classList.add("fade-in-premium");
                        }
                        if (musicToggle) {
                            musicToggle.classList.remove("hidden");
                            musicToggle.classList.add("playing");
                        }
                        
                        spawnRosePetals();
                        initPremiumCountdown();

                        if (typeof window.startTypewriterAnimation === "function") {
                            window.startTypewriterAnimation();
                        }

                        setTimeout(() => { switchTrack('hero'); }, 600);

                        startFloatingHearts();
                        setupSectionAudioObserver();
                    }, 1000);
                }
            }, 60);
            
        } else {
            if (errorMsg) errorMsg.style.setProperty('display', 'block', 'important');
            unlockPassInput.value = '';
            unlockPassInput.focus();
        }
    }

    // Audio Matrix Config
    const tracks = {
        loading: document.getElementById("bg-track-loading"),
        hero: document.getElementById("bg-track-hero"),
        gallery: document.getElementById("bg-track-gallery"),
        birthday: document.getElementById("bg-track-birthday")
    };

    let currentTrackKey = null;
    let isGlobalMuted = false;

    function switchTrack(newTrackKey) {
        if (isGlobalMuted || currentTrackKey === newTrackKey) return;

        const oldTrack = currentTrackKey ? tracks[currentTrackKey] : null;
        const newTrack = tracks[newTrackKey];

        if (!newTrack) return;

        if (oldTrack && !oldTrack.paused) {
            let volume = 1.0;
            const fadeOutInterval = setInterval(() => {
                volume -= 0.1;
                if (volume <= 0.1) {
                    clearInterval(fadeOutInterval);
                    oldTrack.pause();
                    oldTrack.currentTime = 0; 
                } else {
                    oldTrack.volume = volume;
                }
            }, 50);
        }

        newTrack.volume = 0;
        newTrack.play().then(() => {
            currentTrackKey = newTrackKey;
            let volume = 0.0;
            const fadeInInterval = setInterval(() => {
                volume += 0.1;
                if (volume >= 1.0) {
                    clearInterval(fadeInInterval);
                    newTrack.volume = 1.0;
                } else {
                    newTrack.volume = volume;
                }
            }, 50);
        }).catch(err => console.log("Playback notice:", err));
    }

    if (musicToggle) {
        musicToggle.addEventListener("click", () => {
            if (!currentTrackKey) return;
            const activeTrack = tracks[currentTrackKey];
            if (activeTrack.paused) {
                activeTrack.play();
                isGlobalMuted = false;
                musicToggle.classList.add("playing");
            } else {
                Object.values(tracks).forEach(t => t.pause());
                isGlobalMuted = true;
                musicToggle.classList.remove("playing");
            }
        });
    }

    initCinematicStars();

    window.addEventListener("scroll", () => {
        const scrollElements = document.querySelectorAll(".timeline-item");
        scrollElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight * 0.85) {
                el.classList.add("revealed");
            }
        });
    });
    setTimeout(() => { window.dispatchEvent(new Event('scroll')); }, 500);

    function setupSectionAudioObserver() {
        const options = { root: null, threshold: 0.35 };

        const audioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (sectionId === 'hero' || sectionId === 'letter') {
                        switchTrack('hero');
                    } else if (sectionId === 'gallery' || sectionId === 'timeline') {
                        switchTrack('gallery');
                    }
                }
            });
        }, options);

        document.querySelectorAll("section").forEach(sec => {
            if (sec.id !== 'surprise') audioObserver.observe(sec);
        });
    }

    if (finalCelebrateBtn) {
        finalCelebrateBtn.addEventListener("click", () => { switchTrack('birthday'); });
    }

    if (startJourneyBtn) {
        startJourneyBtn.addEventListener("click", () => {
            const gall = document.getElementById("gallery");
            if (gall) gall.scrollIntoView({ behavior: "smooth" });
        });
    }
    
    function initCinematicStars() {
        const canvas = document.getElementById("stars-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        const starsArray = [];

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5;
                this.speed = Math.random() * 0.01 + 0.005;
                this.opacity = Math.random();
                this.factor = 1;
            }
            update() {
                if (this.opacity >= 1) this.factor = -1;
                else if (this.opacity <= 0.2) this.factor = 1;
                this.opacity += this.factor * this.speed;
            }
            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) starsArray.push(new Star());

        function animateStars() {
            ctx.clearRect(0, 0, width, height);
            starsArray.forEach(s => { s.update(); s.draw(); });
            requestAnimationFrame(animateStars);
        }
        animateStars();
    }

    function startFloatingHearts() {
        const targetContainer = document.getElementById("hero-hearts");
        if (!targetContainer) return;
        setInterval(() => {
            const heart = document.createElement("i");
            heart.className = "fas fa-heart floating-heart";
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.fontSize = `${Math.random() * 15 + 12}px`;
            heart.style.animationDuration = `${Math.random() * 3 + 4}s`;
            heart.style.setProperty('--random-x', `${(Math.random() - 0.5) * 150}px`);
            heart.style.setProperty('--random-rot', `${Math.random() * 360}deg`);
            targetContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 6000);
        }, 400);
    }

    function spawnRosePetals() {
        const petalIcons = [
            `<svg width="24" height="24" viewBox="0 0 24 24" fill="#ff4d6d"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
            `<svg width="18" height="18" viewBox="0 0 24 24" fill="#ff758f"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
        ];

        setInterval(() => {
            if (mainContent.classList.contains("hidden")) return;

            const petal = document.createElement("div");
            petal.className = "rose-petal";
            
            const randomLeft = Math.random() * 100;
            const randomScale = Math.random() * 0.6 + 0.4;
            const randomDuration = Math.random() * 5 + 7; 
            const randomXShift = (Math.random() - 0.5) * 200;
            const randomRot = Math.random() * 360 + 360;

            petal.style.left = `${randomLeft}%`;
            petal.style.transform = `scale(${randomScale})`;
            petal.style.animationDuration = `${randomDuration}s`;
            petal.style.setProperty('--petal-x', `${randomXShift}px`);
            petal.style.setProperty('--petal-rot', `${randomRot}deg`);
            
            petal.innerHTML = petalIcons[Math.floor(Math.random() * petalIcons.length)];
            document.body.appendChild(petal);

            setTimeout(() => { petal.remove(); }, randomDuration * 1000);
        }, 800);
    }

    function initPremiumCountdown() {
        const tagline = document.querySelector(".hero-tagline");
        if (!tagline) return;

        const targetDate = new Date(2026, 6, 23, 0, 0, 0).getTime(); 

        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference < 0) {
                clearInterval(countdownInterval);
                tagline.innerHTML = `<span style="color: var(--gold-primary); font-weight: 600; text-transform: uppercase; letter-spacing: 3px; display: block; margin-bottom: 10px; font-size: 0.85rem; text-shadow: 0 0 10px rgba(214,175,55,0.3); animation: pulse 2s infinite;">✨ The Magic Begins Today ✨</span>`;
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            tagline.innerHTML = `
                <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 15px; font-family: var(--font-montserrat);">
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(214,175,55,0.2); padding: 8px 12px; border-radius: 4px; min-width: 60px;">
                        <span style="display: block; font-size: 1.2rem; color: #fff; font-weight: 600;">${days}</span>
                        <span style="font-size: 0.6rem; color: var(--gold-primary); letter-spacing: 1px; text-transform: uppercase;">Days</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(214,175,55,0.2); padding: 8px 12px; border-radius: 4px; min-width: 60px;">
                        <span style="display: block; font-size: 1.2rem; color: #fff; font-weight: 600;">${hours}</span>
                        <span style="font-size: 0.6rem; color: var(--gold-primary); letter-spacing: 1px; text-transform: uppercase;">Hrs</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(214,175,55,0.2); padding: 8px 12px; border-radius: 4px; min-width: 60px;">
                        <span style="display: block; font-size: 1.2rem; color: #fff; font-weight: 600;">${minutes}</span>
                        <span style="font-size: 0.6rem; color: var(--gold-primary); letter-spacing: 1px; text-transform: uppercase;">Min</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(214,175,55,0.2); padding: 8px 12px; border-radius: 4px; min-width: 60px;">
                        <span style="display: block; font-size: 1.2rem; color: #ff4d6d; font-weight: 600; text-shadow: 0 0 10px rgba(255,77,109,0.3);">${seconds}</span>
                        <span style="font-size: 0.6rem; color: var(--gold-primary); letter-spacing: 1px; text-transform: uppercase;">Sec</span>
                    </div>
                </div>
            `;
        }, 1000);
    }

    // ==========================================================================
    // UPGRADE: FUNNY CLIPS MODAL WITH AUDIO MATRIX OVERRIDE
    // ==========================================================================
    const funnyBtn = document.getElementById("funny-mem-btn");
    const funnyModal = document.getElementById("funny-video-modal");
    const funnyPlayer = document.getElementById("funny-video-player");
    const closeFunny = document.getElementById("close-funny-modal");

    if (funnyBtn && funnyModal && funnyPlayer) {
        funnyBtn.addEventListener("click", () => {
            if (currentTrackKey && tracks[currentTrackKey]) {
                tracks[currentTrackKey].pause();
            }
            funnyModal.classList.remove("hidden");
            funnyModal.style.opacity = "1";
            funnyModal.style.display = "flex";
            
            funnyPlayer.currentTime = 0;
            funnyPlayer.volume = 1.0; 
            funnyPlayer.play().catch(err => console.log("Video playback notice:", err));
        });
    }

    if (closeFunny && funnyModal && funnyPlayer) {
        closeFunny.addEventListener("click", () => {
            funnyPlayer.pause();
            funnyModal.classList.add("hidden");
            funnyModal.style.display = "none";
            
            if (currentTrackKey && tracks[currentTrackKey] && !isGlobalMuted) {
                tracks[currentTrackKey].play().catch(err => console.log("Audio resume note:", err));
            }
        });
    }

    // ==========================================================================
    // UPGRADE: SEPARATE VAULT PASSWORD PROTECTION SYSTEM
    // ==========================================================================
    const unlockVaultBtn = document.getElementById("unlock-vault-btn");
    const vaultPasswordInput = document.getElementById("vault-password-input");
    const vaultLockScreen = document.getElementById("vault-lock-screen");
    const secureVaultContent = document.getElementById("secure-vault-content");
    const vaultErrorMsg = document.getElementById("vault-error-msg");

    // "password"
    const p2_hex = "6e616e64696e693134336162686940"; 

    if (vaultPasswordInput) {
        vaultPasswordInput.addEventListener("focus", () => {
            vaultPasswordInput.style.borderColor = "var(--gold-primary)";
            vaultPasswordInput.style.boxShadow = "0 0 15px rgba(214, 175, 55, 0.25)";
        });
        vaultPasswordInput.addEventListener("blur", () => {
            vaultPasswordInput.style.borderColor = "rgba(255,255,255,0.08)";
            vaultPasswordInput.style.boxShadow = "none";
        });
    }

    if (unlockVaultBtn && vaultPasswordInput && vaultLockScreen && secureVaultContent) {
        unlockVaultBtn.addEventListener("click", () => {
            const enteredPass = vaultPasswordInput.value.trim();

            if (enteredPass === _parse(p2_hex)) {
                vaultLockScreen.style.transform = "scale(0.9)";
                vaultLockScreen.style.opacity = "0";
                
                setTimeout(() => {
                    vaultLockScreen.classList.add("hidden");
                    vaultLockScreen.style.display = "none";
                    
                    secureVaultContent.classList.remove("hidden");
                    secureVaultContent.style.display = "block";
                    
                    setTimeout(() => {
                        secureVaultContent.style.transition = "opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
                        secureVaultContent.style.opacity = "1";
                    }, 50);
                }, 400);
            } else {
                if (vaultErrorMsg) {
                    vaultErrorMsg.classList.remove("hidden");
                    vaultErrorMsg.textContent = "Incorrect Secret Key! Try again. 🤫";
                    
                    vaultPasswordInput.style.borderColor = "#ff4d6d";
                    vaultPasswordInput.style.boxShadow = "0 0 15px rgba(255, 77, 109, 0.3)";
                    
                    vaultLockScreen.style.transform = "translateX(-10px)";
                    setTimeout(() => { vaultLockScreen.style.transform = "translateX(10px)"; }, 100);
                    setTimeout(() => { vaultLockScreen.style.transform = "translateX(0)"; }, 200);
                }
            }
        });

        vaultPasswordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") unlockVaultBtn.click();
        });
    }
});

function initScrollReveal() {
    const revealItems = document.querySelectorAll(".scroll-reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: "0px 0px -30px 0px"
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(initScrollReveal, 600);
});