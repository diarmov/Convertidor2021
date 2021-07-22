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
        <th>Denominación del área</th>
        <th>Descripción breve y clara de cada objetivo institucional</th>
        <th>Indicadores asociados por cada objetivo</th>
        <th>Meta(s) por cada indicador</th>
        <th>Unidad de medida por cada meta</th>
        <th>Hipervínculo al documento del o los programas operativos, presupuestarios, sectoriales, entre otros</th>
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
            <td>{{ $frac->denomina_area }}</td>
            <td>{{ $frac->desc_objet }}</td>
            <td>{{ $frac->indica_asociado }}</td>
            <td>{{ $frac->meta_indicador }}</td>
            <td>{{ $frac->unidad_medida }}</td>
            <td>{{ $frac->hipervinculo }}</td>
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

