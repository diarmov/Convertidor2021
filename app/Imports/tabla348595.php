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



class tabla348595 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
    //dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

            $resultado=DB::table('fraccionviii')
             ->select('denomina_comisiones','monto_bruto_comisiones','monto_neto_comisiones','tipo_moneda_comisiones','peridicidad_comisiones')
             ->where('iduser','=',$iduser)
             ->where('comisiones_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->denomina_comisiones!=Null){
                  $denomcomisiones=$resultado->denomina_comisiones."/".$row['denominacion_de_las_comisiones'];
                  }
                  else{
                   $denomcomisiones=$row['denominacion_de_las_comisiones'];
                }
             if($resultado->monto_bruto_comisiones!=Null){
                  $monbrucomisiones=$resultado->monto_bruto_comisiones."/".$row['monto_bruto_de_las_comisiones'];
                  }
                  else{
                   $monbrucomisiones=$row['monto_bruto_de_las_comisiones'];
                }
             if($resultado->monto_neto_comisiones!=Null){
                  $monetcomisiones=$resultado->monto_neto_comisiones."/".$row['monto_neto_de_las_comisiones'];
                  }
                  else{
                   $monetcomisiones=$row['monto_neto_de_las_comisiones'];
                }
             if($resultado->tipo_moneda_comisiones!=Null){
                  $tipmoncomisiones=$resultado->tipo_moneda_comisiones."/".$row['tipo_de_moneda_de_las_comisiones'];
                  }
                  else{
                   $tipmoncomisiones=$row['tipo_de_moneda_de_las_comisiones'];
                }
             if($resultado->peridicidad_comisiones!=Null){
                  $periocomisiones=$resultado->peridicidad_comisiones."/".$row['periodicidad_de_las_comisiones'];
                  }
                  else{
                   $periocomisiones=$row['periodicidad_de_las_comisiones'];
                }
               // dd('si hay resultados',count($resultado));
               $actualiza= DB::table('fraccionviii')
                ->where('comisiones_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['denomina_comisiones' => $denomcomisiones, 'monto_bruto_comisiones' => $monbrucomisiones, 'monto_neto_comisiones' => $monetcomisiones, 'tipo_moneda_comisiones' => $tipmoncomisiones, 'peridicidad_comisiones' => $periocomisiones]);
                //dd($actualiza);
        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


