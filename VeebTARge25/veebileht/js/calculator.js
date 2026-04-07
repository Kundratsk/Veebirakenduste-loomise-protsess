// calculator.js — kalkulaatori loogika

let cNum = '0';      // Praegu ekraanil kuvatav number (string-kujul)
let cOp = null;      // Aktiivne tehtemärk (+, -, *, /) või null kui pole valitud
let cPrev = null;    // Eelmine number enne tehtemärgi vajutamist
let cReset = false;  // Kui true, siis järgmine number alustab uut sisestust (ei jätka eelmist)

const displayNum = document.getElementById('calc-num');    // Viide HTML elemendile, kus kuvatakse põhinumber
const displayExpr = document.getElementById('calc-expr');  // Viide HTML elemendile, kus kuvatakse avaldis (nt "5 +")

function updCalc() {
  const val = parseFloat(cNum);          // Teisendab stringi ujukomaarvuks
  displayNum.textContent = isNaN(val)    // Kui teisendamine ebaõnnestus (nt "Viga")...
    ? cNum                               // ...kuva string sellisena nagu on
    : val.toLocaleString('et', { maximumFractionDigits: 8 }); // ...muidu kuva eesti formaadis, max 8 kohta peale koma
}

function calcNum(d) {                              // Käivitatakse numbrinupu vajutamisel, d = vajutatud number
  if (cReset) { cNum = d; cReset = false; }        // Kui peaks alustama uut sisestust, asenda kogu number
  else cNum = cNum === '0' ? d : cNum + d;         // Muidu: kui ekraanil on "0", asenda see; muidu lisa number lõppu
  updCalc();                                       // Uuenda ekraan
}

function calcDot() {                               // Käivitatakse koma-nupu vajutamisel
  if (cReset) { cNum = '0.'; cReset = false; }     // Kui peaks alustama uut sisestust, alusta "0." kujul
  else if (!cNum.includes('.')) cNum += '.';        // Muidu lisa koma, aga ainult kui seda pole veel
  updCalc();                                       // Uuenda ekraan
}

function calcClear() {
  cNum = '0'; cOp = null; cPrev = null; cReset = false; // Lähtesta kõik muutujad algolekusse
  displayExpr.textContent = '';                          // Tühjenda avaldise ekraan
  updCalc();                                             // Uuenda põhinumbri ekraan
}

function calcSign() {
  cNum = String(-parseFloat(cNum)); // Muuda numbri märki (positiivne → negatiivne ja vastupidi)
  updCalc();                        // Uuenda ekraan
}

function calcPercent() {
  cNum = String(parseFloat(cNum) / 100); // Jaga arv 100-ga (nt 75 → 0.75)
  updCalc();                             // Uuenda ekraan
}

function calcOp(op) {                                            // Käivitatakse tehtemärgi (+ - * /) vajutamisel
  if (cOp && !cReset) calcEquals(true);                         // Kui tehtemärk on juba valitud ja kasutaja sisestas uue arvu, arvuta vahetulemus enne
  cPrev = parseFloat(cNum);                                     // Salvesta praegune number eelmiseks
  cOp = op;                                                     // Salvesta valitud tehtemärk
  cReset = true;                                                // Järgmine number alustab uut sisestust
  const sym = { '+': '+', '-': '−', '*': '×', '/': '÷' }[op]; // Teisenda tehtemärk kuvamiseks sobivaks sümboliks
  displayExpr.textContent = cPrev + ' ' + sym;                 // Näita avaldiseriibal nt "5 +"
}

function calcEquals(chain = false) {          // Arvutab tulemuse; chain=true tähendab, et kutsuti seest (mitte kasutajalt)
  if (!cOp || cPrev === null) return;         // Kui tehtemärki või eelmist arvu pole, ära tee midagi

  const a = cPrev;                            // Esimene arv
  const b = parseFloat(cNum);                 // Teine arv (praegune ekraaniväärtus)
  let r;                                      // Tulemus

  if (cOp === '+') r = a + b;                 // Liitmine
  else if (cOp === '-') r = a - b;            // Lahutamine
  else if (cOp === '*') r = a * b;            // Korrutamine
  else if (cOp === '/') r = b === 0 ? 'Viga' : a / b; // Jagamine — kui jagaja on 0, kuva "Viga"

  if (!chain) displayExpr.textContent = '';   // Kui kasutaja vajutas "=", tühjenda avaldiseriba
  cNum = r === 'Viga' ? 'Viga' : String(parseFloat(r.toFixed(10))); // Salvesta tulemus, ümarda 10 kohani (vältimaks ujukomavigasid)
  cOp = null; cPrev = null; cReset = true;    // Lähtesta tehtemärk ja eelmine arv, järgmine sisestus alustab uut
  updCalc();                                  // Uuenda ekraan
}

// Sündmuste kuulajad kalkulaatori nuppudele
document.querySelectorAll('.calc-btn').forEach(btn => {       // Leia kõik kalkulaatori nupud ja käi läbi
  btn.addEventListener('click', () => {                       // Lisa igale nupule klikisündmuse kuulaja
    if (btn.dataset.digit !== undefined) calcNum(btn.dataset.digit);   // Numbrinupp — edasta vajutatud number
    else if (btn.dataset.op)            calcOp(btn.dataset.op);        // Tehtemärginupp — edasta tehtemärk
    else if (btn.dataset.action === 'clear')   calcClear();            // "C" nupp — lähtesta kalkulaator
    else if (btn.dataset.action === 'sign')    calcSign();             // "+/-" nupp — vaheta märk
    else if (btn.dataset.action === 'percent') calcPercent();          // "%" nupp — teisenda protsendiks
    else if (btn.dataset.action === 'dot')     calcDot();              // "." nupp — lisa koma
    else if (btn.dataset.action === 'equals')  calcEquals();           // "=" nupp — arvuta tulemus
  });
});