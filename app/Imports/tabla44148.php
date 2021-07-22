<?php

namespace App\Imports;

use App\Models\User;
use App\Models\Fraccionviii;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use DB;
use Auth;
use Redirect;



class tabla44148 implements ToCollection, WithHeadingRow
{


  public function collection(Collection $rows)
  {
    //dd('Aqui entre');
    //dd($rows);
    foreach ($rows as $row) {
        //dd($rows);
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
            Fraccionix::create([
                'idupload' => $last,
                'iduser' => $iduser,
                'iddependencia' => $iddep,
                'ejercicio' => $row['ejercicio'],
                'fecha_inicio' => Date::excelToDateTimeObject($row['fecha_de_inicio_del_periodo_que_se_informa']),
                'fecha_termino' => Date::excelToDateTimeObject($row['fecha_de_termino_del_periodo_que_se_informa']),
                'tipo_integrante' => $row['tipo_de_integrante_del_sujeto_obligado_catalogo'],
                'nivel_puesto' => $row['clave_o_nivel_del_puesto'],
                'desc_puesto' => $row['denominacion_o_descripcion_del_puesto'],
                'denomina_cargo' => $row['denominacion_del_cargo'],
                'area_adscrip' => $row['area_de_adscripcion'],
                'nombre' => $row['nombre_s'],
                'primer_ape' => $row['primer_apellido'],
                'segundo_ape' => $row['segundo_apellido'],
                'sexo' => $row['sexo_catalogo'],
                'monto_mens_bruto' => $row['monto_mensual_bruto_de_la_remuneracion_en_tabulador'],
                'tipo_moneda_bruta' => $row['tipo_de_moneda_de_la_remuneracion_bruta'],
                'monto_mens_neto' => $row['monto_mensual_neto_de_la_remuneracion_en_tabulador'],
                'tipo_moneda_neto' => $row['tipo_de_moneda_de_la_remuneracion_neta'],
                'percep_adi_bruto_neto' => $row['percepciones_adicionales_en_dinero_monto_bruto_y_neto_tipo_de_moneda_y_su_periodicidad_tabla_348608'],
                'percep_adi_especie' => $row['percepciones_adicionales_en_especie_y_su_periodicidad_tabla_348594'],
                'ingresos_bruto_neto' => $row['ingresos_monto_bruto_y_neto_tipo_de_moneda_y_su_periodicidad_tabla_348609'],
                'sist_compe_bruto_neto' => $row['sistemas_de_compensacion_monto_bruto_y_neto_tipo_de_moneda_y_su_periodicidad_tabla_348578'],
                'gratifica_bruto_neto' => $row['gratificaciones_monto_bruto_y_neto_tipo_de_moneda_y_su_periodicidad_tabla_348598'],
                'primas_bruto_neto' => $row['primas_monto_bruto_y_neto_tipo_de_moneda_y_su_periodicidad_tabla_348585'],
                'comisiones_bruto_neto' => $row['comisiones_monto_bruto_y_neto_tipo_de_moneda_y_su_periodicidad_tabla_348595'],
                'dietas_bruto_neto' => $row['dietas_monto_bruto_y_neto_tipo_de_moneda_y_su_periodicidad_tabla_348586'],
                'bonos_bruto_neto' => $row['bonos_monto_bruto_y_neto_tipo_de_moneda_y_su_periodicidad_tabla_348587'],
                'estimulos_bruto_neto' => $row['estimulos_monto_bruto_y_neto_tipo_de_moneda_y_su_periodicidad_tabla_348606'],
                'apoyos_econ_bruto_neto' => $row['apoyos_economicos_monto_bruto_y_neto_tipo_de_moneda_y_su_periodicidad_tabla_348610'],
                'presta_econ_bruto_neto' => $row['prestaciones_economicas_monto_bruto_y_neto_tipo_de_moneda_y_su_periodicidad_tabla_348607'],
                'presta_especie_bruto_neto' => $row['prestaciones_en_especie_y_su_periodicidad_tabla_348611'],
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


