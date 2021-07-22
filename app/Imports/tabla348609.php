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



class tabla348609 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
    //dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

             $resultado=DB::table('fraccionviii')
             ->select('denomina_ingresos','monto_bruto_ingresos','monto_neto_ingresos','tipo_moneda_ingresos','peridicidad_ingresos')
             ->where('iduser','=',$iduser)
             ->where('ingresos_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->denomina_ingresos!=Null){
                  $denomingre=$resultado->denomina_ingresos."/".$row['denominacion_de_los_ingresos'];
                  }
                  else{
                   $denomingre=$row['denominacion_de_los_ingresos'];
                }
             if($resultado->monto_bruto_ingresos!=Null){
                  $monbruingre=$resultado->monto_bruto_ingresos."/".$row['monto_bruto_de_los_ingresos'];
                  }
                  else{
                   $monbruingre=$row['monto_bruto_de_los_ingresos'];
                }
             if($resultado->monto_neto_ingresos!=Null){
                  $monetingre=$resultado->monto_neto_ingresos."/".$row['monto_neto_de_los_ingresos'];
                  }
                  else{
                   $monetingre=$row['monto_neto_de_los_ingresos'];
                }
             if($resultado->tipo_moneda_ingresos!=Null){
                  $tipmoningre=$resultado->tipo_moneda_ingresos."/".$row['tipo_de_moneda_de_los_ingresos'];
                  }
                  else{
                   $tipmoningre=$row['tipo_de_moneda_de_los_ingresos'];
                }
             if($resultado->peridicidad_ingresos!=Null){
                  $perioingre=$resultado->peridicidad_ingresos."/".$row['periodicidad_de_los_ingresos'];
                  }
                  else{
                   $perioingre=$row['periodicidad_de_los_ingresos'];
                }

               // dd('si hay resultados',count($resultado));
               $actualiza= DB::table('fraccionviii')
                ->where('ingresos_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['denomina_ingresos' => $denomingre, 'monto_bruto_ingresos' => $monbruingre, 'monto_neto_ingresos' => $monetingre, 'tipo_moneda_ingresos' => $tipmoningre, 'peridicidad_ingresos' => $perioingre]);
                //dd($actualiza);
        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


