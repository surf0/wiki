import requests
import json
import os


API_KEY = os.environ['YT_API']
playlistId = "PLEcNRvIITM7E0l0SN4rx9HDpB472KVNeV"
pageToken = ""
index = 0

while True:

    r = requests.get(
        f"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={playlistId}&maxResults=50&pageToken={pageToken}&key={API_KEY}")

    data = r.json()

    with open(f'data/yt/data{index}.json', 'w') as f:
        json.dump(r.json(), f)

    if "nextPageToken" not in data:
        break

    pageToken = data["nextPageToken"]
    index += 1
