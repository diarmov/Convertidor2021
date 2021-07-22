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



class tabla348585 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
    //dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

             $resultado=DB::table('fraccionviii')
             ->select('denomina_primas','monto_bruto_primas','monto_neto_primas','tipo_moneda_primas','peridicidad_primas')
             ->where('iduser','=',$iduser)
             ->where('primas_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->denomina_primas!=Null){
                  $denomprimas=$resultado->denomina_primas."/".$row['denominacion_de_las_primas'];
                  }
                  else{
                   $denomprimas=$row['denominacion_de_las_primas'];
                }
             if($resultado->monto_bruto_primas!=Null){
                  $monbruprimas=$resultado->monto_bruto_primas."/".$row['monto_bruto_de_las_primas'];
                  }
                  else{
                   $monbruprimas=$row['monto_bruto_de_las_primas'];
                }
             if($resultado->monto_neto_primas!=Null){
                  $monetprimas=$resultado->monto_neto_primas."/".$row['monto_neto_de_las_primas'];
                  }
                  else{
                   $monetprimas=$row['monto_neto_de_las_primas'];
                }
             if($resultado->tipo_moneda_primas!=Null){
                  $tipmonprimas=$resultado->tipo_moneda_primas."/".$row['tipo_de_moneda_de_las_primas'];
                  }
                  else{
                   $tipmonprimas=$row['tipo_de_moneda_de_las_primas'];
                }
             if($resultado->peridicidad_primas!=Null){
                  $perioprimas=$resultado->peridicidad_primas."/".$row['periodicidad_de_las_primas'];
                  }
                  else{
                   $perioprimas=$row['periodicidad_de_las_primas'];
                }
               // dd('si hay resultados',count($resultado));
               $actualiza= DB::table('fraccionviii')
                ->where('primas_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['denomina_primas' => $denomprimas, 'monto_bruto_primas' => $monbruprimas, 'monto_neto_primas' => $monetprimas, 'tipo_moneda_primas' => $tipmonprimas, 'peridicidad_primas' => $perioprimas]);
                //dd($actualiza);
        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


