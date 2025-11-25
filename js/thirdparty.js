document.addEventListener("DOMContentLoaded", () => {
  const quoteBox = document.getElementById("quote-text");
  if (!quoteBox) return; // Only run on index.html

  fetch("https://zenquotes.io/api/random")
    .then(response => response.json())
    .then(data => {
      quoteBox.textContent = `"${data[0].q}" — ${data[0].a}`;
    })
    .catch(() => {
      quoteBox.textContent = "Could not load quote at this time.";
    });
});
