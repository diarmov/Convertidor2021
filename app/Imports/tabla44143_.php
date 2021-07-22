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
                ->where('indica_y_metas','=',$row['id'])
                ->update(['indica_asociado' => $row['indicadores_asociados'], 'meta_indicador' => $row['meta_del_indicador'], 'unidad_medida' => $row['unidad_de_medida']]);
                //dd($actualiza);
             }
        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


