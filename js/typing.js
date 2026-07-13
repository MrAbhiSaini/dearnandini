/**
 * ==========================================================================
 * DEAR NANDINI V2 - CINEMATIC DYNAMIC TYPEWRITER ENGINE
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const typewriterContainer = document.getElementById("typewriter-text");
    const letterSection = document.getElementById("letter");

    // Pure dynamic emotional birthday note for Nandini
    // You can modify this text anytime, formatting breaks (\n) are automatically handled as paragraphs.
    const romanticLetterText = 
        "Dearest Nandini,\n\n" +
        "From the moment you stepped into my world, you turned every ordinary day into a beautiful cinematic melody. Your kindness, your absolute grace, and that mesmerizing smile are the rarest treasures I have ever found.\n\n" +
        "Today, on your special day, I want to promise you that no matter how fast the world moves, my love for you will always remain constant, pure, and deep. May every single dream of yours take flight today, and may that bright laughter never fade from your lips.\n\n" +
        "Happy Birthday to the queen of my universe, my constant joy, and my greatest blessing. ❤️";

    let index = 0;
    let hasStarted = false;
    const typingSpeed = 45; // Speed in milliseconds per character (Adjust for faster/slower feel)

    // Function to execute the premium mechanical writing effect
    function typeEffect() {
        if (index < romanticLetterText.length) {
            const char = romanticLetterText.charAt(index);
            
            if (char === "\n") {
                typewriterContainer.innerHTML += "<br>";
            } else {
                typewriterContainer.innerHTML += char;
            }
            
            index++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            // Remove the temporary cursor blinking bar once typing finishes perfectly
            const cursor = document.querySelector(".typewriter-cursor");
            if (cursor) cursor.remove();
        }
    }

    // Initialize Intersection Observer to trigger ONLY when the card enters the view screen
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted) {
                hasStarted = true;
                
                // Add the visual premium typing blinking cursor wrapper dynamically
                typewriterContainer.innerHTML = '<span class="typewriter-cursor"></span>';
                
                // Slight delayed kickoff for maximum trailer aesthetic transition
                setTimeout(() => {
                    // Put cursor back after handling container inner text reset
                    typewriterContainer.innerHTML = '';
                    const cursorSpan = document.createElement("span");
                    cursorSpan.className = "typewriter-cursor";
                    typewriterContainer.appendChild(cursorSpan);
                    
                    // Call character engine
                    typeCharacterEngine();
                }, 600);
            }
        });
    }, { threshold: 0.25 });

    // Internal execution to keep cursor running at the end of text stream smoothly
    function typeCharacterEngine() {
        if (index < romanticLetterText.length) {
            const char = romanticLetterText.charAt(index);
            const cursor = typewriterContainer.querySelector(".typewriter-cursor");
            
            if (char === "\n") {
                const br = document.createElement("br");
                typewriterContainer.insertBefore(br, cursor);
            } else {
                const textNode = document.createTextNode(char);
                typewriterContainer.insertBefore(textNode, cursor);
            }
            
            index++;
            setTimeout(typeCharacterEngine, typingSpeed);
        } else {
            // Optional cleanup if you want cursor gone at end, otherwise let it keep blinking premium style!
        }
    }

    if(letterSection) {
        typingObserver.observe(letterSection);
    }
});