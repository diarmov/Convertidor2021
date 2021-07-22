<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Reliese\Database\Eloquent\Model;

/**
 * Class Fraccionviii
 * 
 * @property int $id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int|null $idupload
 * @property int|null $iduser
 * @property int|null $iddependencia
 * @property int|null $ejercicio
 * @property Carbon|null $fecha_inicio
 * @property Carbon|null $fecha_termino
 * @property string|null $tipo_integrante
 * @property string|null $nivel_puesto
 * @property string|null $desc_puesto
 * @property string|null $denomina_cargo
 * @property string|null $area_adscrip
 * @property string|null $nombre
 * @property string|null $primer_ape
 * @property string|null $segundo_ape
 * @property string|null $sexo
 * @property float|null $monto_mens_bruto
 * @property string|null $tipo_moneda_bruta
 * @property float|null $monto_mens_neto
 * @property string|null $tipo_moneda_neto
 * @property int $percep_adi_bruto_neto
 * @property string|null $denomina_pers_adic
 * @property float|null $monto_bruto_pers_adic
 * @property float|null $monto_neto_pers_adic
 * @property string|null $tipo_moneda_pers_adic
 * @property string|null $peridicidad_pers_adic
 * @property int $percep_adi_especie
 * @property string|null $desc_percep_adi_especie
 * @property string|null $period_percep_adi_especie
 * @property int $ingresos_bruto_neto
 * @property string|null $denomina_ingresos
 * @property float|null $monto_bruto_ingresos
 * @property float|null $monto_neto_ingresos
 * @property string|null $tipo_moneda_ingresos
 * @property string|null $peridicidad_ingresos
 * @property int $sist_compe_bruto_neto
 * @property string|null $denomina_sist_compe
 * @property float|null $monto_bruto_sist_compe
 * @property float|null $monto_neto_sist_compe
 * @property string|null $tipo_moneda_sist_compe
 * @property string|null $peridicidad_sist_compe
 * @property int $gratifica_bruto_neto
 * @property string|null $denomina_gratifica
 * @property float|null $monto_bruto_gratifica
 * @property float|null $monto_neto_gratifica
 * @property string|null $tipo_moneda_gratifica
 * @property string|null $peridicidad_gratifica
 * @property int $primas_bruto_neto
 * @property string|null $denomina_primas
 * @property float|null $monto_bruto_primas
 * @property float|null $monto_neto_primas
 * @property string|null $tipo_moneda_primas
 * @property string|null $peridicidad_primas
 * @property int $comisiones_bruto_neto
 * @property string|null $denomina_comisiones
 * @property float|null $monto_bruto_comisiones
 * @property float|null $monto_neto_comisiones
 * @property string|null $tipo_moneda_comisiones
 * @property string|null $peridicidad_comisiones
 * @property int $dietas_bruto_neto
 * @property string|null $denomina_dietas
 * @property float|null $monto_bruto_dietas
 * @property float|null $monto_neto_dietas
 * @property string|null $tipo_moneda_dietas
 * @property string|null $peridicidad_dietas
 * @property int $bonos_bruto_neto
 * @property string|null $denomina_bonos
 * @property string|null $monto_bruto_bonos
 * @property string|null $monto_neto_bonos
 * @property string|null $tipo_moneda_bonos
 * @property string|null $peridicidad_bonos
 * @property int $estimulos_bruto_neto
 * @property string|null $denomina_estimulos
 * @property float|null $monto_bruto_estimulos
 * @property float|null $monto_neto_estimulos
 * @property string|null $tipo_moneda_estimulos
 * @property string|null $peridicidad_estimulos
 * @property int $apoyos_econ_bruto_neto
 * @property string|null $denomina_apoyos_econ
 * @property float|null $monto_bruto_apoyos_econ
 * @property float|null $monto_neto_apoyos_econ
 * @property string|null $tipo_moneda_apoyos_econ
 * @property string|null $peridicidad_apoyos_econ
 * @property int $presta_econ_bruto_neto
 * @property string|null $denomina_presta_econ
 * @property float|null $monto_bruto_presta_econ
 * @property float|null $monto_neto_presta_econ
 * @property string|null $tipo_moneda_presta_econ
 * @property string|null $peridicidad_presta_econ
 * @property int $presta_especie_bruto_neto
 * @property string|null $desc_percep_presta_especie
 * @property string|null $period_percep_presta_especie
 * @property string|null $area_responsable
 * @property Carbon|null $fecha_validacion
 * @property Carbon|null $fecha_actualizacion
 * @property string|null $nota
 *
 * @package App\Models
 */
class Fraccionviii extends Model
{
	protected $table = 'fraccionviii';

