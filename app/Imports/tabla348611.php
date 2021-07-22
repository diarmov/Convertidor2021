<?php

namespace App\Imports;

use App\Models\Fraccionviii;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use DB;
use Auth;
use Redirect;



class tabla348611 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
    //dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

             $resultado=DB::table('fraccionviii')
             ->select('desc_percep_presta_especie','period_percep_presta_especie')
             ->where('iduser','=',$iduser)
             ->where('presta_especie_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->desc_percep_presta_especie!=Null){
                  $descpersep=$resultado->desc_percep_presta_especie."/".$row['descripcion_de_las_prestaciones_en_especie'];
                  }
                  else{
                   $descpersep=$row['descripcion_de_las_prestaciones_en_especie'];
                }
             if($resultado->period_percep_presta_especie!=Null){
                  $periopresp=$resultado->period_percep_presta_especie."/".$row['periodicidad_de_las_prestaciones_en_especie'];
                  }
                  else{
                   $periopresp=$row['periodicidad_de_las_prestaciones_en_especie'];
                }


                $actualiza= DB::table('fraccionviii')
                ->where('presta_especie_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['desc_percep_presta_especie' => $descpersep, 'period_percep_presta_especie' => $periopresp]);

        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


