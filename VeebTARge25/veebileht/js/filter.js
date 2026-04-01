// filter.js — filtriga nimekirja loogika

const FILTER_KEY = 'filter-items';

const DEFAULT_ITEMS = [
  { id: 1,  name: 'Koosolek meeskonnaga',         tag: 'töö' },
  { id: 2,  name: 'Jooksutreening pargis',         tag: 'sport' },
  { id: 3,  name: 'Loe raamatut "Tõde ja õigus"', tag: 'õpe' },
  { id: 4,  name: 'Helista vanematele',            tag: 'isiklik' },
  { id: 5,  name: 'Aruande koostamine',            tag: 'töö' },
  { id: 6,  name: 'Ujumine bassein',               tag: 'sport' },
  { id: 7,  name: 'JavaScript kursus',             tag: 'õpe' },
  { id: 8,  name: 'Hambaravi visiit',              tag: 'isiklik' },
  { id: 9,  name: 'Projekti esitlus',              tag: 'töö' },
  { id: 10, name: 'Jalgpallitreening',             tag: 'sport' },
  { id: 11, name: 'Matemaatika kordamine',         tag: 'õpe' },
  { id: 12, name: 'Poe külastus',                  tag: 'isiklik' },
];

function loadItems() {
  try {
    const saved = localStorage.getItem(FILTER_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_ITEMS;
  } catch {
    return DEFAULT_ITEMS;
  }
}

function saveItems() {
  localStorage.setItem(FILTER_KEY, JSON.stringify(items));
}

let items = loadItems();

function addItem() {
  const nameEl = document.getElementById('new-item');
  const tagEl  = document.getElementById('new-tag');
  const name   = nameEl.value.trim();
  if (!name) return;
  items.push({ id: Date.now(), name, tag: tagEl.value });
  nameEl.value = '';
  saveItems();
  renderList();
}

function delItem(id) {
  items = items.filter(i => i.id !== id);
  saveItems();
  renderList();
}

function resetItems() {
  if (confirm('Lähtesta nimekiri vaikeväärtustele?')) {
    items = JSON.parse(JSON.stringify(DEFAULT_ITEMS));
    saveItems();
    renderList();
  }
}

function renderList() {
  const s = document.getElementById('f-search').value.toLowerCase();
  const t = document.getElementById('f-tag').value;

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(s) && (!t || i.tag === t)
  );

  const el = document.getElementById('f-list');
  if (!filtered.length) {
    el.innerHTML = '<div class="empty">Ühtegi tulemust ei leitud.</div>';
  } else {
    el.innerHTML = filtered.map(i => `
      <div class="list-item">
        <span class="list-name">${i.name}</span>
        <div class="list-right">
          <span class="list-tag tag-${i.tag}">${i.tag}</span>
          <button class="list-del" onclick="delItem(${i.id})">×</button>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('f-count').textContent =
    `${filtered.length} / ${items.length} tulemust`;
}

// Sündmuste kuulajad
document.getElementById('item-add-btn').addEventListener('click', addItem);
document.getElementById('new-item').addEventListener('keydown', e => {
  if (e.key === 'Enter') addItem();
});
document.getElementById('f-search').addEventListener('input', renderList);
document.getElementById('f-tag').addEventListener('change', renderList);
document.getElementById('reset-btn').addEventListener('click', resetItems);

// Alglaadimine
renderList();
