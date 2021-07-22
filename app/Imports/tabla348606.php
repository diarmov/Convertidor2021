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



class tabla348606 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
    //dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

             $resultado=DB::table('fraccionviii')
             ->select('denomina_estimulos','monto_bruto_estimulos','monto_neto_estimulos','tipo_moneda_estimulos','peridicidad_estimulos')
             ->where('iduser','=',$iduser)
             ->where('estimulos_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->denomina_estimulos!=Null){
                  $denomesti=$resultado->denomina_estimulos."/".$row['denominacion_de_los_estimulos'];
                  }
                  else{
                   $denomesti=$row['denominacion_de_los_estimulos'];
                }
             if($resultado->monto_bruto_estimulos!=Null){
                  $monbruesti=$resultado->monto_bruto_estimulos."/".$row['monto_bruto_de_los_estimulos'];
                  }
                  else{
                   $monbruesti=$row['monto_bruto_de_los_estimulos'];
                }
             if($resultado->monto_neto_estimulos!=Null){
                  $monetesti=$resultado->monto_neto_estimulos."/".$row['monto_neto_de_los_estimulos'];
                  }
                  else{
                   $monetesti=$row['monto_neto_de_los_estimulos'];
                }
             if($resultado->tipo_moneda_estimulos!=Null){
                  $tipmonesti=$resultado->tipo_moneda_estimulos."/".$row['tipo_de_moneda_de_los_estimulos'];
                  }
                  else{
                   $tipmonesti=$row['tipo_de_moneda_de_los_estimulos'];
                }
             if($resultado->peridicidad_estimulos!=Null){
                  $perioesti=$resultado->peridicidad_estimulos."/".$row['periodicidad_de_los_estimulos'];
                  }
                  else{
                   $perioesti=$row['periodicidad_de_los_estimulos'];
                }



                $actualiza= DB::table('fraccionviii')
                ->where('estimulos_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['denomina_estimulos' => $denomesti, 'monto_bruto_estimulos' => $monbruesti, 'monto_neto_estimulos' => $monetesti, 'tipo_moneda_estimulos' => $tipmonesti, 'peridicidad_estimulos' => $perioesti]);

        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


