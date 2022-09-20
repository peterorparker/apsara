import json
import random

with open("./src/data/celebs.json") as f:
    data = json.load(f)

selection = random.choices(list(data["counts"].keys()), k=9)
print(selection)
