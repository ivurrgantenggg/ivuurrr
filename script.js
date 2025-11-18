let secret = Math.floor(Math.random() * 10) + 1;

function checkGuess() {
    let g = document.getElementById("guess").value;
    let r = document.getElementById("result");

    if (g == secret) {
        r.innerHTML = "Kok kamu pinter banget sii 😳❤️";
        secret = Math.floor(Math.random() * 10) + 1;
    } else {
        r.innerHTML = "Salah 😝 coba lagi yaa!";
    }
}


// --- [ LOGIKA GAME SEDERHANA ] ---
const gameClue = document.getElementById('game-clue');
const gameInput = document.getElementById('game-input');
const gameCheckBtn = document.getElementById('game-check-btn');
const gameResult = document.getElementById('game-result');
const jawabanBenar = "KESEMPATAN"; // Kata kunci romantis

gameCheckBtn.addEventListener('click', function() {
    const jawabanUser = gameInput.value.trim().toUpperCase();
    
    if (jawabanUser === jawabanBenar) {
        gameResult.style.color = '#4CAF50';
        gameResult.innerHTML = `✅ **BENAR!** Aku sangat butuh ${jawabanBenar} darimu. Terima kasih! Kamu memang yang tercerdas.`;
        gameCheckBtn.disabled = true;
    } else {
        gameResult.style.color = '#F44336';
        gameResult.textContent = `❌ Salah. Coba lagi! Ingat, ini tentang apa yang kita butuhkan sekarang.`;
    }
});
// Reset input saat masuk ke halaman game (agar bisa dimainkan berkali-kali)
document.getElementById('game-section').addEventListener('click', () => {
    if (gameCheckBtn.disabled) {
        gameResult.textContent = 'Game sudah dimenangkan!';
    }
});


// --- [ LOGIKA KOTAK KATA MANIS (Randomizer) ] ---
const pesanDisplay = document.getElementById('pesan-display');
const nextKataBtn = document.getElementById('next-kata-btn');

const daftarPesanManis = [
    "✨ Aku sangat mencintaimu, lebih dari kata-kata yang bisa aku tulis di VS Code ini.",
    "✨ Senyummu adalah notifikasi terbaik di hari-hariku. Tolong, tampilkan lagi ya?",
    "✨ Aku janji, aku akan menjadi versi diriku yang pantas untuk kamu. Beri aku waktu.",
    "✨ Kamu itu seperti *error* di kode: menyebalkan, tapi tanpamu, program hidupku nggak akan jalan.",
    "✨ Kalau kamu sedih, ingat, aku akan jadi 'Ctrl+Z' yang siap membatalkan semua hal buruk di hari-harimu.",
    "✨ Terima kasih sudah mengajarkanku arti sabar dan tulus. Kamu pahlawanku.",
    "✨ Hatiku adalah *repository* khusus, dan kamu adalah *main branch* yang takkan pernah aku hapus.",
];

let lastIndex = -1;

nextKataBtn.addEventListener('click', function() {
    let randomIndex;
    // Pastikan pesan yang muncul tidak sama dengan yang terakhir
    do {
        randomIndex = Math.floor(Math.random() * daftarPesanManis.length);
    } while (randomIndex === lastIndex && daftarPesanManis.length > 1);
    
    pesanDisplay.innerHTML = daftarPesanManis[randomIndex];
    lastIndex = randomIndex;
});