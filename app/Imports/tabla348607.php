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



class tabla348607 implements ToCollection, WithHeadingRow
{

  public function collection(Collection $rows)
  {

    foreach ($rows as $row) {
    //dd($rows);
            $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

             $resultado=DB::table('fraccionviii')
             ->select('denomina_presta_econ','monto_bruto_presta_econ','monto_neto_presta_econ','tipo_moneda_presta_econ','peridicidad_presta_econ')
             ->where('iduser','=',$iduser)
             ->where('presta_econ_bruto_neto','=',$row['id'])
             ->where('iddependencia','=',$iddep)
             ->first();

             if($resultado->denomina_presta_econ!=Null){
                  $denompreseco=$resultado->denomina_presta_econ."/".$row['denominacion_de_las_prestaciones_economicas'];
                  }
                  else{
                   $denompreseco=$row['denominacion_de_las_prestaciones_economicas'];
                }
             if($resultado->monto_bruto_presta_econ!=Null){
                  $monbrupreseco=$resultado->monto_bruto_presta_econ."/".$row['monto_bruto_de_las_prestaciones_economicas'];
                  }
                  else{
                   $monbrupreseco=$row['monto_bruto_de_las_prestaciones_economicas'];
                }
             if($resultado->monto_neto_presta_econ!=Null){
                  $monetpreseco=$resultado->monto_neto_presta_econ."/".$row['monto_neto_de_las_prestaciones_economicas'];
                  }
                  else{
                   $monetpreseco=$row['monto_neto_de_las_prestaciones_economicas'];
                }
             if($resultado->tipo_moneda_presta_econ!=Null){
                  $tipmonpreseco=$resultado->tipo_moneda_presta_econ."/".$row['tipo_de_moneda_de_las_prestaciones_economicas'];
                  }
                  else{
                   $tipmonpreseco=$row['tipo_de_moneda_de_las_prestaciones_economicas'];
                }
             if($resultado->peridicidad_presta_econ!=Null){
                  $periopreseco=$resultado->peridicidad_presta_econ."/".$row['periodicidad_de_las_prestaciones_economicas'];
                  }
                  else{
                   $periopreseco=$row['periodicidad_de_las_prestaciones_economicas'];
                }



                $actualiza= DB::table('fraccionviii')
                ->where('presta_econ_bruto_neto','=',$row['id'])
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=',$iddep)
                ->update(['denomina_presta_econ' => $denompreseco, 'monto_bruto_presta_econ' => $monbrupreseco, 'monto_neto_presta_econ' => $monetpreseco, 'tipo_moneda_presta_econ' => $tipmonpreseco, 'peridicidad_presta_econ' => $periopreseco]);

        }

    }
    public function headingRow(): int
    {
        return 3;
    }
}


