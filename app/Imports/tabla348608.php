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



class tabla348608 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
//dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

             $resultado=DB::table('fraccionviii')
             ->select('denomina_pers_adic','monto_bruto_pers_adic','monto_neto_pers_adic','tipo_moneda_pers_adic','peridicidad_pers_adic')
             ->where('iduser','=',$iduser)
             ->where('percep_adi_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->denomina_pers_adic!=Null){
                  $denompersadi=$resultado->denomina_pers_adic."/".$row['denominacion_de_las_percepciones_adicionales_en_dinero'];
                  }
                  else{
                   $denompersadi=$row['denominacion_de_las_percepciones_adicionales_en_dinero'];
                }
             if($resultado->monto_bruto_pers_adic!=Null){
                  $monbrupersadi=$resultado->monto_bruto_pers_adic."/".$row['monto_bruto_de_las_percepciones_adicionales_en_dinero'];
                  }
                  else{
                   $monbrupersadi=$row['monto_bruto_de_las_percepciones_adicionales_en_dinero'];
                }
             if($resultado->monto_neto_pers_adic!=Null){
                  $monetpersadi=$resultado->monto_neto_pers_adic."/".$row['monto_neto_de_las_percepciones_adicionales_en_dinero'];
                  }
                  else{
                   $monetpersadi=$row['monto_neto_de_las_percepciones_adicionales_en_dinero'];
                }
             if($resultado->tipo_moneda_pers_adic!=Null){
                  $tipmonpersadi=$resultado->tipo_moneda_pers_adic."/".$row['tipo_de_moneda_de_las_percepciones_adicionales_en_dinero'];
                  }
                  else{
                   $tipmonpersadi=$row['tipo_de_moneda_de_las_percepciones_adicionales_en_dinero'];
                }
             if($resultado->peridicidad_pers_adic!=Null){
                  $periopersadi=$resultado->peridicidad_pers_adic."/".$row['periodicidad_de_las_percepciones_adicionales_en_dinero'];
                  }
                  else{
                   $periopersadi=$row['periodicidad_de_las_percepciones_adicionales_en_dinero'];
                }



               $actualiza= DB::table('fraccionviii')
                ->where('percep_adi_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['denomina_pers_adic' => $denompersadi, 'monto_bruto_pers_adic' => $monbrupersadi, 'monto_neto_pers_adic' => $monetpersadi, 'tipo_moneda_pers_adic' => $tipmonpersadi, 'peridicidad_pers_adic' => $periopersadi]);
                //dd($actualiza);

        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


