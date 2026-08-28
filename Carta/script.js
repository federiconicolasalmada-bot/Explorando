document.addEventListener("DOMContentLoaded", () => {

    const sobre = document.getElementById("sobre");
    const cartaWrapper = document.querySelector(".card-wrapper");
    const carta = document.querySelector(".card");
    const heartSeal = document.querySelector(".heart-seal");

    let timeoutId;

    // 🎵 AUDIO: Llamamos al que ya pusiste en el HTML
    const audio = document.getElementById("musica");
    if (audio) {
        audio.volume = 0.3; // Volumen ajustado
    }

    // 👉 PRIMER CLICK (SOBRE)
    if (sobre) {
        sobre.addEventListener("click", () => {

            const abierto = sobre.classList.toggle("abierto");

            if (abierto) {
                // 🔊 reproducir audio al abrir
                if (audio) {
                    audio.currentTime = 0;
                    audio.play().catch((error) => console.log("Error de audio:", error)); 
                }

                // 🔥 LIMPIAR EL ESTILO EN LÍNEA DEL CORAZÓN AL ABRIR
                if(heartSeal) heartSeal.style.opacity = "";

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
                // 🔇 pausar audio al cerrar
                if (audio) audio.pause();

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
            // Solo hace el efecto hover si el sobre está CERRADO
            if (!sobre.classList.contains("abierto")) {
                clearTimeout(timeoutId);
                heartSeal.style.opacity = 0;
            }
        });

        sobre.addEventListener("mouseout", () => {
            timeoutId = setTimeout(() => {
                // 🔥 SOLO vuelve a mostrarlo si el sobre sigue CERRADO
                if (!sobre.classList.contains("abierto")) {
                    heartSeal.style.opacity = 1;
                }
            }, 1500);
        });

        heartSeal.style.transition = "opacity 0.3s ease";
    }

});
