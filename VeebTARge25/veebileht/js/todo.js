// Võti, mille nime all salvestame andmed brauseri localStorage-sse
const TODO_KEY = 'todo-items';

// Funktsioon, mis salvestab ülesanded localStorage-sse
function saveTodos() {
  // Muudab todos massiivi tekstiks (JSON) ja salvestab
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

// Funktsioon, mis laeb ülesanded localStorage-st
function loadTodos() {
  try {
    const saved = localStorage.getItem(TODO_KEY); // võtab salvestatud andmed

    // Kui midagi oli salvestatud → muudab tagasi massiiviks
    // Kui ei olnud → tagastab tühja massiivi
    return saved ? JSON.parse(saved) : [];

  } catch {
    // Kui tekib viga (nt katkine JSON), tagastab tühja massiivi
    return [];
  }
}

// Laeb ülesanded alguses
let todos = loadTodos();

// Funktsioon uue ülesande lisamiseks
function addTodo() {
  const inp = document.getElementById('todo-input'); // input väli
  const val = inp.value.trim(); // eemaldab tühikud algusest/lõpust

  // Kui input on tühi → ei tee midagi
  if (!val) return;

  // Lisab uue ülesande massiivi
  todos.push({
    id: Date.now(), // unikaalne ID (praegune aeg)
    text: val,      // ülesande tekst
    done: false     // kas tehtud või mitte
  });

  inp.value = ''; // teeb inputi tühjaks

  saveTodos();    // salvestab
  renderTodos();  // uuendab ekraani
}

// Funktsioon ülesande tehtuks/mitte tehtuks märkimiseks
function toggleTodo(id) {
  const t = todos.find(t => t.id === id); // leiab õige ülesande

  if (t) t.done = !t.done; // muudab staatust (true/false)

  saveTodos();
  renderTodos();
}

// Funktsioon ülesande kustutamiseks
function delTodo(id) {
  // Jätab alles kõik peale selle, mille id klapib
  todos = todos.filter(t => t.id !== id);

  saveTodos();
  renderTodos();
}

// Funktsioon kõigi tehtud ülesannete eemaldamiseks
function clearDone() {
  // Jätab alles ainult need, mis pole tehtud
  todos = todos.filter(t => !t.done);

  saveTodos();
  renderTodos();
}

// Funktsioon, mis joonistab kõik ülesanded ekraanile
function renderTodos() {
  const el = document.getElementById('todo-list'); // koht, kuhu list läheb

  // Kui ühtegi ülesannet pole
  if (!todos.length) {
    el.innerHTML = '<div class="empty">Ülesanded puuduvad. Lisa esimene!</div>';
  } else {

    // Loob iga ülesande jaoks HTML-i
    el.innerHTML = todos.map(t => `
      <div class="todo-item ${t.done ? 'done' : ''}">
        <!-- checkbox, mis märgib tehtuks -->
        <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTodo(${t.id})">

        <!-- ülesande tekst -->
        <span class="todo-text">${t.text}</span>

        <!-- kustutamise nupp -->
        <button class="todo-del" onclick="delTodo(${t.id})">×</button>
      </div>
    `).join('');
  }

  // Loendab mitu on tehtud
  const done = todos.filter(t => t.done).length;

  // Kuvab kokkuvõtte (nt "5 ülesannet · 2 tehtud")
  document.getElementById('todo-count').textContent =
    `${todos.length} ülesannet · ${done} tehtud`;
}

// Nupp "Lisa" → lisab ülesande
document.getElementById('todo-add-btn').addEventListener('click', addTodo);

// Kui vajutad Enter inputis → lisab ülesande
document.getElementById('todo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

// Nupp "Kustuta tehtud" → eemaldab tehtud ülesanded
document.getElementById('todo-clear-btn').addEventListener('click', clearDone);

// Kui leht laeb → joonista ülesanded
renderTodos();