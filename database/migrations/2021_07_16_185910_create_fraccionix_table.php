<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFraccionixTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fraccionix', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('idupload')->nullable(); //id de archivo cargado
            $table->integer('iduser')->nullable(); //id del usuario
            $table->integer('iddependencia')->nullable(); //id de la dependencia
            $table->integer('ejercicio')->nullable(); //Ejercicio del perido
            $table->date('fecha_inicio')->nullable(); //Fecha de inicio del periodo
            $table->date('fecha_termino')->nullable(); //Fecha de fin del periodo
            $table->string('tipo_integrante',100)->nullable();
            $table->string('nivel_puesto',100)->nullable();
            $table->string('desc_puesto',250)->nullable();
            $table->string('denomina_cargo',100)->nullable();
            $table->string('area_adscrip',200)->nullable();
            $table->string('nombre',100)->nullable();
            $table->string('primer_ape',100)->nullable();
            $table->string('segundo_ape',100)->nullable();
            $table->string('tipo_gasto',100)->nullable();
            $table->string('denomina_encargo',100)->nullable();
            $table->string('tipo_viaje',100)->nullable();
            $table->integer('num_personas')->nullable();
            $table->string('importe_ejercido',100)->nullable();
            $table->string('pais_origen_encargo',100)->nullable();
            $table->string('estado_origen_encargo',100)->nullable();
            $table->string('ciudad_origen_encargo',100)->nullable();
            $table->string('pais_destino_encargo',100)->nullable();
            $table->string('estado_destino_encargo',100)->nullable();
            $table->string('ciudad_destino_encargo',100)->nullable();
            $table->string('motivo_encargo',100)->nullable();
            $table->date('fecha_salida_encargo')->nullable(); //Fecha de validación
            $table->date('fecha_regreso_encargo')->nullable(); //Fecha de Actualización
            $table->string('importe_ejer_parti_conc',100)->nullable();
            $table->string('cve_part_concept',100)->nullable();
            $table->string('denom_part_concept',100)->nullable();
            $table->string('importe_ejer_eroga',100)->nullable();
            $table->string('importe_total_eroga',100)->nullable();
            $table->date('fecha_comision_encargo')->nullable(); //Fecha de Actualización
            $table->string('hiper_informe',100)->nullable();
            $table->string('hiper_facturas',100)->nullable();
            $table->string('hiper_normativa',100)->nullable();
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
        Schema::dropIfExists('fraccionix');
    }
}
