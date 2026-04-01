function calculatePrice() {
    const start = new Date(document.getElementById("start").value);
    const end = new Date(document.getElementById("end").value);
    const setup = document.getElementById("setup").checked;
  
    if (!start || !end || end < start) return;
  
    const days = Math.ceil((end - start) / (1000*60*60*24)) + 1;
  
    let price = 150;
    if (days > 1) {
      price += (days - 1) * 20;
    }
  
    if (setup) price += 50;
  
    document.getElementById("price").innerText = "Hind: " + price + "€";
  }
  
  document.getElementById("start").addEventListener("change", calculatePrice);
  document.getElementById("end").addEventListener("change", calculatePrice);
  document.getElementById("setup").addEventListener("change", calculatePrice);
  
  function sendForm() {
    alert("Päring saadetud! (siia saab hiljem panna emaili saatmise)");
    return false;
  }