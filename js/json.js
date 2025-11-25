document.addEventListener("DOMContentLoaded", () => {
  const reflectionsContainer = document.getElementById("python-reflections");
  const countSpan = document.getElementById("reflection-count");
  const filterInput = document.getElementById("reflection-filter");

  if (!reflectionsContainer) return; // Only run on journal.html

  let reflections = [];

  // Render reflections to the page
  function renderReflections(filter = "") {
    reflectionsContainer.innerHTML = "";

    const filtered = reflections.filter(entry =>
      entry.text.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(entry => {
      const div = document.createElement("div");
      div.classList.add("reflection-box");

      div.innerHTML = `
        <p><strong>${entry.date}</strong></p>
        <p>${entry.text}</p>
        <hr>
      `;

      reflectionsContainer.appendChild(div);
    });

    countSpan.textContent = filtered.length;
  }

  // Fetch reflections.json
  fetch("../backend/reflections.json")
    .then(res => res.json())
    .then(data => {
      reflections = data;
      renderReflections();
    })
    .catch(err => {
      reflectionsContainer.textContent = "Error loading reflections.";
      console.error("JSON fetch error:", err);
    });

  // Filter reflections by keyword
  filterInput.addEventListener("input", e => {
    const value = e.target.value;
    renderReflections(value);
  });
});
