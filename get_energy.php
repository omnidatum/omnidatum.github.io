<?php


$period = $_REQUEST['period'];
$address = $_REQUEST['address'];
$sunshine = $_REQUEST['sunshine'];
$PWD = __DIR__;
header('Content-Type: application/json');

$address = escapeshellcmd($address);

if ($period == 'month') {
	echo shell_exec("python $PWD/get_csv.py '" .$address. "' | xargs curl -s | python $PWD/data_reduce_month.py");
} else if ($period == 'year') {
	echo shell_exec("python $PWD/get_csv.py '" .$address. "' | xargs curl -s | python $PWD/data_reduce.py");
}  else if ($sunshine == 1) {
	echo shell_exec("python $PWD/get_csv.py '" .$address. "' sunshine");
} else {
	echo json_encode(['error' => 'wrong period']);
}
