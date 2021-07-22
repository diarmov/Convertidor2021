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



class tabla348587 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
    //dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

             $resultado=DB::table('fraccionviii')
             ->select('denomina_bonos','monto_bruto_bonos','monto_neto_bonos','tipo_moneda_bonos','peridicidad_bonos')
             ->where('iduser','=',$iduser)
             ->where('bonos_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->denomina_bonos!=Null){
                  $denombon=$resultado->denomina_bonos."/".$row['denominacion_de_los_bonos'];
                  }
                  else{
                   $denombon=$row['denominacion_de_los_bonos'];
                }
             if($resultado->monto_bruto_bonos!=Null){
                  $monbrubon=$resultado->monto_bruto_bonos."/".$row['monto_bruto_de_los_bonos'];
                  }
                  else{
                   $monbrubon=$row['monto_bruto_de_los_bonos'];
                }
             if($resultado->monto_neto_bonos!=Null){
                  $monetbon=$resultado->monto_neto_bonos."/".$row['monto_neto_de_los_bonos'];
                  }
                  else{
                   $monetbon=$row['monto_neto_de_los_bonos'];
                }
             if($resultado->tipo_moneda_bonos!=Null){
                  $tipmonbon=$resultado->tipo_moneda_bonos."/".$row['tipo_de_moneda_de_los_bonos'];
                  }
                  else{
                   $tipmonbon=$row['tipo_de_moneda_de_los_bonos'];
                }
             if($resultado->peridicidad_bonos!=Null){
                  $periobon=$resultado->peridicidad_bonos."/".$row['periodicidad_de_los_bonos'];
                  }
                  else{
                   $periobon=$row['periodicidad_de_los_bonos'];
                }



                $actualiza= DB::table('fraccionviii')
                ->where('bonos_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['denomina_bonos' => $denombon, 'monto_bruto_bonos' => $monbrubon, 'monto_neto_bonos' => $monetbon, 'tipo_moneda_bonos' => $tipmonbon, 'peridicidad_bonos' => $periobon]);

        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


