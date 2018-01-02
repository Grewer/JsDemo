<?php

var_dump($_FILES);

move_uploaded_file($_FILES["img"]["tmp_name"],'./' .date('Y-m-d H:i:s').'.png');