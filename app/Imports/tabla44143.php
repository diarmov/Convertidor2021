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
                '348492' => $row['ejercicio'],
                '348500' => Date::excelToDateTimeObject($row['fecha_de_inicio_del_periodo_que_se_informa']),
                '348501' => Date::excelToDateTimeObject($row['fecha_de_termino_del_periodo_que_se_informa']),
                '348499' => $row['denominacion_del_area'],
                '348493' => $row['descripcion_breve_y_clara_de_cada_objetivo_institucional'],
                '348503' => $row['indicadores_y_metas_asociados_a_cada_objetivo_tabla_348503'],
                '348502' => $row['hipervinculo_al_documento_del_o_los_programas_operativos_presupuestarios_sectoriales_entre_otros'],
                '348497' => $row['areas_responsables_que_generan_poseen_publican_y_actualizan_la_informacion'],
                '348494' => Date::excelToDateTimeObject($row['fecha_de_validacion']),
                '348496' => Date::excelToDateTimeObject($row['fecha_de_actualizacion']),
                '348498' => $row['nota']
            ]);


        }

    }
    public function headingRow(): int
    {
        return 7;
    }

}


