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



class tabla348586 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
   // dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

              $resultado=DB::table('fraccionviii')
             ->select('denomina_dietas','monto_bruto_dietas','monto_neto_dietas','tipo_moneda_dietas','peridicidad_dietas')
             ->where('iduser','=',$iduser)
             ->where('dietas_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->denomina_dietas!=Null){
                  $denomdietas=$resultado->denomina_dietas."/".$row['denominacion_de_las_dietas'];
                  }
                  else{
                   $denomdietas=$row['denominacion_de_las_dietas'];
                }
             if($resultado->monto_bruto_dietas!=Null){
                  $monbrudietas=$resultado->monto_bruto_dietas."/".$row['monto_bruto_de_las_dietas'];
                  }
                  else{
                   $monbrudietas=$row['monto_bruto_de_las_dietas'];
                }
             if($resultado->monto_neto_dietas!=Null){
                  $monetdietas=$resultado->monto_neto_dietas."/".$row['monto_neto_de_las_dietas'];
                  }
                  else{
                   $monetdietas=$row['monto_neto_de_las_dietas'];
                }
             if($resultado->tipo_moneda_dietas!=Null){
                  $tipmondietas=$resultado->tipo_moneda_dietas."/".$row['tipo_de_moneda_de_las_dietas'];
                  }
                  else{
                   $tipmondietas=$row['tipo_de_moneda_de_las_dietas'];
                }
             if($resultado->peridicidad_dietas!=Null){
                  $periodietas=$resultado->peridicidad_dietas."/".$row['periodicidad_de_las_dietas'];
                  }
                  else{
                   $periodietas=$row['periodicidad_de_las_dietas'];
                }
               // dd('si hay resultados',count($resultado));
               $actualiza= DB::table('fraccionviii')
                ->where('dietas_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['denomina_dietas' => $denomdietas, 'monto_bruto_dietas' => $monbrudietas, 'monto_neto_dietas' => $monetdietas, 'tipo_moneda_dietas' => $tipmondietas, 'peridicidad_dietas' => $periodietas]);
                //dd($actualiza);
        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


