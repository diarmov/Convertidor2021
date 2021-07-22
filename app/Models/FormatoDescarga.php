<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model;

/**
 * Class FormatoDescarga
 * 
 * @property int $iddescarga
 * @property int|null $iduser
 * @property int|null $iddependencia
 * @property int|null $idformato
 * @property string|null $nombre_archivo
 *
 * @package App\Models
 */
class FormatoDescarga extends Model
{
	protected $table = 'formato_descarga';
	protected $primaryKey = 'iddescarga';
	public $timestamps = false;

	protected $casts = [
		'iduser' => 'int',
		'iddependencia' => 'int',
		'idformato' => 'int'
	];

	protected $fillable = [
		'iduser',
		'iddependencia',
		'idformato',
		'ruta',
		'nombre_archivo'
	];
}
