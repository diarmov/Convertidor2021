<?php

namespace App\Exports;

use App\fraccioniv;
use Maatwebsite\Excel\Concerns\FromCollection;

class FraccionIvExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {

        $results=DB::table('users')
        ->join('formato_descarga.iduser','=','users.id')
        ->select('formato_descarga.nombre_archivo','users.iddependencia')
        ->get();

        return view('home', compact('results'));
    }
}
