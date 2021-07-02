<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Reliese\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;

/**
 * Class User
 * 
 * @property int $id
 * @property int|null $iddependencia
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class User extends Model implements AuthenticatableContract
{
	use Authenticatable;

	protected $table = 'users';

	protected $casts = [
		'iddependencia' => 'int'
	];

	protected $dates = [
		'email_verified_at'
	];

	protected $hidden = [
		'password',
		'remember_token'
	];

	protected $fillable = [
		'iddependencia',
		'name',
		'email',
		'email_verified_at',
		'password',
		'remember_token'
	];
}
