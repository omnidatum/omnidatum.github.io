url = 'https://maps.googleapis.com/maps/api/geocode/json?components=country:NZ&address='

import urllib
from subprocess import call
import sys
def exec_cmd(cmd):
    return subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE).stdout.read()


s = sys.argv[1]
street= urllib.quote(s.encode("utf-8"))
import os
import subprocess

result= exec_cmd("curl " +url+street)#.read()
#print result
#print result
import json
json_data = json.loads(result)
from pprint import pprint
our_entry=None
# print(len(json_data['results']))
# print(json_data)

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
#pprint(our_entry)
#url="http://solarview.niwa.co.nz/createImage?latitude=%f&longitude=%f&azimuth_angle=&zenith_angle=&image_title=Address+unknown" % (cords['lat'],cords['lng'])

url ="curl -H 'Accept:application/json, text/javascript, */*; q=0.01' -H 'X-Requested-With:XMLHttpRequest' \
   -H 'Cookie:symfony=aln3805nu7f2jd478akurcgr1gslu2g4m0n3o6cp5r8bf9v5q6f0; _gat=1; _ga=GA1.3.1556352652.1469782649' \
   'http://solarview.niwa.co.nz/createImage?latitude=%f&longitude=%f&azimuth_angle=&zenith_angle=&image_title=Address+unknown'" % (cords['lat'], cords['lng'])

#print url
try:

	result = exec_cmd(url)
	json_data = json.loads(result)
except Exception, e:
	print "AUTH expired"
	sys.exit()


print json_data['mhrTable']
