import csv
import pathlib

with open('data/maps.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        text = f"""
# {row[0]}

![{row[0]}](https://raw.githubusercontent.com/Sayt123/SurfMapPics/Maps-and-bonuses/csgo/{row[0]}.jpg)

> Author: **{row[2]}**
>
> Tier {row[1]}

## Records

[surfheaven](https://surfheaven.eu/map/{row[0]})
"""
        pathlib.Path(f'data/maps/t{row[1]}').mkdir(parents=True, exist_ok=True)
        with open(f'data/maps/t{row[1]}/{row[0]}.mdx', 'w') as f:
            f.write(text)
