url = 'https://maps.googleapis.com/maps/api/geocode/json?address=%s&components=country:NZ&key=AIzaSyBKWnoHqStGul53NQJpbQbkCDF1PPkf3-I'

import urllib
from subprocess import call
import sys
import csv

def distance(p1,p2):
	return math.sqrt(math.pow(p2[0]-p1[0], 2) + math.pow(p2[1]-p1[1], 2))

def exec_cmd(cmd):
    return subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE).stdout.read()




s = sys.argv[1]
street= urllib.quote(s.encode("utf-8"))
import os
import subprocess

result= exec_cmd("curl " +(url % street))#.read()
#print result
#print result
import json
json_data = json.loads(result)
from pprint import pprint
our_entry=None

with open('auth_token', 'r') as myfile:
	token = myfile.read().strip()

# print(len(json_data['results']))
#pprint(json_data)

for x in json_data['results']:
	good_shit = False # good shit

	for k in x['address_components']:
		#pprint(k)
		if 'country' in k['types'] and k['short_name'] == 'NZ':
			good_shit = True
			break

	if good_shit:
		#print 'wtf	'
		our_entry=x
		break


	pass
if our_entry is None:
	print 'not found'
	sys.exit()

cords = our_entry['geometry']['location']
res = []

if len(sys.argv)>2 and sys.argv[2] == 'sunshine':
	import csv
	from operator import itemgetter, attrgetter, methodcaller
	import math
	with open('sunshine-weather-locations.csv', 'rb') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',', quoting=csv.QUOTE_NONE)

		for row in spamreader:
			if row[0]=='Station':
				continue

			res.append((
				distance((float(row[2]), float(row[3])), (float(cords['lat']), float(cords['lng']))),
				row[1]))
		
		res = sorted(res, key=itemgetter(0))
		print res[0][1]
		#print cords
	sys.exit()

#pprint(our_entry)
#url="http://solarview.niwa.co.nz/createImage?latitude=%f&longitude=%f&azimuth_angle=&zenith_angle=&image_title=Address+unknown" % (cords['lat'],cords['lng'])

url ="curl -H 'Accept:application/json, text/javascript, */*; q=0.01' -H 'X-Requested-With:XMLHttpRequest' \
   -H 'Cookie:%s; _gat=1; _ga=GA1.3.1556352652.1469782649' \
   'http://solarview.niwa.co.nz/createImage?latitude=%f&longitude=%f&azimuth_angle=&zenith_angle=&image_title=Address+unknown'" % (token,cords['lat'], cords['lng'])

#print url
try:

	result = exec_cmd(url)
	json_data = json.loads(result)
except Exception, e:
	print "AUTH expired"
	sys.exit()


print json_data['mhrTable']
