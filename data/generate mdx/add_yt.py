import csv
import json
import difflib


def csv2json(write=False):
    maps = {}

    with open('data/maps.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            maps[row[0]] = row[1]
    if write:
        with open(f'data/maps.json', 'w') as f:
            json.dump(maps, f)

    return maps


# csv2json(write=True)

maps = csv2json()

done = []

for i in range(17):
    with open(f'data/yt/data{i}.json', 'r') as f:
        data = json.load(f)
        videos = data['items']
        for video in videos:
            title = video['snippet']['title'].split(' ')
            if len(title) == 5 and title[1] == 'WR.':
                mapname = title[0]
                player = title[-1]
                video_id = video['snippet']['resourceId']['videoId']
                desc = video['snippet']['description']
                if 'Server: [KSF' in desc:
                    last = desc.find('Server: [KSF')
                else:
                    last = desc.rfind('surf.ksfclan.com')
                text = desc[desc.find('[Surf Timer]'):last]

                mapkey = difflib.get_close_matches(mapname, maps)[0]

                added = f"""
## WR

> Surfed by {player}

<iframe
width="100%"
height="430"
src="https://www.youtube.com/embed/{video_id}"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen
/>

```md

{text}
```
                """

                if mapkey not in done:
                    with open(f'data/maps/t{maps[mapkey]}/{mapkey}.mdx', 'a') as f:
                        f.write(added)

                    done.append(mapkey)
