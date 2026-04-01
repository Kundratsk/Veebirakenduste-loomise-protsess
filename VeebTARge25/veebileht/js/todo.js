// todo.js — ülesannete loendi loogika

const TODO_KEY = 'todo-items';

function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function loadTodos() {
  try {
    const saved = localStorage.getItem(TODO_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

let todos = loadTodos();

function addTodo() {
  const inp = document.getElementById('todo-input');
  const val = inp.value.trim();
  if (!val) return;
  todos.push({ id: Date.now(), text: val, done: false });
  inp.value = '';
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  const t = todos.find(t => t.id === id);
  if (t) t.done = !t.done;
  saveTodos();
  renderTodos();
}

function delTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

function clearDone() {
  todos = todos.filter(t => !t.done);
  saveTodos();
  renderTodos();
}

function renderTodos() {
  const el = document.getElementById('todo-list');
  if (!todos.length) {
    el.innerHTML = '<div class="empty">Ülesanded puuduvad. Lisa esimene!</div>';
  } else {
    el.innerHTML = todos.map(t => `
      <div class="todo-item ${t.done ? 'done' : ''}">
        <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTodo(${t.id})">
        <span class="todo-text">${t.text}</span>
        <button class="todo-del" onclick="delTodo(${t.id})">×</button>
      </div>
    `).join('');
  }
  const done = todos.filter(t => t.done).length;
  document.getElementById('todo-count').textContent =
    `${todos.length} ülesannet · ${done} tehtud`;
}

// Sündmuste kuulajad
document.getElementById('todo-add-btn').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});
document.getElementById('todo-clear-btn').addEventListener('click', clearDone);

// Alglaadimine
renderTodos();
