// Siin on kõik küsimused massiivis (listis)
const questions = [
  { q: 'Milline on Eesti pealinn?',
    opts: ['Riia', 'Tallinn', 'Vilnius', 'Helsinki'], ans: 1 }, // ans = õige vastuse indeks
  { q: 'Milline on Eesti rahvusvaheline telefonikood?',
    opts: ['+370', '+358', '+372', '+371'], ans: 2 },
  { q: 'Millises aastas sai Eesti iseseisvuse taas kätte?',
    opts: ['1989', '1990', '1991', '1992'], ans: 2 },
  { q: 'Mis on Eesti rahvuslinnu nimi?',
    opts: ['Laulurästas', 'Suitsupääsuke', 'Kotkas', 'Kuldnokk'], ans: 1 },
  { q: 'Kui pikk on Eesti rannajoone pikkus (ligikaudu)?',
    opts: ['1 400 km', '2 800 km', '3 800 km', '5 000 km'], ans: 2 },
];

// Muutujad, mis hoiavad hetke seisu
let qIdx = 0;      // milline küsimus on parasjagu (index)
let qScore = 0;    // punktid
let answered = false; // kas küsimusele on juba vastatud

// Funktsioon, mis kuvab küsimuse ekraanile
function renderQuestion() {
  const q = questions[qIdx]; // võtab praeguse küsimuse

  // Kuvab küsimuse teksti
  document.getElementById('quiz-q').textContent = q.q;

  // Kuvab progressi (nt "Küsimus 1 / 5")
  document.getElementById('quiz-progress-txt').textContent =
    `Küsimus ${qIdx + 1} / ${questions.length}`;

  // Muudab progressiriba laiust (%)
  document.getElementById('quiz-bar').style.width =
    ((qIdx + 1) / questions.length * 100) + '%';

  // Loob vastusevariandid nuppudena
  document.getElementById('quiz-opts').innerHTML = q.opts.map((o, i) =>
    `<button class="quiz-opt" onclick="answer(${i})">${o}</button>`
  ).join('');

  // Peidab tagasiside ja "next" nupu
  document.getElementById('quiz-feedback').style.display = 'none';
  document.getElementById('quiz-next').style.display = 'none';

  answered = false; // lubab uuesti vastata
}

// Funktsioon, mis käivitub kui kasutaja klikib vastuse peale
function answer(i) {

  // Kui juba vastati, siis rohkem ei tee midagi
  if (answered) return;

  answered = true; // märgib, et nüüd on vastatud

  const q = questions[qIdx]; // praegune küsimus
  const btns = document.querySelectorAll('.quiz-opt'); // kõik vastuse nupud

  // Keelab kõik nupud (et ei saaks mitu korda vajutada)
  btns.forEach(b => b.disabled = true);

  // Kontrollib, kas vastus oli õige
  if (i === q.ans) {
    btns[i].classList.add('correct'); // märgib roheliseks
    qScore++; // lisab punkti
    showFeedback(true, 'Õige!');
  } else {
    btns[i].classList.add('wrong'); // märgib punaseks
    btns[q.ans].classList.add('correct'); // näitab õiget vastust
    showFeedback(false, `Vale! Õige vastus oli: ${q.opts[q.ans]}`);
  }

  // Uuendab skoori ekraanil
  document.getElementById('quiz-score').textContent = `Skoor: ${qScore}`;

  // Näitab "järgmine" nuppu
  const nextBtn = document.getElementById('quiz-next');
  nextBtn.style.display = 'inline-block';

  // Kui viimane küsimus → tekst muutub
  nextBtn.textContent = qIdx < questions.length - 1 ? 'Järgmine' : 'Näita tulemust';
}

// Funktsioon, mis näitab tagasisidet (õige/vale)
function showFeedback(ok, txt) {
  const el = document.getElementById('quiz-feedback');

  // Lisab klassi vastavalt kas õige või vale
  el.className = 'quiz-feedback ' + (ok ? 'ok' : 'err');

  // Kuvab teksti
  el.textContent = txt;

  // Näitab elementi
  el.style.display = 'block';
}

// Funktsioon, mis liigub järgmise küsimuse juurde
function nextQuestion() {
  qIdx++; // liigub järgmise küsimuse juurde

  // Kui küsimused said otsa
  if (qIdx >= questions.length) {

    // Näitab lõpptulemust
    document.getElementById('quiz-q').textContent =
      `Viktoriin lõppenud! Sinu tulemus: ${qScore} / ${questions.length}`;

    // Tühjendab vastused
    document.getElementById('quiz-opts').innerHTML = '';

    // Peidab muud elemendid
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-next').style.display = 'none';

    // Täidab progressiriba lõpuni
    document.getElementById('quiz-bar').style.width = '100%';

    // Loob "Alusta uuesti" nupu
    const restart = document.createElement('button');
    restart.className = 'btn btn-primary';
    restart.style.marginTop = '1rem';
    restart.textContent = 'Alusta uuesti';

    // Kui klikid restart → nullib kõik ja alustab uuesti
    restart.addEventListener('click', () => {
      qIdx = 0;
      qScore = 0;
      restart.remove(); // eemaldab nupu

      document.getElementById('quiz-score').textContent = 'Skoor: 0';

      renderQuestion(); // alustab otsast
    });

    // Lisab nupu lehele
    document.querySelector('#quiz .card').appendChild(restart);

  } else {
    // Kui küsimusi on veel → näita järgmist
    renderQuestion();
  }
}

// Kui vajutad "Järgmine" nuppu → käivitub nextQuestion
document.getElementById('quiz-next').addEventListener('click', nextQuestion);

// Kui leht laeb → näita esimest küsimust
renderQuestion();