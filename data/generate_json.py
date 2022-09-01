import csv
import json
import difflib

maps = {}

# create maplist
with open('data/maps.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        mapname = row[0].removesuffix("_go").removesuffix(
            "_csgo").removesuffix("_fix")
        maps[mapname] = {
            "name": mapname,
            "goname": row[0],
            "tier": row[1],
            "mapper": row[2],
            "wr": {},
            "howto": ""
        }

# add how to
with open(f'data/howto.json', 'r') as f:
    data = json.load(f)
    for key in data.keys():
        maps[key]["howto"] = data[key]


# add yt wrs
for i in range(17):
    with open(f'data/yt/data{i}.json', 'r') as f:
        data = json.load(f)
        videos = data['items']
        for video in videos:
            title = video['snippet']['title'].split(' ')
            if len(title) == 5 and title[1] == 'WR.':
                mapname = title[0]
                player = title[-1].removesuffix(".")
                video_id = video['snippet']['resourceId']['videoId']
                desc = video['snippet']['description']
                if 'Server: [KSF' in desc:
                    last = desc.find('Server: [KSF')
                else:
                    last = desc.rfind('surf.ksfclan.com')
                text = desc[desc.find('[Surf Timer]'):last]

                mapkey = difflib.get_close_matches(mapname, maps.keys())[0]

                if maps[mapkey]["wr"] == {}:
                    maps[mapkey]["wr"] = {
                        "player": player,
                        "video_id": video_id,
                        "info": text
                    }


with open(f'data/maps.json', 'w') as f:
    json.dump(maps, f)
