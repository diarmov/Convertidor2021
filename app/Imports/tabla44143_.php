<?php

namespace App\Imports;

use App\Models\Fraccioniv;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use DB;
use Auth;
use Redirect;



class tabla44143_ implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {

            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

             $resultado=DB::table('fraccioniv')
             ->select('*')
             ->where('iduser','=',$iduser)
             ->where('iddependencia','=',$iddep)
             ->get();
             if($resultado!=Null){
               // dd('si hay resultados',count($resultado));
               $actualiza= DB::table('fraccioniv')
                ->where('348503','=',$row['id'])
                ->update(['44864' => $row['indicadores_asociados'], '44865' => $row['meta_del_indicador'], '44866' => $row['unidad_de_medida']]);
                //dd($actualiza);
             }
        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


