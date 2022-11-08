<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LevelSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdl112DlmBrZj-PyGbpJMZcOjYldT8jFVLLL0aJhbBYD_TZGH4PqgKXRZYYF576nuJlExXb_ykcc4b/pub?gid=115897335&single=true&output=tsv";
    $sheetContent = explode("\r\n", file_get_contents($sheetURL));
    $lines = array_slice($sheetContent, 1);
    $rows = collect();
    $now = Carbon::now('Asia/Kolkata');
    foreach ($lines as $line) {
      $row = str_getcsv($line, "\t");
      $rows->push([
        'id' => $row[0],
        'points' => $row[1],
        'question' => $row[2],
        'source_hint' => $row[3],
        'answer' => $row[4],
        'is_story' => $row[5],
        'created_at' => $now,
        'updated_at' => $now,
      ]);
    }

    DB::table('levels')->upsert(
      $rows->toArray(),
      ['id'],
      ['points', 'question', 'source_hint', 'answer', 'is_story']
    );
  }
}
