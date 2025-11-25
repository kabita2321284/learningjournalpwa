document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "lj_saved_entries";

  const form = document.getElementById("journal-form");
  const titleInput = document.getElementById("entry-title");
  const textInput = document.getElementById("entry-text");
  const savedEntriesContainer = document.getElementById("saved-entries");

  // Load saved entries
  let entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // RENDER ENTRIES
  function renderEntries() {
    savedEntriesContainer.innerHTML = "";

    entries.forEach((entry, index) => {
      const article = document.createElement("article");
      article.classList.add("collapsible");

      article.innerHTML = `
        <h3>${entry.title}</h3>
        <div class="content-box">
          <p>${entry.text}</p>

          <button class="copy-btn" data-index="${index}">Copy Text</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      `;

      savedEntriesContainer.appendChild(article);
    });

    // Re-apply collapsible functionality
    activateCollapsible();
  }

  // SUBMIT FORM
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newEntry = {
      title: titleInput.value,
      text: textInput.value,
    };

    entries.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

    titleInput.value = "";
    textInput.value = "";

    renderEntries();

    // Trigger notification event
    document.dispatchEvent(new Event("entrySaved"));
  });

  // DELETE ENTRY
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const deleteIndex = e.target.dataset.index;

      entries.splice(deleteIndex, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

      renderEntries();
    }
  });

  // Initial render
  renderEntries();
});
