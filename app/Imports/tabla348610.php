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



class tabla348610 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
    //dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

             $resultado=DB::table('fraccionviii')
             ->select('denomina_apoyos_econ','monto_bruto_apoyos_econ','monto_neto_apoyos_econ','tipo_moneda_apoyos_econ','peridicidad_apoyos_econ')
             ->where('iduser','=',$iduser)
             ->where('apoyos_econ_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->denomina_apoyos_econ!=Null){
                  $denomapoec=$resultado->denomina_apoyos_econ."/".$row['denominacion_de_los_apoyos_economicos'];
                  }
                  else{
                   $denomapoec=$row['denominacion_de_los_apoyos_economicos'];
                }
             if($resultado->monto_bruto_apoyos_econ!=Null){
                  $monbruapoec=$resultado->monto_bruto_apoyos_econ."/".$row['monto_bruto_de_los_apoyos_economicos'];
                  }
                  else{
                   $monbruapoec=$row['monto_bruto_de_los_apoyos_economicos'];
                }
             if($resultado->monto_neto_apoyos_econ!=Null){
                  $monetapoec=$resultado->monto_neto_apoyos_econ."/".$row['monto_neto_de_los_apoyos_economicos'];
                  }
                  else{
                   $monetapoec=$row['monto_neto_de_los_apoyos_economicos'];
                }
             if($resultado->tipo_moneda_apoyos_econ!=Null){
                  $tipmonapoec=$resultado->tipo_moneda_apoyos_econ."/".$row['tipo_de_moneda_de_los_apoyos_economicos'];
                  }
                  else{
                   $tipmonapoec=$row['tipo_de_moneda_de_los_apoyos_economicos'];
                }
             if($resultado->peridicidad_apoyos_econ!=Null){
                  $perioapoec=$resultado->peridicidad_apoyos_econ."/".$row['periodicidad_de_los_apoyos_economicos'];
                  }
                  else{
                   $perioapoec=$row['periodicidad_de_los_apoyos_economicos'];
                }



                $actualiza= DB::table('fraccionviii')
                ->where('apoyos_econ_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['denomina_apoyos_econ' => $denomapoec, 'monto_bruto_apoyos_econ' => $monbruapoec, 'monto_neto_apoyos_econ' => $monetapoec, 'tipo_moneda_apoyos_econ' => $tipmonapoec, 'peridicidad_apoyos_econ' => $perioapoec]);

        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


