// ================================
// COPY BUTTON (Clipboard API)
// ================================
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("copy-btn")) {
    const index = event.target.dataset.index;

    const entries = JSON.parse(localStorage.getItem("lj_saved_entries")) || [];
    const selectedText = entries[index].text;

    navigator.clipboard.writeText(selectedText)
      .then(() => alert("Entry copied to clipboard!"))
      .catch(() => alert("Failed to copy text."));
  }
});


// ================================
// NOTIFICATION API
// ================================

// Request permission on page load
document.addEventListener("DOMContentLoaded", () => {
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }
});

// Custom function to show notification
function showSaveNotification() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification("Learning Journal", {
      body: "Your journal entry was saved!",
      icon: "images/icon.png" // optional if you have an icon
    });
  }
}

// Listen for custom event from storage.js
document.addEventListener("entrySaved", () => {
  showSaveNotification();
});
