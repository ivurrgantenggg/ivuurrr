let questions = [
    "Apa hal terbaik yang terjadi hari ini?",
    "Siapa yang membuat kamu tersenyum hari ini?",
    "Apa yang lagi kamu pikirin sekarang?",
    "Apa yang bikin kamu sedih akhir-akhir ini?",
    "Hal kecil apa yang kamu syukuri hari ini?",
    "Apa yang kamu harapkan besok?"
];

let currentQuestion = 0;

function nextQuestion() {
    currentQuestion = (currentQuestion + 1) % questions.length;
    document.getElementById("question").textContent = questions[currentQuestion];
}

// Simpan curhatan
function saveEntry() {
    let text = document.getElementById("curhatText").value;
    let mood = document.getElementById("moodSelect").value;

    if (text.trim() === "") {
        alert("Tulis dulu ya 💗");
        return;
    }

    let box = document.createElement("div");
    box.className = "entry";
    box.innerHTML = `
        <p><b>Mood:</b> ${mood}</p>
        <p>${text}</p>
        <hr>
    `;

    document.getElementById("diaryList").prepend(box);
    document.getElementById("curhatText").value = "";
}

// Musik
document.getElementById("playMusic").onclick = function () {
    let music = document.getElementById("bg-music");
    music.play();
};

// Love fall effect
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";

    document.getElementById("hearts-container").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 200);
