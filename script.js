document.addEventListener("DOMContentLoaded", () => {

    const sobre = document.getElementById("sobre");
    const cartaWrapper = document.querySelector(".card-wrapper");
    const carta = document.querySelector(".card");
    const heartSeal = document.querySelector(".heart-seal");

    let timeoutId;

    // 🎵 AUDIO
    const audio = new Audio("mi-cancion.mp3");
    audio.volume = 0.1;

    // 👉 PRIMER CLICK (SOBRE)
    if (sobre) {
        sobre.addEventListener("click", () => {

            const abierto = sobre.classList.toggle("abierto");

            if (abierto) {
                // 🔊 reproducir audio sin duplicarse
                audio.currentTime = 0;
                audio.play().catch(() => {}); // evita error si el navegador bloquea

                // 💥 explosión de corazones
                for (let i = 0; i < 20; i++) {
                    const heart = document.createElement("div");
                    heart.innerHTML = "❤️";

                    heart.style.position = "absolute";
                    heart.style.left = "50%";
                    heart.style.top = "40%";
                    heart.style.fontSize = "20px";
                    heart.style.pointerEvents = "none";
                    heart.style.zIndex = "999";

                    const x = (Math.random() - 0.5) * 400;
                    const y = (Math.random() - 0.5) * 400;

                    heart.style.transition = "transform 1s ease, opacity 1s ease";
                    document.body.appendChild(heart);

                    setTimeout(() => {
                        heart.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
                        heart.style.opacity = 0;
                    }, 10);

                    setTimeout(() => heart.remove(), 1000);
                }

            } else {
                // 🔇 pausar audio
                audio.pause();

                // 🔁 cerrar carta si estaba abierta
                if (carta) carta.classList.remove("desplegada");
            }
        });
    }

    // 👉 SEGUNDO CLICK (CARTA)
    if (cartaWrapper && carta && sobre) {
        cartaWrapper.addEventListener("click", (evento) => {

            if (sobre.classList.contains("abierto")) {
                evento.stopPropagation(); // 🔥 evita cerrar el sobre
                carta.classList.toggle("desplegada");
            }

        });
    }

    // ❤️ EFECTO CORAZÓN (HOVER)
    if (sobre && heartSeal) {

        sobre.addEventListener("mouseover", () => {
            clearTimeout(timeoutId);
            heartSeal.style.opacity = 0;
        });

        sobre.addEventListener("mouseout", () => {
            timeoutId = setTimeout(() => {
                heartSeal.style.opacity = 1;
            }, 1500);
        });

        heartSeal.style.transition = "opacity 0.3s ease";
    }

});
