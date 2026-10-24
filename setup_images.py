# AV Construction Image Setup Script
# Run this once to copy images into the project's images/ folder

import shutil
import os

# Source images (from AI-generated artifacts)
ARTIFACTS_DIR = r"C:\Users\Bharath AV\.gemini\antigravity-ide\brain\951c0fb0-a3b7-4462-9882-2408d28a3137"
PROJECT_DIR = r"C:\Users\Bharath AV\OneDrive\Documents\ALL Projects\AV Construction & Builders"
IMAGES_DIR = os.path.join(PROJECT_DIR, "images")

# Create images directory
os.makedirs(IMAGES_DIR, exist_ok=True)

# Image mappings: (source_filename, dest_filename)
images = [
    ("luxury_hero_villa_1792861343614.jpg",     "hero_building.jpg"),
    ("luxury_about_building_1792861362936.jpg", "about_building.jpg"),
    ("blueprint_modern_1792861380991.jpg",      "blueprint_architecture.jpg"),
    ("luxury_completed_home_1792861400159.jpg", "why_us_house.jpg"),
]

print("Copying images to project folder...")
for src_name, dest_name in images:
    src  = os.path.join(ARTIFACTS_DIR, src_name)
    dest = os.path.join(IMAGES_DIR, dest_name)
    if os.path.exists(src):
        shutil.copy2(src, dest)
        print(f"  OK: {dest_name}")
    else:
        print(f"  MISSING: {src_name}")

print("\nDone! Open index.html in your browser.")
