<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFraccionviiiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fraccionviii', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('idupload')->nullable(); //Ejercicio del perido
            $table->integer('iduser')->nullable(); //Ejercicio del perido
            $table->integer('iddependencia')->nullable(); //Ejercicio del perido
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
            $table->string('sexo',100)->nullable();
            $table->float('monto_mens_bruto')->nullable(); //Monto mensual bruto de la remuneración en tabulador
            $table->string('tipo_moneda_bruta',100)->nullable();
            $table->float('monto_mens_neto')->nullable(); //Monto mensual bruto de la remuneración en tabulador
            $table->string('tipo_moneda_neto',100)->nullable();
            //*************************************************************************************************************************************************
            $table->integer('percep_adi_bruto_neto'); //Percepciones adicionales en dinero, Monto bruto y neto, tipo de moneda y su periodicidad  Tabla_348608
            $table->string('denomina_pers_adic',100)->nullable();
            $table->float('monto_bruto_pers_adic')->nullable();
            $table->float('monto_neto_pers_adic')->nullable();
            $table->string('tipo_moneda_pers_adic',100)->nullable();
            $table->string('peridicidad_pers_adic',100)->nullable();
            //*************************************************************************************************************************************************
            $table->integer('percep_adi_especie'); //Percepciones adicionales en especie y su periodicidad Tabla_348594
            $table->string('desc_percep_adi_especie',100)->nullable();
            $table->string('period_percep_adi_especie',100)->nullable();

            //*************************************************************************************************************************************************
            $table->integer('ingresos_bruto_neto'); //Ingresos, monto bruto y neto, tipo de moneda y su periodicidad Tabla_348609
            $table->string('denomina_ingresos',100)->nullable();
            $table->float('monto_bruto_ingresos')->nullable();
            $table->float('monto_neto_ingresos')->nullable();
            $table->string('tipo_moneda_ingresos',100)->nullable();
            $table->string('peridicidad_ingresos',100)->nullable();

            //*************************************************************************************************************************************************
            $table->integer('sist_compe_bruto_neto'); //Sistemas de compensación, monto bruto y neto, tipo de moneda y su periodicidad Tabla_348578
            $table->string('denomina_sist_compe',100)->nullable();
            $table->float('monto_bruto_sist_compe')->nullable();
            $table->float('monto_neto_sist_compe')->nullable();
            $table->string('tipo_moneda_sist_compe',100)->nullable();
            $table->string('peridicidad_sist_compe',100)->nullable();

            //*************************************************************************************************************************************************
            $table->integer('gratifica_bruto_neto'); //Gratificaciones, monto bruto y neto, tipo de moneda y su periodicidad Tabla_348598
            $table->string('denomina_gratifica',100)->nullable();
            $table->float('monto_bruto_gratifica')->nullable();
            $table->float('monto_neto_gratifica')->nullable();
            $table->string('tipo_moneda_gratifica',100)->nullable();
            $table->string('peridicidad_gratifica',100)->nullable();

            //*************************************************************************************************************************************************
            $table->integer('primas_bruto_neto'); //Primas, monto bruto y neto, tipo de moneda y su periodicidad Tabla_348585
            $table->string('denomina_primas',100)->nullable();
            $table->float('monto_bruto_primas')->nullable();
            $table->float('monto_neto_primas')->nullable();
            $table->string('tipo_moneda_primas',100)->nullable();
            $table->string('peridicidad_primas',100)->nullable();

            //*************************************************************************************************************************************************
            $table->integer('comisiones_bruto_neto'); //Comisiones, monto bruto y neto, tipo de moneda y su periodicidad Tabla_348595
            $table->string('denomina_comisiones',100)->nullable();
            $table->float('monto_bruto_comisiones')->nullable();
            $table->float('monto_neto_comisiones')->nullable();
            $table->string('tipo_moneda_comisiones',100)->nullable();
            $table->string('peridicidad_comisiones',100)->nullable();

            //*************************************************************************************************************************************************
            $table->integer('dietas_bruto_neto'); //Dietas, monto bruto y neto, tipo de moneda y su periodicidad Tabla_348586
            $table->string('denomina_dietas',100)->nullable();
            $table->float('monto_bruto_dietas')->nullable();
            $table->float('monto_neto_dietas')->nullable();
            $table->string('tipo_moneda_dietas',100)->nullable();
            $table->string('peridicidad_dietas',100)->nullable();

            //*************************************************************************************************************************************************
            $table->integer('bonos_bruto_neto'); //Bonos, monto bruto y neto, tipo de moneda y su periodicidad Tabla_348587
            $table->string('denomina_bonos',100)->nullable();
            $table->float('monto_bruto_bonos')->nullable();
            $table->float('monto_neto_bonos')->nullable();
            $table->string('tipo_moneda_bonos',100)->nullable();
            $table->string('peridicidad_bonos',100)->nullable();

            //*************************************************************************************************************************************************
            $table->integer('estimulos_bruto_neto'); //Estímulos, monto bruto y neto, tipo de moneda y su periodicidad Tabla_348606
            $table->string('denomina_estimulos',100)->nullable();
            $table->float('monto_bruto_estimulos')->nullable();
            $table->float('monto_neto_estimulos')->nullable();
            $table->string('tipo_moneda_estimulos',100)->nullable();
            $table->string('peridicidad_estimulos',100)->nullable();

            //*************************************************************************************************************************************************
            $table->integer('apoyos_econ_bruto_neto'); //Apoyos económicos, monto bruto y neto, tipo de moneda y su periodicidad Tabla_348610
            $table->string('denomina_apoyos_econ',100)->nullable();
            $table->float('monto_bruto_apoyos_econ')->nullable();
            $table->float('monto_neto_apoyos_econ')->nullable();
            $table->string('tipo_moneda_apoyos_econ',100)->nullable();
            $table->string('peridicidad_apoyos_econ',100)->nullable();

            //*************************************************************************************************************************************************
            $table->integer('presta_econ_bruto_neto'); //Prestaciones económicas, monto bruto y neto, tipo de moneda y su periodicidad Tabla_348607
            $table->string('denomina_presta_econ',100)->nullable();
            $table->float('monto_bruto_presta_econ')->nullable();
            $table->float('monto_neto_presta_econ')->nullable();
            $table->string('tipo_moneda_presta_econ',100)->nullable();
            $table->string('peridicidad_presta_econ',100)->nullable();

            //*************************************************************************************************************************************************
            $table->integer('presta_especie_bruto_neto'); //Prestaciones en especie y su periodicidad Tabla_348611
            $table->string('desc_percep_presta_especie',100)->nullable();
            $table->string('period_percep_presta_especie',100)->nullable();

            //*************************************************************************************************************************************************
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
        Schema::dropIfExists('fraccionviii');
    }
}
