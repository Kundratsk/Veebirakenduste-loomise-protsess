// main.js — vahekaartide loogika

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Eemalda kõigilt paneeliltelt ja tabidelt aktiivne klass
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    // Lisa aktiivne klass valitud tabile ja paneelile
    tab.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});
