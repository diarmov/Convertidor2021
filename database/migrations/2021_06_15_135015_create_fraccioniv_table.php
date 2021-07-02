<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFraccionivTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fraccioniv', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('348492'); //Ejercicio del perido
            $table->date('348500'); //Fecha de inicio del periodo
            $table->date('348501'); //Fecha de fin del periodo
            $table->string('348499',100); //Denominación del área
            $table->string('348493',200); //Descripción breve y clara de cada objetivo institucional
            //$table->string('348503'); //"Indicadores y metas asociados a cada objetivo Tabla_348503
            $table->string('44864',100); //Indicadores asociados
            $table->string('44865',100); //Meta del indicador
            $table->string('44866',100); //Unidad de medida
            $table->string('348502',100); //Hipervínculo al documento del o los programas operativos, presupuestarios, sectoriales, entre otros
            $table->string('348497',100); //Área(s) responsable(s) que genera(n), posee(n), publica(n) y actualizan la información
            $table->date('348494'); //Fecha de validación
            $table->date('348496'); //Fecha de Actualización
            $table->string('348498',200); //Nota
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fraccioniv');
    }
}
