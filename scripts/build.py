from pathlib import Path
import os
import json

root_dir = Path("./public/celebs")
files = {}
for sub_dir in os.scandir(root_dir):
    if sub_dir.is_dir():
        files[sub_dir.name] = [
            str(file.relative_to(root_dir.parent)) for file in Path(sub_dir).rglob("*")
        ]

counts = {k: len(v) for k, v in files.items()}
counts = {k: counts[k] for k in sorted(counts, key=counts.get, reverse=True)}
data = {
    "counts": counts,
    "files": files,
}
with Path("./src/data/celebs.json").open("w") as f:
    f.write(json.dumps(data, indent=2))
