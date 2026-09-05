import requests
import sys

username = sys.argv[1]
res = requests.get(f"https://www.hackerearth.com/users/page/{username}/", headers={'User-Agent': 'Mozilla/5.0'})
print(res.status_code)
# Is there a known hackerearth endpoint? Let's check hacker earth api docs or common patterns.
