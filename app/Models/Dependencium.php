<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model;

/**
 * Class Dependencium
 * 
 * @property int $id_dependencia
 * @property string $nombre_dependencia
 * @property int $dependencia_tipo_id
 * @property string|null $nombre_corto
 *
 * @package App\Models
 */
class Dependencium extends Model
{
	protected $table = 'dependencia';
	protected $primaryKey = 'id_dependencia';
	public $timestamps = false;

	protected $casts = [
		'dependencia_tipo_id' => 'int'
	];

	protected $fillable = [
		'nombre_dependencia',
		'dependencia_tipo_id',
		'nombre_corto'
	];
}
