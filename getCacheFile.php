<?php

$file = $_REQUEST['filepath'];

if (file_exists($file)) {
	header('Content-Type: text/html');
	header('Content-Encoding: gzip');
    header('Content-Length: ' . filesize($file));
	ob_clean();
	flush();
    readfile($file);
    exit;
}

?>

