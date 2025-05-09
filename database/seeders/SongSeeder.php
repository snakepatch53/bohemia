<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SongSeeder extends Seeder
{
    public function run(): void
    {
        $excel_filepath = storage_path('app/public/canciones-eki.csv');

        $excelData = [];
        $excelFile = fopen($excel_filepath, 'r');

        while (($data = fgetcsv($excelFile, 0, ';')) !== FALSE) {
            $excelData[] = $data;
        }

        fclose($excelFile);

        foreach ($excelData as $key => $value) {
            $id = $value[0];
            $id = intval($id);
            DB::table('songs')->insert([
                'id' => $id,
                'title' => $value[1],
                'artist' => $value[2],
                'gender' => $value[3],
            ]);
        }
    }
}
