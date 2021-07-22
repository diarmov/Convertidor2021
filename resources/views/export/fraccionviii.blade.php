<!DOCTYPE html>
<html>
<head>

   <meta charset="UTF-8"/>

    <title>Fracción IV</title>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/fontawesome/fontawesome.min.css') }}" rel="stylesheet">
</head>
<body>
<table class="table table-striped">
    <thead>
    <tr>
        <th>Ejercicio</th>
        <th>Fecha de inicio del periodo que se informa</th>
        <th>Fecha de fin del periodo que se informa</th>
        <th>Tipo de integrante del sujeto obligado (catálogo)</th>
        <th>Clave o nivel del puesto</th>
        <th>Denominación o descripción del puesto</th>
        <th>Denominación del cargo</th>
        <th>Área de adscripción</th>
        <th>Nombre (s)</th>
        <th>Primer apellido</th>
        <th>Segundo apellido</th>
        <th>Sexo (catálogo)</th>
        <th>Monto mensual bruto de la remuneración, en tabulador</th>
        <th>Tipo de moneda de la remuneración bruta</th>
        <th>Monto mensual neto de la remuneración, en tabulador</th>
        <th>Tipo de moneda de la remuneración neta </th>
        <th>Denominación de las percepciones adicionales en dinero</th>
        <th>Monto bruto de las percepciones adicionales en dinero</th>
        <th>Monto neto de las percepciones adicionales en dinero</th>
        <th>Tipo de moneda de las percepciones adicionales en dinero </th>
        <th>Periodicidad de las percepciones adicionales en dinero</th>
        <th>Descripción de las percepciones adicionales en especie</th>
        <th>Periodicidad de las percepciones adicionales en especie</th>
        <th>Denominación de los ingresos </th>
        <th>Monto bruto de los ingresos</th>
        <th>Monto neto de los ingresos</th>
        <th>Tipo de moneda de los ingresos</th>
        <th>Periodicidad de los ingresos</th>
        <th>Denominación de los sistemas de compensación </th>
        <th>Monto bruto de los sistemas de compensación</th>
        <th>Monto neto de los sistemas de compensación</th>
        <th>Tipo de moneda de los sistemas de compensación</th>
        <th>Periodicidad de los sistemas de compensación</th>
        <th>Denominación de las gratificaciones </th>
        <th>Monto bruto de las gratificaciones</th>
        <th>Monto neto de las gratificaciones</th>
        <th>Tipo de moneda de las gratificaciones</th>
        <th>Periodicidad de las gratificaciones</th>
        <th>Denominación de las primas </th>
        <th>Monto bruto de las primas</th>
        <th>Monto neto de las primas</th>
        <th>Tipo de moneda de las primas</th>
        <th>Periodicidad de las primas</th>
        <th>Denominación de las comisiones </th>
        <th>Monto bruto de las comisiones</th>
        <th>Monto neto de las comisiones</th>
        <th>Tipo de moneda de las comisiones</th>
        <th>Periodicidad de las comisiones</th>
        <th>Denominación de las dietas </th>
        <th>Monto bruto de las dietas</th>
        <th>Monto neto de las dietas</th>
        <th>Tipo de moneda de las dietas</th>
        <th>Periodicidad de las dietas</th>
        <th>Denominación de los bonos </th>
        <th>Monto bruto de los bonos</th>
        <th>Monto neto de los bonos</th>
        <th>Tipo de moneda de los bonos</th>
        <th>Periodicidad de los bonos</th>
        <th>Denominación de los estímulos </th>
        <th>Monto bruto de los estímulos</th>
        <th>Monto neto de los estímulos</th>
        <th>Tipo de moneda de los estímulos</th>
        <th>Periodicidad de los estímulos</th>
        <th>Denominación de los apoyos económicos </th>
        <th>Monto bruto de los apoyos económicos</th>
        <th>Monto neto de los apoyos económicos</th>
        <th>Tipo de moneda de los apoyos económicos</th>
        <th>Periodicidad de los apoyos económicos</th>
        <th>Denominación de las prestaciones económicas </th>
        <th>Monto bruto de las prestaciones económicas</th>
        <th>Monto neto de las prestaciones económicas</th>
        <th>Tipo de moneda de las prestaciones económicas</th>
        <th>Periodicidad de las prestaciones económicas</th>
        <th>Descripción de las prestaciones en especie</th>
        <th>Periodicidad de las prestaciones en especie</th>
        <th>Área(s) responsable(s) que genera(n), posee(n), publica(n) y actualiza(n) la información</th>
        <th>Fecha de actualización de la información</th>
        <th>Fecha de validación de la información</th>
        <th>Nota</th>
    </tr>
    </thead>
    <tbody>
    @foreach($fractions as $frac)
        <tr>
            <td>{{ $frac->ejercicio }}</td>
            <td>{{ $frac->fecha_inicio }}</td>
            <td>{{ $frac->fecha_termino }}</td>
            <td>{{ $frac->tipo_integrante }}</td>
            <td>{{ $frac->nivel_puesto }}</td>
            <td>{{ $frac->desc_puesto }}</td>
            <td>{{ $frac->denomina_cargo }}</td>
            <td>{{ $frac->area_adscrip }}</td>
            <td>{{ $frac->nombre }}</td>
            <td>{{ $frac->primer_ape }}</td>
            <td>{{ $frac->segundo_ape }}</td>
            <td>{{ $frac->sexo }}</td>
            <td>{{ $frac->monto_mens_bruto }}</td>
            <td>{{ $frac->tipo_moneda_bruta }}</td>
            <td>{{ $frac->monto_mens_neto }}</td>
            <td>{{ $frac->tipo_moneda_neto }}</td>
            <td>{{ $frac->denomina_pers_adic }}</td>
            <td>{{ $frac->monto_bruto_pers_adic }}</td>
            <td>{{ $frac->monto_neto_pers_adic }}</td>
            <td>{{ $frac->tipo_moneda_pers_adic }}</td>
            <td>{{ $frac->peridicidad_pers_adic }}</td>
            <td>{{ $frac->desc_percep_adi_especie }}</td>
            <td>{{ $frac->period_percep_adi_especie }}</td>
            <td>{{ $frac->denomina_ingresos }}</td>
            <td>{{ $frac->monto_bruto_ingresos }}</td>
            <td>{{ $frac->monto_neto_ingresos }}</td>
            <td>{{ $frac->tipo_moneda_ingresos }}</td>
            <td>{{ $frac->peridicidad_ingresos }}</td>
            <td>{{ $frac->denomina_sist_compe }}</td>
            <td>{{ $frac->monto_bruto_sist_compe }}</td>
            <td>{{ $frac->monto_neto_sist_compe }}</td>
            <td>{{ $frac->tipo_moneda_sist_compe }}</td>
            <td>{{ $frac->peridicidad_sist_compe }}</td>
            <td>{{ $frac->denomina_gratifica }}</td>
            <td>{{ $frac->monto_bruto_gratifica }}</td>
            <td>{{ $frac->monto_neto_gratifica }}</td>
            <td>{{ $frac->tipo_moneda_gratifica }}</td>
            <td>{{ $frac->peridicidad_gratifica }}</td>
            <td>{{ $frac->denomina_primas }}</td>
            <td>{{ $frac->monto_bruto_primas }}</td>
            <td>{{ $frac->monto_neto_primas }}</td>
            <td>{{ $frac->tipo_moneda_primas }}</td>
            <td>{{ $frac->peridicidad_primas }}</td>
            <td>{{ $frac->denomina_comisiones }}</td>
            <td>{{ $frac->monto_bruto_comisiones }}</td>
            <td>{{ $frac->monto_neto_comisiones }}</td>
            <td>{{ $frac->tipo_moneda_comisiones }}</td>
            <td>{{ $frac->peridicidad_comisiones }}</td>
            <td>{{ $frac->denomina_dietas }}</td>
            <td>{{ $frac->monto_bruto_dietas }}</td>
            <td>{{ $frac->monto_neto_dietas }}</td>
            <td>{{ $frac->tipo_moneda_dietas }}</td>
            <td>{{ $frac->peridicidad_dietas }}</td>
            <td>{{ $frac->denomina_bonos }}</td>
            <td>{{ $frac->monto_bruto_bonos }}</td>
            <td>{{ $frac->monto_neto_bonos }}</td>
            <td>{{ $frac->tipo_moneda_bonos }}</td>
            <td>{{ $frac->peridicidad_bonos }}</td>
            <td>{{ $frac->denomina_estimulos }}</td>
            <td>{{ $frac->monto_bruto_estimulos }}</td>
            <td>{{ $frac->monto_neto_estimulos }}</td>
            <td>{{ $frac->tipo_moneda_estimulos }}</td>
            <td>{{ $frac->peridicidad_estimulos }}</td>
            <td>{{ $frac->denomina_apoyos_econ }}</td>
            <td>{{ $frac->monto_bruto_apoyos_econ }}</td>
            <td>{{ $frac->monto_neto_apoyos_econ }}</td>
            <td>{{ $frac->tipo_moneda_apoyos_econ }}</td>
            <td>{{ $frac->peridicidad_apoyos_econ }}</td>
            <td>{{ $frac->denomina_presta_econ }}</td>
            <td>{{ $frac->monto_bruto_presta_econ }}</td>
            <td>{{ $frac->monto_neto_presta_econ }}</td>
            <td>{{ $frac->tipo_moneda_presta_econ }}</td>
            <td>{{ $frac->peridicidad_presta_econ }}</td>
            <td>{{ $frac->desc_percep_presta_especie }}</td>
            <td>{{ $frac->period_percep_presta_especie }}</td>
            <td>{{ $frac->area_responsable }}</td>
            <td>{{ $frac->fecha_actualizacion }}</td>
            <td>{{ $frac->fecha_validacion }}</td>
            <td>{{ $frac->nota }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>

