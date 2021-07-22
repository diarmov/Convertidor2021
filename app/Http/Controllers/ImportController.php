<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\FraccionIvImport;
use App\Imports\FraccionViiiImport;
use Excel;
use Validator;
use Redirect;
use App\Models\Fraccioniv;
use App\Models\Fraccionviii;
use App\Models\FormatoDescarga;
use DB;
use Auth;

class ImportController extends Controller
{

    public function importExcel(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'file' => 'required|mimetypes:application/Excel,application/vnd.ms-Excel,application/vnd.msexcel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xls,xlsx|max:500000',
        ]);
        //dd($validator);


        if ($validator->fails()) {
            //dd('error porque no coincide el formato');
            return redirect()->back()->with('error', 'El formato que intentas importar no coincide, debe de ser xlsx o xls.');

        }else{
                $fraccion=$request->input('fraccion');
                $iduser = Auth::user()->id;
                $iddep = Auth::user()->iddependencia;

                $depen=DB::table('dependencia')
                ->select('nombre_corto')
                ->where('id_dependencia','=',$iddep)
                ->first();
                //$request->file('file');


            switch ($fraccion) {
                case 1:
                    $var=Excel::Import(new FraccionIvImport,$request->file('file'));

                    $frac=DB::table('fraccion')
                    ->select('fraccion')
                    ->where('idfraccion','=',1)
                    ->first();
                    //dd($frac->fraccion);

                    $nombre=$frac->fraccion."-".$depen->nombre_corto;

                    $idformato=DB::table('fraccioniv')
                    ->select('idupload')
                    ->where('iduser','=',$iduser)
                    ->where('iddependencia','=',$iddep)
                    ->get()
                    ->last();



                    if($idformato==Null){
                   $idupload=$idformato;
                 }
                 else{
                        $idupload=$idformato->idupload;
                    }


                    FormatoDescarga::create([
                        'iduser' => $iduser,
                        'iddependencia' => $iddep,
                        'ruta' => 'fraccioniv',
                        'idformato' => $idformato->idupload,
                        'nombre_archivo' => $nombre
                    ]);

                break;
                case 2:

                    $var=Excel::Import(new FraccionViiiImport,$request->file('file'));

                    $frac=DB::table('fraccion')
                    ->select('fraccion')
                    ->where('idfraccion','=',2)
                    ->first();
                    //dd($frac->fraccion);

                    $nombre=$frac->fraccion."-".$depen->nombre_corto;

                     $idformato=DB::table('fraccionviii')
                            ->select('idupload')
                            ->where('iduser','=',$iduser)
                            ->where('iddependencia','=',$iddep)
                            ->get()
                            ->last();

                            if($idformato==Null){
                           $idupload=$idformato;
                         }
                     else{
                            $idupload=$idformato->idupload;
                        }

                    FormatoDescarga::create([
                        'iduser' => $iduser,
                        'iddependencia' => $iddep,
                        'ruta' => 'fraccionviii',
                        'idformato' => $idformato->idupload,
                        'nombre_archivo' => $nombre
                    ]);

                    break;
                case 3:
                    $var=Excel::Import(new FraccionIxImport,$request->file('file'));

                    $frac=DB::table('fraccion')
                    ->select('fraccion')
                    ->where('idfraccion','=',3)
                    ->first();
                    //dd($frac->fraccion);

                    $nombre=$frac->fraccion."-".$depen->nombre_corto;

                     $idformato=DB::table('fraccionix')
                            ->select('idupload')
                            ->where('iduser','=',$iduser)
                            ->where('iddependencia','=',$iddep)
                            ->get()
                            ->last();

                            if($idformato==Null){
                           $idupload=$idformato;
                         }
                     else{
                            $idupload=$idformato->idupload;
                        }

                    FormatoDescarga::create([
                        'iduser' => $iduser,
                        'iddependencia' => $iddep,
                        'ruta' => 'fraccionix',
                        'idformato' => $idformato->idupload,
                        'nombre_archivo' => $nombre
                    ]);

                    break;
                case 4:
                    $var=Excel::Import(new FraccionXiiiImport,$request->file('file'));
                    break;
                case 5:
                    $var=Excel::Import(new FraccionXvaImport,$request->file('file'));
                    break;
                case 6:
                    $var=Excel::Import(new FraccionXvbImport,$request->file('file'));
                    break;
                case 7:
                    $var=Excel::Import(new FraccionXviiiImport,$request->file('file'));
                    break;
                case 8:
                    $var=Excel::Import(new FraccionXixImport,$request->file('file'));
                    break;
                case 9:
                    $var=Excel::Import(new FraccionXxImport,$request->file('file'));
                    break;
                case 10:
                    $var=Excel::Import(new FraccionXxiaImport,$request->file('file'));
                    break;
                case 11:
                    $var=Excel::Import(new FraccionXxibImport,$request->file('file'));
                    break;
                case 12:
                    $var=Excel::Import(new FraccionXxiiiaImport,$request->file('file'));
                    break;
                case 13:
                    $var=Excel::Import(new FraccionXxiiibImport,$request->file('file'));
                    break;
                case 14:
                    $var=Excel::Import(new FraccionXxiiicImport,$request->file('file'));
                    break;
                case 15:
                    $var=Excel::Import(new FraccionXxviiiaImport,$request->file('file'));
                    break;
                case 16:
                    $var=Excel::Import(new FraccionXxviiibImport,$request->file('file'));
                    break;
                case 17:
                    $var=Excel::Import(new FraccionXxxiiiImport,$request->file('file'));
                    break;
                case 18:
                    $var=Excel::Import(new FraccionXxxvaImport,$request->file('file'));
                    break;
                case 19:
                    $var=Excel::Import(new FraccionXxxxviiaImport,$request->file('file'));
                    break;
                case 20:
                    $var=Excel::Import(new FraccionXliaImport,$request->file('file'));
                    break;
                case 21:
                    $var=Excel::Import(new FraccionXlibImport,$request->file('file'));
                    break;
                case 22:
                    $var=Excel::Import(new FraccionXlicImport,$request->file('file'));
                    break;
                case 23:
                    $var=Excel::Import(new FraccionXlidImport,$request->file('file'));
                    break;
                case 24:
                    $var=Excel::Import(new FraccionXlvImport,$request->file('file'));
                    break;
            }



        //dd('aqui entra porque si coincie el xlsx');
           // $var=Excel::Import(new FraccionIvImport,$request->file('file'));

           // dd($var);

           return Redirect::to('/home')->with('success', 'Información cargada correctamente');

        }

    }


}
