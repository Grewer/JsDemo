<?php
header('Content-type: text/plain; charset=utf-8');
$files = $_FILES['theFile'];
$fileName = $_REQUEST['fileName'];
$totalSize = $_REQUEST['totalSize'];
$isLastChunk = $_REQUEST['isLastChunk'];
$isFirstUpload = $_REQUEST['isFirstUpload'];

if ($_FILES['theFile']['error'] > 0) {
	$status = 500;
}
// 如果第一次上传的时候，该文件已经存在，则删除文件重新上传
if ($isFirstUpload == '1' && file_exists('files/'. $fileName) && filesize('files/'. $fileName) == $totalSize) {
	unlink('files/'. $fileName);
}

if (!file_put_contents('files/'. $fileName, file_get_contents($_FILES['theFile']['tmp_name']), FILE_APPEND)) {
	$status = 501;
} else {
// 在上传的最后片段时，检测文件是否完整（大小是否一致）
	if ($isLastChunk === '1') {
		if (filesize('files/'. $fileName) == $totalSize) {
			$status = 200;
		} else {
			$status = 502;
		}
	} else {
		$status = 200;
	}
}

echo json_encode(array(
	'status' => $status,
	'totalSize' => filesize('files/'. $fileName),
	'isLastChunk' => $isLastChunk
));