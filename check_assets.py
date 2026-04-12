import os
import re

def check_file(path):
    local_path = path.lstrip('/')
    exists = os.path.exists(local_path)
    return exists, local_path

with open('content/content-segments-data.js', 'r') as f:
    content = f.read()

# Match paths starting with /assets/ or /content/assets/
paths = re.findall(r'["\']((?:/content)?/assets/.*?\.(?:png|jpg|jpeg|mp4|svg))["\']', content)

missing = []
present = []

for path in paths:
    exists, local_path = check_file(path)
    if exists:
        present.append(path)
    else:
        missing.append(path)

print("--- PRESENT ASSETS ---")
for p in sorted(list(set(present))):
    print(f"[OK] {p}")

print("\n--- MISSING ASSETS ---")
for m in sorted(list(set(missing))):
    print(f"[MISSING] {m}")
