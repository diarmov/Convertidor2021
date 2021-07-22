<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model;

/**
 * Class Encabezado
 * 
 * @property int $idencabezado
 * @property int|null $campo
 * @property string|null $nombre_encabezado
 *
 * @package App\Models
 */
class Encabezado extends Model
{
	protected $table = 'encabezados';
	protected $primaryKey = 'idencabezado';
	public $timestamps = false;

	protected $casts = [
		'campo' => 'int'
	];

	protected $fillable = [
		'campo',
		'nombre_encabezado'
	];
}
