document.addEventListener("DOMContentLoaded", () => {

    const sobre = document.getElementById("sobre");
    const cartaWrapper = document.querySelector(".card-wrapper");
    const carta = document.querySelector(".card");
    const heartSeal = document.querySelector('.heart-seal');

    let timeoutId;

    // 🎵 AUDIO
    const audio = new Audio("mi-cancion.mp3");
    audio.volume = 0.1;

    /* =========================================
       🔥 ANIMACIÓN INICIAL AUTOMÁTICA
       ========================================= */

    // Estado inicial: sobre abierto
    sobre.classList.add("inicial");

    // Activar animación después de un pequeño delay
    setTimeout(() => {
        sobre.classList.add("animar");
    }, 300);

    // Cuando termina la animación:
    setTimeout(() => {
        // Limpiamos estados iniciales
        sobre.classList.remove("inicial");
        sobre.classList.remove("animar");

        // Dejamos el sobre cerrado listo para interactuar
        sobre.classList.remove("abierto");

    }, 2000);


    /* =========================================
       👉 CLICK EN EL SOBRE
       ========================================= */

    sobre.addEventListener("click", () => {
        const abierto = sobre.classList.toggle("abierto");

        if (abierto) {
            audio.currentTime = 0;
            audio.play();

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

                setTimeout(() => {
                    heart.remove();
                }, 1000);
            }

        } else {
            audio.pause();
            carta.classList.remove("desplegada");
        }
    });


    /* =========================================
       👉 CLICK EN LA CARTA
       ========================================= */

    cartaWrapper.addEventListener("click", (evento) => {
        if (sobre.classList.contains("abierto")) {
            evento.stopPropagation();
            carta.classList.toggle("desplegada");
        }
    });


    /* =========================================
       ❤️ EFECTO CORAZÓN HOVER
       ========================================= */

    sobre.addEventListener('mouseover', () => {
        clearTimeout(timeoutId);
        if (heartSeal) heartSeal.style.opacity = 0;
    });

    sobre.addEventListener('mouseout', () => {
        timeoutId = setTimeout(() => {
            if (heartSeal) heartSeal.style.opacity = 1;
        }, 1500);
    });

    if (heartSeal) heartSeal.style.transition = 'opacity 0.3s ease';

});
