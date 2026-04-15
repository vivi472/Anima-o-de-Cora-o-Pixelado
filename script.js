const heartContainer = document.getElementById("heart");
const textContainer = document.getElementById("text");

// Padrão do coração (cada string é uma linha, 0=vazio, 1=preenchido)
const heartPattern = [
    "00110001100",
    "01111011110",
    "11111111111",
    "11111111111",
    "11111111111",
    "01111111110",
    "00111111100",
    "00011111000",
    "00001110000",
    "00000100000"
];

// Letras em pixel art (5x3)
const letters = {
    "I": ["010", "010", "010", "010", "010"],
    "L": ["100", "100", "100", "100", "111"],
    "O": ["111", "101", "101", "101", "111"],
    "V": ["101", "101", "101", "101", "010"],
    "E": ["111", "100", "111", "100", "111"],
    "Y": ["101", "101", "010", "010", "010"],
    "U": ["101", "101", "101", "101", "111"],
    " ": ["000", "000", "000", "000", "000"]
};

const message = "I LOVE YOU";

// Função para limpar o container
function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

// Função melhorada para renderizar padrões
function render(pattern, container, columns, startDelay = 0) {
    clearContainer(container);
    container.style.gridTemplateColumns = `repeat(${columns}, 20px)`;
    
    let pixelIndex = 0;
    const totalPixels = pattern.length * columns;
    
    pattern.forEach((row, rowIndex) => {
        for (let i = 0; i < row.length; i++) {
            const char = row[i];
            const pixel = document.createElement("div");
            pixel.className = "pixel";
            
            if (char === "0") {
                pixel.style.opacity = "0";
                pixel.style.transform = "translateY(-200px)";
                pixel.style.visibility = "hidden"; // Esconde completamente
            } else {
                pixel.dataset.active = "true";
                // Delay baseado na posição para criar efeito cascata
                const delay = startDelay + (rowIndex * 20) + (i * 5) + (Math.random() * 100);
                setTimeout(() => {
                    pixel.classList.add("animate");
                }, delay);
            }
            
            container.appendChild(pixel);
            pixelIndex++;
        }
    });
}

// Renderizar coração com animação em cascata
render(heartPattern, heartContainer, 11, 0);

// Construir as linhas do texto
let textRows = ["", "", "", "", ""];
for (let charIndex = 0; charIndex < message.length; charIndex++) {
    const char = message[charIndex];
    const letter = letters[char] || letters[" "];
    
    letter.forEach((row, i) => {
        // Adiciona a linha da letra + um espaçamento de 1 coluna vazia entre letras
        textRows[i] += row + "0";
    });
}

// Remover o último "0" extra se necessário
textRows = textRows.map(row => row.slice(0, -1));

// Renderizar texto com delay maior (aparece depois do coração)
setTimeout(() => {
    render(textRows, textContainer, textRows[0].length, 500);
    
    // Adicionar efeito de pulsação no texto
    setInterval(() => {
        const textPixels = document.querySelectorAll('#text .pixel[data-active="true"]');
        textPixels.forEach(pixel => {
            if (Math.random() > 0.7) {
                pixel.style.boxShadow = '0 0 15px #ff66b5';
                setTimeout(() => {
                    pixel.style.boxShadow = 'none';
                }, 200);
            }
        });
    }, 500);
}, 2000);

// Adicionar efeito de brilho nos pixels do coração
setInterval(() => {
    const heartPixels = document.querySelectorAll('#heart .pixel[data-active="true"]');
    const randomPixel = heartPixels[Math.floor(Math.random() * heartPixels.length)];
    if (randomPixel) {
        randomPixel.style.boxShadow = '0 0 20px #ff66b5';
        randomPixel.style.backgroundColor = '#ff66b5';
        setTimeout(() => {
            randomPixel.style.boxShadow = 'none';
            randomPixel.style.backgroundColor = '#ff298b';
        }, 300);
    }
}, 400);

// Efeito de pulsação geral no wrapper
let scale = 1;
let growing = true;
setInterval(() => {
    const wrapper = document.querySelector('.wrapper');
    if (growing) {
        scale += 0.01;
        if (scale >= 1.05) growing = false;
    } else {
        scale -= 0.01;
        if (scale <= 0.98) growing = true;
    }
    wrapper.style.transform = `translateY(-2vh) scale(${scale})`;
    wrapper.style.transition = 'transform 0.1s linear';
}, 100);