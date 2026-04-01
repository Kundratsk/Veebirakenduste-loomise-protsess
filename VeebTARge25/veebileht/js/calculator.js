// calculator.js — kalkulaatori loogika

let cNum = '0';
let cOp = null;
let cPrev = null;
let cReset = false;

const displayNum = document.getElementById('calc-num');
const displayExpr = document.getElementById('calc-expr');

function updCalc() {
  const val = parseFloat(cNum);
  displayNum.textContent = isNaN(val)
    ? cNum
    : val.toLocaleString('et', { maximumFractionDigits: 8 });
}

function calcNum(d) {
  if (cReset) { cNum = d; cReset = false; }
  else cNum = cNum === '0' ? d : cNum + d;
  updCalc();
}

function calcDot() {
  if (cReset) { cNum = '0.'; cReset = false; }
  else if (!cNum.includes('.')) cNum += '.';
  updCalc();
}

function calcClear() {
  cNum = '0'; cOp = null; cPrev = null; cReset = false;
  displayExpr.textContent = '';
  updCalc();
}

function calcSign() {
  cNum = String(-parseFloat(cNum));
  updCalc();
}

function calcPercent() {
  cNum = String(parseFloat(cNum) / 100);
  updCalc();
}

function calcOp(op) {
  if (cOp && !cReset) calcEquals(true);
  cPrev = parseFloat(cNum);
  cOp = op;
  cReset = true;
  const sym = { '+': '+', '-': '−', '*': '×', '/': '÷' }[op];
  displayExpr.textContent = cPrev + ' ' + sym;
}

function calcEquals(chain = false) {
  if (!cOp || cPrev === null) return;
  const a = cPrev;
  const b = parseFloat(cNum);
  let r;
  if (cOp === '+') r = a + b;
  else if (cOp === '-') r = a - b;
  else if (cOp === '*') r = a * b;
  else if (cOp === '/') r = b === 0 ? 'Viga' : a / b;

  if (!chain) displayExpr.textContent = '';
  cNum = r === 'Viga' ? 'Viga' : String(parseFloat(r.toFixed(10)));
  cOp = null; cPrev = null; cReset = true;
  updCalc();
}

// Sündmuste kuulajad kalkulaatori nuppudele
document.querySelectorAll('.calc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.digit !== undefined) calcNum(btn.dataset.digit);
    else if (btn.dataset.op)            calcOp(btn.dataset.op);
    else if (btn.dataset.action === 'clear')   calcClear();
    else if (btn.dataset.action === 'sign')    calcSign();
    else if (btn.dataset.action === 'percent') calcPercent();
    else if (btn.dataset.action === 'dot')     calcDot();
    else if (btn.dataset.action === 'equals')  calcEquals();
  });
});
