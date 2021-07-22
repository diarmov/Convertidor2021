<?php

namespace App\Imports;

use App\Models\User;
use App\Models\Fraccioniv;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use DB;
use Auth;
use Redirect;



class tabla44143 implements ToCollection, WithHeadingRow
{


  public function collection(Collection $rows)
  {
    //dd('Aqui entre');
    foreach ($rows as $row) {

             $iduser = Auth::user()->id;
             $iddep = Auth::user()->iddependencia;

             $ultimo=DB::table('formato_descarga')
             ->select('idformato')
             ->where('iduser','=',$iduser)
             ->where('iddependencia','=',$iddep)
             ->get()
             ->last();
             if($ultimo==Null){
                   $last=$ultimo+1;
                 }
             else{
                    $last=$ultimo->idformato+1;
                }


      //     dd($iduser, $iddep);
//dd($row['ejercicio']);
            Fraccioniv::create([
                'idupload' => $last,
                'iduser' => $iduser,
                'iddependencia' => $iddep,
                'ejercicio' => $row['ejercicio'],
                'fecha_inicio' => Date::excelToDateTimeObject($row['fecha_de_inicio_del_periodo_que_se_informa']),
                'fecha_termino' => Date::excelToDateTimeObject($row['fecha_de_termino_del_periodo_que_se_informa']),
                'denomina_area' => $row['denominacion_del_area'],
                'desc_objet' => $row['descripcion_breve_y_clara_de_cada_objetivo_institucional'],
                'indica_y_metas' => $row['indicadores_y_metas_asociados_a_cada_objetivo_tabla_348503'],
                'hipervinculo' => $row['hipervinculo_al_documento_del_o_los_programas_operativos_presupuestarios_sectoriales_entre_otros'],
                'area_responsable' => $row['areas_responsables_que_generan_poseen_publican_y_actualizan_la_informacion'],
                'fecha_actualizacion' => Date::excelToDateTimeObject($row['fecha_de_actualizacion']),
                'fecha_validacion' => Date::excelToDateTimeObject($row['fecha_de_validacion']),
                'nota' => $row['nota']
            ]);


        }

    }

    public function headingRow(): int
    {
        return 7;
    }

}


