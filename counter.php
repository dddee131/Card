<?php
// counter.php
$counter_file = __DIR__ . '/visits.txt';

// إن لم يكن الملف موجودًا، أنشئه بصفر
if (!file_exists($counter_file)) {
    file_put_contents($counter_file, "0");
}

// افتح الملف مع قفل ثم اقرأ وزد ثم اكتب مرة أخرى (atomic-ish)
$fp = fopen($counter_file, 'c+');
if ($fp === false) {
    echo "0"; // فشل الوصول للملف
    exit;
}

flock($fp, LOCK_EX);

// أرجع مؤشر القراءة إلى البداية
rewind($fp);

// اقرأ العدد الحالي
$visits = (int)trim(stream_get_contents($fp));

// زد العدد
$visits++;

// أعد الكتابة من البداية
rewind($fp);
ftruncate($fp, 0);
fwrite($fp, (string)$visits);
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

// اطبع العدد
echo $visits;
