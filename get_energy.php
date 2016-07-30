<?php


$period = $_REQUEST['period'];
$address = $_REQUEST['address'];
$PWD = __DIR__;

$address = escapeshellcmd($address);

if ($period == 'month') {
	echo shell_exec("python $PWD/get_csv.py '" .$address. "'| xargs curl -s | python $PWD/data_reduce_month.py");
} else if ($period == 'year') {
	echo shell_exec("python $PWD/get_csv.py '" .$address. "'| xargs curl -s | python $PWD/data_reduce.py");
} else {
	echo json_encode(['error' => 'wrong period']);
}
