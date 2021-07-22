<?php

namespace App\Imports;

//use App\fraccioniv;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use App\Models\FraccionIx;

use App\Imports\tabla44147;
use App\Imports\tabla348608;
use App\Imports\tabla348594;
use App\Imports\tabla348609;
use App\Imports\tabla348578;
use App\Imports\tabla348598;
use App\Imports\tabla348585;
use App\Imports\tabla348595;
use App\Imports\tabla348586;
use App\Imports\tabla348587;
use App\Imports\tabla348606;


class FraccionIXImport implements WithMultipleSheets,WithBatchInserts, WithChunkReading
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function sheets(): array
    {
        return [
            '0' => new tabla44148(),
            'Tabla_348608' => new tabla348608(),
            'Tabla_348594' => new tabla348594(),
            'Tabla_348609' => new tabla348609(),
            'Tabla_348578' => new tabla348578(),
            'Tabla_348598' => new tabla348598(),
            'Tabla_348585' => new tabla348585(),
            'Tabla_348595' => new tabla348595(),
            'Tabla_348586' => new tabla348586(),
            'Tabla_348587' => new tabla348587(),
            'Tabla_348606' => new tabla348606(),
            'Tabla_348610' => new tabla348610(),
            'Tabla_348607' => new tabla348607(),
            'Tabla_348611' => new tabla348611(),
        ];
    }

    public function batchSize(): int
    {
        return 1000;
    }

    public function chunkSize(): int
    {
        return 1000;
    }

}
