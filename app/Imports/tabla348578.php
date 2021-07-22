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



class tabla348578 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
   // dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

            $resultado=DB::table('fraccionviii')
             ->select('denomina_sist_compe','monto_bruto_sist_compe','monto_neto_sist_compe','tipo_moneda_sist_compe','peridicidad_sist_compe')
             ->where('iduser','=',$iduser)
             ->where('sist_compe_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->denomina_sist_compe!=Null){
                  $denomsiscomp=$resultado->denomina_sist_compe."/".$row['denominacion_de_los_sistemas_de_compensacion'];
                  }
                  else{
                   $denomsiscomp=$row['denominacion_de_los_sistemas_de_compensacion'];
                }
             if($resultado->monto_bruto_sist_compe!=Null){
                  $monbrusiscomp=$resultado->monto_bruto_sist_compe."/".$row['monto_bruto_de_los_sistemas_de_compensacion'];
                  }
                  else{
                   $monbrusiscomp=$row['monto_bruto_de_los_sistemas_de_compensacion'];
                }
             if($resultado->monto_neto_sist_compe!=Null){
                  $monetsiscomp=$resultado->monto_neto_sist_compe."/".$row['monto_neto_de_los_sistemas_de_compensacion'];
                  }
                  else{
                   $monetsiscomp=$row['monto_neto_de_los_sistemas_de_compensacion'];
                }
             if($resultado->tipo_moneda_sist_compe!=Null){
                  $tipmonsiscomp=$resultado->tipo_moneda_sist_compe."/".$row['tipo_de_moneda_de_los_sistemas_de_compensacion'];
                  }
                  else{
                   $tipmonsiscomp=$row['tipo_de_moneda_de_los_sistemas_de_compensacion'];
                }
             if($resultado->peridicidad_sist_compe!=Null){
                  $periosiscomp=$resultado->peridicidad_sist_compe."/".$row['periodicidad_de_los_sistemas_de_compensacion'];
                  }
                  else{
                   $periosiscomp=$row['periodicidad_de_los_sistemas_de_compensacion'];
                }

               // dd('si hay resultados',count($resultado));
               $actualiza= DB::table('fraccionviii')
                ->where('sist_compe_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['denomina_sist_compe' => $denomsiscomp, 'monto_bruto_sist_compe' => $monbrusiscomp, 'monto_neto_sist_compe' => $monetsiscomp, 'tipo_moneda_sist_compe' => $tipmonsiscomp, 'peridicidad_sist_compe' => $periosiscomp]);
                //dd($actualiza);
        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


