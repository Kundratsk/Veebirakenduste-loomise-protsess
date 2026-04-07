// filter.js — filtriga nimekirja loogika

const FILTER_KEY = 'filter-items'; // localStorage'i võti, mille all andmed salvestatakse

const DEFAULT_ITEMS = [                                           // Vaikimisi näidisandmed, mida kasutatakse kui localStorage on tühi
  { id: 1,  name: 'Koosolek meeskonnaga',         tag: 'töö' },  // Iga objekt sisaldab unikaalset id-d, nime ja kategooriasilti
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

function loadItems() {                                    // Laadib salvestatud andmed localStorage'ist
  try {
    const saved = localStorage.getItem(FILTER_KEY);       // Proovib lugeda salvestatud JSON-stringi võtme järgi
    return saved ? JSON.parse(saved) : DEFAULT_ITEMS;     // Kui andmed on olemas, teisenda JSON objektiks; muidu kasuta vaikeväärtusi
  } catch {
    return DEFAULT_ITEMS;                                 // Kui JSON-i lugemisel tekib viga, kasuta vaikeväärtusi
  }
}

function saveItems() {
  localStorage.setItem(FILTER_KEY, JSON.stringify(items)); // Teisenda items-massiiv JSON-stringiks ja salvesta localStorage'isse
}

let items = loadItems(); // Lae andmed kohe lehe avamisel — kas localStorage'ist või vaikeväärtustest

function addItem() {
  const nameEl = document.getElementById('new-item');  // Viide nime sisestusväljale
  const tagEl  = document.getElementById('new-tag');   // Viide kategooria ripploendile
  const name   = nameEl.value.trim();                  // Võta sisestatud nimi, eemalda tühikud algusest ja lõpust
  if (!name) return;                                   // Kui nimi on tühi, ära tee midagi
  items.push({ id: Date.now(), name, tag: tagEl.value }); // Lisa uus element massiivi; id on unikaalne ajatempel millisekundites
  nameEl.value = '';                                   // Tühjenda sisestusväli pärast lisamist
  saveItems();                                         // Salvesta uuendatud nimekiri localStorage'isse
  renderList();                                        // Joonista nimekiri uuesti ekraanile
}

function delItem(id) {
  items = items.filter(i => i.id !== id); // Loo uus massiiv, kust on eemaldatud kustutatud id-ga element
  saveItems();                            // Salvesta muutus localStorage'isse
  renderList();                           // Joonista nimekiri uuesti
}

function resetItems() {
  if (confirm('Lähtesta nimekiri vaikeväärtustele?')) {          // Küsi kasutajalt kinnitust hüpikaknas
    items = JSON.parse(JSON.stringify(DEFAULT_ITEMS));            // Tee sügav koopia vaikeväärtustest (et vältida viidete jagamist)
    saveItems();                                                  // Salvesta vaikeväärtused localStorage'isse
    renderList();                                                 // Joonista nimekiri uuesti
  }
}

function renderList() {
  const s = document.getElementById('f-search').value.toLowerCase(); // Võta otsinguvälja tekst ja muuda väiketäheliseks
  const t = document.getElementById('f-tag').value;                  // Võta valitud kategooria filtrilt (tühi string = kõik)

  const filtered = items.filter(i =>               // Filtreeri elementi vastavalt otsingule ja kategooriale
    i.name.toLowerCase().includes(s) &&            // Nimi peab sisaldama otsinguterminit (suur/väiketähe sõltumatu)
    (!t || i.tag === t)                            // Kategooria peab vastama — kui t on tühi, kuva kõik
  );

  const el = document.getElementById('f-list');   // Viide HTML elemendile, kuhu nimekiri joonistatakse
  if (!filtered.length) {                         // Kui filtreeritud tulemusi pole...
    el.innerHTML = '<div class="empty">Ühtegi tulemust ei leitud.</div>'; // ...kuva tühja oleku teade
  } else {
    el.innerHTML = filtered.map(i => `            
      <div class="list-item">
        <span class="list-name">${i.name}</span>                          <!-- Elemendi nimi -->
        <div class="list-right">
          <span class="list-tag tag-${i.tag}">${i.tag}</span>             <!-- Kategooriasilt, CSS-klass vastab tagile -->
          <button class="list-del" onclick="delItem(${i.id})">×</button>  <!-- Kustutusnutp, edastab id funktsioonile -->
        </div>
      </div>
    `).join('');                                  // Teisenda iga element HTML-stringiks ja ühenda üheks suureks stringiks
  }

  document.getElementById('f-count').textContent =
    `${filtered.length} / ${items.length} tulemust`; // Uuenda loendur: kuvab filtreeritud ja koguhulga (nt "3 / 12 tulemust")
}

// Sündmuste kuulajad
document.getElementById('item-add-btn').addEventListener('click', addItem);        // "Lisa" nupu klikk käivitab addItem
document.getElementById('new-item').addEventListener('keydown', e => {             // Klaviatuuri vajutus nime sisestusväljal
  if (e.key === 'Enter') addItem();                                                // Kui vajutati Enter, lisa element
});
document.getElementById('f-search').addEventListener('input', renderList);         // Otsinguvälja muutus käivitab uuesti filtreerimise
document.getElementById('f-tag').addEventListener('change', renderList);           // Kategooria valik käivitab uuesti filtreerimise
document.getElementById('reset-btn').addEventListener('click', resetItems);        // "Lähtesta" nupu klikk käivitab resetItems

// Alglaadimine
renderList(); // Joonista nimekiri kohe lehe laadimisel esimest korda