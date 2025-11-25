import json
import os
from datetime import datetime

# Path to reflections.json (in same folder)
FILE_PATH = os.path.join(os.path.dirname(__file__), "reflections.json")


def load_reflections():
    """Load existing reflections or return empty list."""
    try:
        with open(FILE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_reflections(reflections):
    """Save reflections back to JSON."""
    with open(FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(reflections, f, indent=2, ensure_ascii=False)


def main():
    print("=== Add a new reflection to reflections.json ===")
    text = input("Write your reflection: ").strip()

    if not text:
        print("No reflection entered. Exiting.")
        return

    reflections = load_reflections()

    new_entry = {
        "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "text": text
    }

    reflections.append(new_entry)
    save_reflections(reflections)

    print("Reflection added successfully!")
    print("Total reflections saved:", len(reflections))


if __name__ == "__main__":
    main()
