<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Reliese\Database\Eloquent\Model;

/**
 * Class Fraccioniv
 * 
 * @property int $id
 * @property int|null $idupload
 * @property int|null $iduser
 * @property int|null $iddependencia
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int|null $ejercicio
 * @property Carbon|null $fecha_inicio
 * @property Carbon|null $fecha_termino
 * @property string|null $denomina_area
 * @property string|null $desc_objet
 * @property int|null $indica_y_metas
 * @property string|null $indica_asociado
 * @property string|null $meta_indicador
 * @property string|null $unidad_medida
 * @property string|null $hipervinculo
 * @property string|null $area_responsable
 * @property Carbon|null $fecha_actualizacion
 * @property Carbon|null $fecha_validacion
 * @property string|null $nota
 *
 * @package App\Models
 */
class Fraccioniv extends Model
{
	protected $table = 'fraccioniv';

	protected $casts = [
		'idupload' => 'int',
		'iduser' => 'int',
		'iddependencia' => 'int',
		'ejercicio' => 'int',
		'indica_y_metas' => 'int'
	];

	protected $dates = [
		'fecha_inicio',
		'fecha_termino',
		'fecha_actualizacion',
		'fecha_validacion'
	];

	protected $fillable = [
		'idupload',
		'iduser',
		'iddependencia',
		'ejercicio',
		'fecha_inicio',
		'fecha_termino',
		'denomina_area',
		'desc_objet',
		'indica_y_metas',
		'indica_asociado',
		'meta_indicador',
		'unidad_medida',
		'hipervinculo',
		'area_responsable',
		'fecha_actualizacion',
		'fecha_validacion',
		'nota'
	];
}
