import csv
import sys

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

for i in a:
    result+=float(i[3])
print result*30

#for line in sys.stdin:
#    print ', '.join(row)