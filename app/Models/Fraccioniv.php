<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
//use Reliese\Database\Eloquent\Model;
use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Fraccioniv
 * 
 * @property int $id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int|null $348492
 * @property Carbon|null $348500
 * @property Carbon|null $348501
 * @property string|null $348499
 * @property string|null $348493
 * @property int|null $348503
 * @property string|null $44864
 * @property string|null $44865
 * @property string|null $44866
 * @property string|null $348502
 * @property string|null $348497
 * @property Carbon|null $348494
 * @property Carbon|null $348496
 * @property string|null $348498
 *
 * @package App\Models
 */
class Fraccioniv extends Eloquent
{
	protected $table = 'fraccioniv';
	protected $primaryKey = 'id';

	protected $casts = [
		'iduser'=>'int',
		'iddependencia'=>'int',
		'idupload'=>'int',
		'348492'=>'int',
		'348503'=>'int'
	];

	protected $dates = [
		'348500',
		'348501',
		'348494',
		'348496'
	];

	protected $fillable = [
		'iduser',
		'iddependencia',
		'idupload',
		'348492',
		'348500',
		'348501',
		'348499',
		'348493',
		'348503',
		'44864',
		'44865',
		'44866',
		'348502',
		'348497',
		'348494',
		'348496',
		'348498'
	];
}
