document.addEventListener("DOMContentLoaded", () => {

    const sobre = document.getElementById("sobre");
    const cartaWrapper = document.querySelector(".card-wrapper"); // Envuelve la carta
    const carta = document.querySelector(".card"); // La carta física
    const heartSeal = document.querySelector('.heart-seal');

    let timeoutId;

    // 🎵 AUDIO
    const audio = new Audio("mi-cancion.mp3");
    audio.volume = 0.1;

    // 👉 PRIMER CLICK (EN EL SOBRE): Abre el sobre y saca la carta
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
            // Si cerramos el sobre, guardamos la tapa de la carta también
            carta.classList.remove("desplegada");
        }
    });

    // 👉 SEGUNDO CLICK (EN LA CARTA): Despliega la portada
    cartaWrapper.addEventListener("click", (evento) => {
        // 🔥 LA MAGIA: Solo activamos el escudo si el sobre ya salió
        if (sobre.classList.contains("abierto")) {
            // Esto frena el clic en seco para que NO llegue al sobre
            evento.stopPropagation(); 
            
            // Abre o cierra la tapa de la carta
            carta.classList.toggle("desplegada"); 
        }
    });

    // ❤️ efecto corazón (opcional)
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
