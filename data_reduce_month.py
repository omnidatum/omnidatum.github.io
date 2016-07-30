import csv
import sys
import json

spamreader = csv.reader(sys.stdin, delimiter=',', quoting=csv.QUOTE_NONE)
a=[]
result=0
for row in spamreader:
#	reduce(row, lambda x: x[4])
    #print row[4]

    a.append(row)
    pass
from pprint import pprint
a=a[1:len(a)-1]

sliding_shit=''
res=[]

for i in a:
	k = i[0].split(' ')[0]
	if k!= sliding_shit:
		sliding_shit=k
		res.append(0)

	res[len(res)-1]+=float(i[3])

res = map(lambda x: round(x*100)/100.0, res)
res = map(lambda x: x*30*24/1000, res)
print json.dumps(res)

#for line in sys.stdin:
#    print ', '.join(row)