	protected $casts = [
		'idupload' => 'int',
		'iduser' => 'int',
		'iddependencia' => 'int',
		'ejercicio' => 'int',
		'monto_mens_bruto' => 'float',
		'monto_mens_neto' => 'float',
		'percep_adi_bruto_neto' => 'int',
		'monto_bruto_pers_adic' => 'float',
		'monto_neto_pers_adic' => 'float',
		'percep_adi_especie' => 'int',
		'ingresos_bruto_neto' => 'int',
		'monto_bruto_ingresos' => 'float',
		'monto_neto_ingresos' => 'float',
		'sist_compe_bruto_neto' => 'int',
		'monto_bruto_sist_compe' => 'float',
		'monto_neto_sist_compe' => 'float',
		'gratifica_bruto_neto' => 'int',
		'monto_bruto_gratifica' => 'float',
		'monto_neto_gratifica' => 'float',
		'primas_bruto_neto' => 'int',
		'monto_bruto_primas' => 'float',
		'monto_neto_primas' => 'float',
		'comisiones_bruto_neto' => 'int',
		'monto_bruto_comisiones' => 'float',
		'monto_neto_comisiones' => 'float',
		'dietas_bruto_neto' => 'int',
		'monto_bruto_dietas' => 'float',
		'monto_neto_dietas' => 'float',
		'bonos_bruto_neto' => 'int',
		'estimulos_bruto_neto' => 'int',
		'apoyos_econ_bruto_neto' => 'int',
		'presta_econ_bruto_neto' => 'int',
		'presta_especie_bruto_neto' => 'int'
	];

	protected $dates = [
		'fecha_inicio',
		'fecha_termino',
		'fecha_validacion',
		'fecha_actualizacion'
	];

	protected $fillable = [
		'idupload',
		'iduser',
		'iddependencia',
		'ejercicio',
		'fecha_inicio',
		'fecha_termino',
		'tipo_integrante',
		'nivel_puesto',
		'desc_puesto',
		'denomina_cargo',
		'area_adscrip',
		'nombre',
		'primer_ape',
		'segundo_ape',
		'sexo',
		'monto_mens_bruto',
		'tipo_moneda_bruta',
		'monto_mens_neto',
		'tipo_moneda_neto',
		'percep_adi_bruto_neto',
		'denomina_pers_adic',
		'monto_bruto_pers_adic',
		'monto_neto_pers_adic',
		'tipo_moneda_pers_adic',
		'peridicidad_pers_adic',
		'percep_adi_especie',
		'desc_percep_adi_especie',
		'period_percep_adi_especie',
		'ingresos_bruto_neto',
		'denomina_ingresos',
		'monto_bruto_ingresos',
		'monto_neto_ingresos',
		'tipo_moneda_ingresos',
		'peridicidad_ingresos',
		'sist_compe_bruto_neto',
		'denomina_sist_compe',
		'monto_bruto_sist_compe',
		'monto_neto_sist_compe',
		'tipo_moneda_sist_compe',
		'peridicidad_sist_compe',
		'gratifica_bruto_neto',
		'denomina_gratifica',
		'monto_bruto_gratifica',
		'monto_neto_gratifica',
		'tipo_moneda_gratifica',
		'peridicidad_gratifica',
		'primas_bruto_neto',
		'denomina_primas',
		'monto_bruto_primas',
		'monto_neto_primas',
		'tipo_moneda_primas',
		'peridicidad_primas',
		'comisiones_bruto_neto',
		'denomina_comisiones',
		'monto_bruto_comisiones',
		'monto_neto_comisiones',
		'tipo_moneda_comisiones',
		'peridicidad_comisiones',
		'dietas_bruto_neto',
		'denomina_dietas',
		'monto_bruto_dietas',
		'monto_neto_dietas',
		'tipo_moneda_dietas',
		'peridicidad_dietas',
		'bonos_bruto_neto',
		'denomina_bonos',
		'monto_bruto_bonos',
		'monto_neto_bonos',
		'tipo_moneda_bonos',
		'peridicidad_bonos',
		'estimulos_bruto_neto',
		'denomina_estimulos',
		'monto_bruto_estimulos',
		'monto_neto_estimulos',
		'tipo_moneda_estimulos',
		'peridicidad_estimulos',
		'apoyos_econ_bruto_neto',
		'denomina_apoyos_econ',
		'monto_bruto_apoyos_econ',
		'monto_neto_apoyos_econ',
		'tipo_moneda_apoyos_econ',
		'peridicidad_apoyos_econ',
		'presta_econ_bruto_neto',
		'denomina_presta_econ',
		'monto_bruto_presta_econ',
		'monto_neto_presta_econ',
		'tipo_moneda_presta_econ',
		'peridicidad_presta_econ',
		'presta_especie_bruto_neto',
		'desc_percep_presta_especie',
		'period_percep_presta_especie',
		'area_responsable',
		'fecha_validacion',
		'fecha_actualizacion',
		'nota'
	];
}
