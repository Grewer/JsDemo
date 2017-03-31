<?php

$file = $_REQUEST['file'];
if(!empty($file)){

	$FileType = 'png';
	$upPath = './img';

	if (preg_match('/(?<=\/)[^\/]+(?=\;)/',$file,$pregR)) $FileType ='.' .$pregR[0];  



	$FileRand = date('YmdHis').rand(1000,9999); //文件名

	//可在这进行数据库操作


	$Filename = $upPath."/".$FileRand .$FileType;

	preg_match('/(?<=base64,)[\S|\s]+/',$file,$ForW);

	
	if (file_put_contents($Filename,base64_decode($ForW[0]))){
	  $data = '{"status":"1"}';
	  echo $data;
	}else{
	  $data = '{"status":"0"}';
	  echo $data;
	}
}

