
import csv


# tiers

text = ""

for i in range(1, 9):
    text += f'"t{i}": "Tier {i}",\n'

# print(text)

maps = {'1': [], '2': [], '3': [], '4': [], '5': [], '6': [], '7': [], '8': []}

with open('data/maps.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        maps[row[1]].append(row[0])


for key in maps.keys():
    text = "{"
    for mapname in maps[key]:
        text += f'"{mapname}": "{mapname}",'
    text = text[:-1] + "}"
    with open(f'data/maps/t{key}/meta.json', 'w') as f:
        f.write(text)
