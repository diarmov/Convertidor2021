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



class tabla348598 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
    //dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

            $resultado=DB::table('fraccionviii')
             ->select('denomina_gratifica','monto_bruto_gratifica','monto_neto_gratifica','tipo_moneda_gratifica','peridicidad_gratifica')
             ->where('iduser','=',$iduser)
             ->where('gratifica_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->denomina_gratifica!=Null){
                  $denomgratifica=$resultado->denomina_gratifica."/".$row['denominacion_de_las_gratificaciones'];
                  }
                  else{
                   $denomgratifica=$row['denominacion_de_las_gratificaciones'];
                }
             if($resultado->monto_bruto_gratifica!=Null){
                  $monbrugratifica=$resultado->monto_bruto_gratifica."/".$row['monto_bruto_de_las_gratificaciones'];
                  }
                  else{
                   $monbrugratifica=$row['monto_bruto_de_las_gratificaciones'];
                }
             if($resultado->monto_neto_gratifica!=Null){
                  $monetgratifica=$resultado->monto_neto_gratifica."/".$row['monto_neto_de_las_gratificaciones'];
                  }
                  else{
                   $monetgratifica=$row['monto_neto_de_las_gratificaciones'];
                }
             if($resultado->tipo_moneda_gratifica!=Null){
                  $tipmongratifica=$resultado->tipo_moneda_gratifica."/".$row['tipo_de_moneda_de_las_gratificaciones'];
                  }
                  else{
                   $tipmongratifica=$row['tipo_de_moneda_de_las_gratificaciones'];
                }
             if($resultado->peridicidad_gratifica!=Null){
                  $periogratifica=$resultado->peridicidad_gratifica."/".$row['periodicidad_de_las_gratificaciones'];
                  }
                  else{
                   $periogratifica=$row['periodicidad_de_las_gratificaciones'];
                }

               // dd('si hay resultados',count($resultado));
               $actualiza= DB::table('fraccionviii')
                ->where('gratifica_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['denomina_gratifica' => $denomgratifica, 'monto_bruto_gratifica' => $monbrugratifica, 'monto_neto_gratifica' => $monetgratifica, 'tipo_moneda_gratifica' => $tipmongratifica, 'peridicidad_gratifica' => $periogratifica]);
                //dd($actualiza);
        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


