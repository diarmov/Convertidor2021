@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">{{ __('Convertidor Zacatecas') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>

                    @endif

                    <div class="row">
                        <div class="col-4 rounded" style="padding: 3%;">
                            <p style="font-weight:bold; text-align: center;">INSTRUCCIONES</p><br>
                            <p style="color:red"> <b>Nota:</b> Asegúrate de revisar que el documento a convertir esté correctamente llenado, con los formatos oficiales del Portal de Transparencia Zacatecas sin editar los encabezados </p><br>

                            1.- Dar clic en el botón "Cargar documento".<br>

                            2.- Seleccionar la fracción del documento que se va a convertir.<br>

                            3.- Seleccionar el archivo a convertir.<br>

                            Nota. Sí el documento que seleccionas no corresponde a la fracción que elegiste, no podrás convertir el documento.<br>

                            4.- Dar clic en el botón  para convertir el documento.<br>

                            5.- Dar clic en el botón <label class="btn-sm btn-success">.csv<i class="glyphicon glyphicon-download-alt"></i></label>para descargar el documento convertido en csv.<br>


                            <p style="color:red"> <b>NOTAS:</b><br>
                            Los ID(s) de las tablas anidadas no deben iniciar con 0 (cero) u otro carácter<br>
                            Los archivos se eliminarán al cerrar sesión, asegúrate de descargarlos.</p>
                        </div>
                        <div class="col-8" style="align-content: center;">
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-outline-success btn-lg mr-4" data-bs-toggle="modal" data-bs-target="#cargardocumento">
                              Cargar Documento
                            </button>
                            <br>
                            @if (session('success'))
                                <div class="col-sm-12">
                                    <div class="alert  alert-success alert-dismissible fade show" role="alert">
                                        {{ session('success') }}
                                    </div>
                                </div>
                            @endif

                            @if (session('error'))
                                <div class="col-sm-12">
                                    <div class="alert  alert-danger alert-dismissible fade show" role="alert">
                                        {{ session('error') }}
                                    </div>
                                </div>
                            @endif
                            <br>

                             @if(empty($results))
                                        <p class="alert alert-warning">Carga tu información</p>
                             @else
                            <div class="card">
                                <div class="card-body col-sm-12">

                                    <table class="col-sm-12 table table-striped">
                                        <thead>
                                            <tr>
                                                <td style="text-align: center; font-weight: bold;"></td>
                                                <td style="text-align: center; font-weight: bold;">Nombre</td>
                                                <td style="text-align: center; font-weight: bold;">Acción</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($results as $result)
                                            <tr>
                                                <td style="text-align: center">{{ $result->idformato }}</td>
                                                <td style="text-align: center">{{ $result->nombre_archivo }}</td>
                                                <td style="text-align: center"><a href="{{ route('fraccion.export.excel', $result->iddescarga) }}">
                                                    <button class="btn btn-lg btn-success" title="Descargar .csv">
                                                        .csv<i class="glyphicon glyphicon-download-alt"></i>
                                                    </button>
                                                    <a href="{{ route('fraccion.delete', $result->iddescarga) }}" onclicK="confirm('Estas seguro de elimiar este formato')"class="btn btn-lg btn-danger" title="Borrar">
                                                        Borrar<i class="glyphicon glyphicon-trash"></i></a>
                                                </a></td>
                                            </tr>
                                            @endforeach
                                        </tbody>
                                    </table>


                                </div>

                            </div>
                            @endif
                            <!-- Modal -->
                            <div class="modal fade" id="cargardocumento" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title " id="exampleModalLabel">Cargar Documento</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                    <form action="{{ route('fraccion.import.excel') }}" method="POST" enctype="multipart/form-data">
                                        @csrf
                                        <div class="modal-body">
                                                <select name="fraccion" class="form-select" required>
                                                    <option value="">Selecciona la fracción...</option>
                                                    @foreach($fracciones as $frac)
                                                        <option value="{{ $frac->idfraccion }}">{{ $frac->fraccion }}</option>
                                                    @endforeach
                                                </select>
                                                <br>
                                        <input type="file" name="file" required>

                                          </div>
                                          <div class="modal-footer">
                                            <button type="button" class="btn btn-outline-danger btn-lg mr-4" data-bs-dismiss="modal">Cancelar</button>
                                            <input type="submit" class="btn btn-outline-success btn-lg mr-4" value="Convertir Documento" name="Cargar"/>
                                          </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})
</script>
@endsection
