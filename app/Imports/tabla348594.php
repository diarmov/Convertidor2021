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



class tabla348594 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
//dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

              $resultado=DB::table('fraccionviii')
             ->select('desc_percep_adi_especie','period_percep_adi_especie')
             ->where('iduser','=',$iduser)
             ->where('presta_especie_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->desc_percep_adi_especie!=Null){
                  $descpersepadi=$resultado->desc_percep_adi_especie."/".$row['descripcion_de_las_percepciones_adicionales_en_especie'];
                  }
                  else{
                   $descpersepadi=$row['descripcion_de_las_percepciones_adicionales_en_especie'];
                }
             if($resultado->period_percep_adi_especie!=Null){
                  $periopersepadi=$resultado->period_percep_adi_especie."/".$row['periodicidad_de_las_percepciones_adicionales_en_especie'];
                  }
                  else{
                   $periopersepadi=$row['periodicidad_de_las_percepciones_adicionales_en_especie'];
                }

               $actualiza= DB::table('fraccionviii')
                ->where('percep_adi_especie','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['desc_percep_adi_especie' => $descpersepadi, 'period_percep_adi_especie' => $periopersepadi]);
                //dd($actualiza);
        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


