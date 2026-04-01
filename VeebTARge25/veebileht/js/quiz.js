// quiz.js — viktoriini loogika

const questions = [
  { q: 'Milline on Eesti pealinn?',
    opts: ['Riia', 'Tallinn', 'Vilnius', 'Helsinki'], ans: 1 },
  { q: 'Milline on Eesti rahvusvaheline telefonikood?',
    opts: ['+370', '+358', '+372', '+371'], ans: 2 },
  { q: 'Millises aastas sai Eesti iseseisvuse taas kätte?',
    opts: ['1989', '1990', '1991', '1992'], ans: 2 },
  { q: 'Mis on Eesti rahvuslinnu nimi?',
    opts: ['Laulurästas', 'Suitsupääsuke', 'Kotkas', 'Kuldnokk'], ans: 1 },
  { q: 'Kui pikk on Eesti rannajoone pikkus (ligikaudu)?',
    opts: ['1 400 km', '2 800 km', '3 800 km', '5 000 km'], ans: 2 },
];

let qIdx = 0;
let qScore = 0;
let answered = false;

function renderQuestion() {
  const q = questions[qIdx];
  document.getElementById('quiz-q').textContent = q.q;
  document.getElementById('quiz-progress-txt').textContent =
    `Küsimus ${qIdx + 1} / ${questions.length}`;
  document.getElementById('quiz-bar').style.width =
    ((qIdx + 1) / questions.length * 100) + '%';
  document.getElementById('quiz-opts').innerHTML = q.opts.map((o, i) =>
    `<button class="quiz-opt" onclick="answer(${i})">${o}</button>`
  ).join('');
  document.getElementById('quiz-feedback').style.display = 'none';
  document.getElementById('quiz-next').style.display = 'none';
  answered = false;
}

function answer(i) {
  if (answered) return;
  answered = true;
  const q = questions[qIdx];
  const btns = document.querySelectorAll('.quiz-opt');
  btns.forEach(b => b.disabled = true);

  if (i === q.ans) {
    btns[i].classList.add('correct');
    qScore++;
    showFeedback(true, 'Õige!');
  } else {
    btns[i].classList.add('wrong');
    btns[q.ans].classList.add('correct');
    showFeedback(false, `Vale! Õige vastus oli: ${q.opts[q.ans]}`);
  }

  document.getElementById('quiz-score').textContent = `Skoor: ${qScore}`;
  const nextBtn = document.getElementById('quiz-next');
  nextBtn.style.display = 'inline-block';
  nextBtn.textContent = qIdx < questions.length - 1 ? 'Järgmine' : 'Näita tulemust';
}

function showFeedback(ok, txt) {
  const el = document.getElementById('quiz-feedback');
  el.className = 'quiz-feedback ' + (ok ? 'ok' : 'err');
  el.textContent = txt;
  el.style.display = 'block';
}

function nextQuestion() {
  qIdx++;
  if (qIdx >= questions.length) {
    document.getElementById('quiz-q').textContent =
      `Viktoriin lõppenud! Sinu tulemus: ${qScore} / ${questions.length}`;
    document.getElementById('quiz-opts').innerHTML = '';
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-next').style.display = 'none';
    document.getElementById('quiz-bar').style.width = '100%';

    const restart = document.createElement('button');
    restart.className = 'btn btn-primary';
    restart.style.marginTop = '1rem';
    restart.textContent = 'Alusta uuesti';
    restart.addEventListener('click', () => {
      qIdx = 0; qScore = 0;
      restart.remove();
      document.getElementById('quiz-score').textContent = 'Skoor: 0';
      renderQuestion();
    });
    document.querySelector('#quiz .card').appendChild(restart);
  } else {
    renderQuestion();
  }
}

// Sündmuste kuulaja
document.getElementById('quiz-next').addEventListener('click', nextQuestion);

// Alglaadimine
renderQuestion();
