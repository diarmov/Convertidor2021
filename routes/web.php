<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImportController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::post('logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');

Route::get('/home',              [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::post('import-list-excel', [App\Http\Controllers\ImportController::class, 'importExcel'])->name('fraccioniv.import.excel');
Route::get('fraccioniv/export/{id}', [App\Http\Controllers\ExportController::class,'export'])->name('fraccioniv.export.excel');
