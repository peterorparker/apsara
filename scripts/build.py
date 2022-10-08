from pathlib import Path
import os
import json

root_dir = Path("./public/celebs")
max_level = 2


def get_files(path, level=1):
    if level == max_level:
        return {
            x.name: [str(y.relative_to(root_dir.parent)) for y in x.rglob("*")]
            for x in path.glob("*/")
            if x.is_dir() and x.name.lower() != "_blank"
        }
    return {x.name: get_files(x, level + 1) for x in path.glob("*/") if x.is_dir()}


def get_counts(file_map):
    counts = {}
    sort = False
    for k, v in file_map.items():
        if isinstance(v, dict):
            counts[k] = get_counts(v)
        else:
            counts[k] = len(v)
            sort = True
    if sort:
        return {k: counts[k] for k in sorted(counts, key=counts.get, reverse=True)}
    else:
        return counts


files = get_files(root_dir)
counts = get_counts(files)
data = {
    "counts": counts,
    "files": files,
}
with Path("./src/data/celebs.json").open("w") as f:
    f.write(json.dumps(data, indent=2))
