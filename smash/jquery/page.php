<?php
$p = $_GET['p'];
$data = array(
	"total"=>4,
	"current"=>$p,
	"list"=>[
		array(
			"id"=>($p-1)*3+1,
			"name"=>"标题".(($p-1)*3+1),
			"author"=>"作者".(($p-1)*3+1)
		),
		array(
			"id"=>(($p-1)*3+2),
			"name"=>"标题".(($p-1)*3+2),
			"author"=>"作者".(($p-1)*3+2)
		),
		array(
			"id"=>(($p-1)*3+3),
			"name"=>"标题".(($p-1)*3+3),
			"author"=>"作者".(($p-1)*3+3)
		)
	]
);
echo json_encode($data);
?>
