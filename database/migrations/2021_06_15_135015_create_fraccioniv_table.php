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
            $table->integer('ejercicio')->nullable(); //Ejercicio del perido
            $table->date('fecha_inicio')->nullable(); //Fecha de inicio del periodo
            $table->date('fecha_termino')->nullable(); //Fecha de fin del periodo
            $table->string('denomina_area',100)->nullable(); //Denominación del área
            $table->string('desc_objet',200)->nullable(); //Descripción breve y clara de cada objetivo institucional
            $table->string('indica_y_metas')->nullable(); //"Indicadores y metas asociados a cada objetivo Tabla_348503
            $table->string('indica_asociado',100)->nullable(); //Indicadores asociados
            $table->string('meta_indicador',100)->nullable(); //Meta del indicador
            $table->string('unidad_medida',100)->nullable(); //Unidad de medida
            $table->string('hipervinculo',100)->nullable(); //Hipervínculo al documento del o los programas operativos, presupuestarios, sectoriales, entre otros
            $table->string('area_responsable',100)->nullable(); //Área(s) responsable(s) que genera(n), posee(n), publica(n) y actualizan la información
            $table->date('fecha_validacion')->nullable(); //Fecha de validación
            $table->date('fecha_actualizacion')->nullable(); //Fecha de Actualización
            $table->string('nota',200)->nullable(); //Nota
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
