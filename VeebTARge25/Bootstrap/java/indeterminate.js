// ühendab html-s oleva id parent const-iks
// ja kõik class-iga vhild-check olevad elemendid childreniks
const parent = document.getElementById("parentCheck");
const children = document.querySelectorAll(".child-check");

//funktsioon, mis kontrollib mitu child-check on checked
//ja vastavalt sellele uudab parent-checki checked ja indeterminate omadusi
function updateParent() {
    // loeme, mitu child-check on checked
    const checked = [...children].filter(c => c.checked).length;

    // === võrdub väärtusega ja tüübiga, == kas kaks muutujat on väärtuselt võrdsed,
    //kuid tüüp võib olla erinev
    // see on lihtsalt omistamine, kus ühele poolele pannakse väärtus
    // ja seejärel see väärtus omistatakse teisele poolele. Nt, let x = 5;
    if (checked === 0) {
        parent.checked = false;
        parent.indeterminate = false;
    } else if (checked === children.length) {
        parent.checked = true;
        parent.indeterminate = false;
    } else {
        parent.checked = false;
        parent.indeterminate = true;
    }
}
// lisa event listenerid kõigile child-check elemnentidele,
//mis kutsuvad updateParent funktsiooni
children.forEach(c => c.addEventListener("change", updateParent));

//lisa event listener parent-check elemendile,
// mis muudab kõigi child-check elementide checked omadust
// vastavalt parent-checki checked omadusele
parent.addEventListener("change", () => {
    children.forEach(c => c.checked = parent.checked);
    parent.indeterminate = false;
});
