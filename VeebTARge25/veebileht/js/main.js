// main.js — vahekaartide loogika

document.querySelectorAll('.tab').forEach(tab => {  // Leia kõik tab-nupud lehelt ja käi läbi ükshaaval
  tab.addEventListener('click', () => {             // Lisa igale tab-nupule klikisündmuse kuulaja
    const target = tab.dataset.tab;                 // Loe nupu data-tab atribuut — see on sihitava paneeli id (nt "calc", "todo")

    // Eemalda kõigilt paneeliltelt ja tabidelt aktiivne klass
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active')); // Peida kõik paneelid — eemalda igalt "active" klass
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));   // Tühista kõigi tab-nuppude aktiivne olek

    // Lisa aktiivne klass valitud tabile ja paneelile
    tab.classList.add('active');                            // Märgi klikitud tab aktiivseks (muudab välimust CSS kaudu)
    document.getElementById(target).classList.add('active'); // Leia vastav paneel id järgi ja tee see nähtavaks
  });
});