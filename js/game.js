const storyText = document.getElementById("storyText");
const buttonsDiv = document.querySelector(".buttons");
const bgMusic = document.getElementById("bgMusic");

// 100 kata manis + emoji
const quotes = [
    "Kamu itu seperti angka 1… selalu jadi yang pertama aku pikirin ❤️",
    "Kalau bahagia itu rumus, kamu variabel yang bikin hasilnya indah 😘",
    "Hidupku sebelumnya acak, tapi sejak ada kamu pola pas 🌸",
    "Senyummu kayak tanda plus, selalu nambahin moodku 😊",
    "Aku gak jago matematika, tapi ngitung alasan suka kamu gampang 😍",
    "Kamu jawaban dari soal yang lama aku cari 💡",
    "Rasanya sama kamu seperti grafik naik 📈",
    "Kamu bikin hidupku stabil 🌈",
    "Kalau hatiku garis, arahnya selalu ke kamu ➡️",
    "Dalam banyak pilihan, kamu solusi paling masuk akal ✅",
    // … tambahkan sisa dari 100 kata manis (bisa pakai list sebelumnya)
];

// Tambahkan efek hati
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// Struktur cerita super panjang
const story = {
    start: {
        text: "Hai sayang! Aku punya cerita untuk kita… Mau mulai petualangan cinta kita? 🌸",
        choices: [
            { text: "Mulai 💖", next: "taman" }
        ]
    },
    taman: {
        text: "Kamu berjalan ke taman yang penuh bunga 🌷. Aku tersenyum 😘. Apa yang kamu lakukan?",
        choices: [
            { text: "Dekatiku 🤗", next: "near" },
            { text: "Melambaikan tangan 👋", next: "wave" }
        ]
    },
    near: {
        text: "Aku merasa bahagia banget saat kamu mendekat ❤️. Aku kasih bunga favoritmu 🌹. Pilih reaksimu:",
        choices: [
            { text: "Terima dengan senyum 😊", next: "smile" },
            { text: "Peluk aku 🤗", next: "hug" }
        ]
    },
    wave: {
        text: "Aku senyum melihatmu melambaikan tangan 🌸. Tapi aku pengen lebih dekat 😳. Pilih:",
        choices: [
            { text: "Berjalan ke aku 🚶‍♂️", next: "near" },
            { text: "Tetap di tempat 👀", next: "wait" }
        ]
    },
    smile: {
        text: "Senymu bikin hatiku meleleh 🥰. Aku senang banget punya kamu 😘. Mau lanjut petualangan?",
        choices: [
            { text: "Ya, lanjut 💞", next: "hug" },
            { text: "Berhenti dulu 😅", next: "end" }
        ]
    },
    hug: {
        text: "Pelukanmu membuat semua masalah hilang 🤗❤️. Aku janji selalu ada untuk kamu 💖.",
        choices: [
            { text: "Aku sayang kamu 😍", next: "end" },
            { text: "Aku juga 💕", next: "end" }
        ]
    },
    wait: {
        text: "Aku merasa sedikit sedih 😔, tapi aku tunggu kamu di bangku taman 🌷. Pilih:",
        choices: [
            { text: "Ayo mendekat 🚶‍♂️", next: "near" },
            { text: "Diam dulu 🤔", next: "end" }
        ]
    },
    end: {
        text: "Terima kasih sudah bermain ❤️. Aku harap kamu bahagia 😘. Sampai jumpa di petualangan selanjutnya 💞",
        choices: [
            { text: "Main lagi 🎮", next: "start" }
        ]
    }
};

// Tampilkan kata manis acak + animasi hati
function showStory(nodeKey) {
    const node = story[nodeKey];

    // Tampilkan teks cerita
    storyText.innerText = node.text;

    // Hapus tombol lama
    buttonsDiv.innerHTML = "";

    // Tambahkan tombol baru
    node.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerText = choice.text;
        btn.onclick = (e) => {
            // animasi hati di posisi klik
            createHeart(e.clientX, e.clientY);

            // Tampilkan 3 kata manis acak
            let randomQuotes = [];
            for(let i=0; i<3; i++){
                const q = quotes[Math.floor(Math.random() * quotes.length)];
                if(!randomQuotes.includes(q)) randomQuotes.push(q);
            }
            storyText.innerText = node.text + "\n\n💌 " + randomQuotes.join("\n💌 ");

            // Lanjut cerita setelah 1.5 detik
            setTimeout(() => showStory(choice.next), 1500);
        };
        buttonsDiv.appendChild(btn);
    });
}

// Mulai cerita
showStory("start");
