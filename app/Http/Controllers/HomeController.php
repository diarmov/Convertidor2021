<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Excel;
use Validator;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $iduser = Auth::user()->id;
        $iddep = Auth::user()->iddependencia;

        $fracciones=DB::table('fraccion')->get();

        $fractions=DB::table('fraccioniv')
        ->select('*')
        ->where('iduser','=',$iduser)
        ->get();

         $results=DB::table('users')
        ->join('formato_descarga','formato_descarga.iduser','=','users.id')
        ->select('formato_descarga.nombre_archivo','users.iddependencia','formato_descarga.idformato','formato_descarga.iddescarga','formato_descarga.ruta')
        ->where('users.id','=',$iduser)
        ->get();

//        dd($results);

        return view('home', compact('fracciones','fractions','results'));
    }

    public function delete($iddescarga){
        //dd('aqui venimos a borrar');
        $iddep= Auth::user()->iddependencia;
        $iduser= Auth::user()->id;

       // dd($iddep,$iduser,$iddescarga);

        if($iddescarga!=Null){

        $formato=DB::table('formato_descarga')
        ->select('idformato','ruta')
        ->where('iddescarga','=',$iddescarga)
        ->first();

        $baja=$formato->idformato;
        $fracc=$formato->ruta;
        //dd($fracc);

        switch($fracc){
            case 'fraccioniv':
                $borra = DB::table('fraccioniv')
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=', $iddep)
                ->where('idupload','=',$baja)
                ->delete();
            break;

            case 'fraccionviii':
                $borra = DB::table('fraccionviii')
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=', $iddep)
                ->where('idupload','=',$baja)
                ->delete();
            break;

            case 'fraccionix':
                $borra = DB::table('fraccionix')
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=', $iddep)
                ->where('idupload','=',$baja)
                ->delete();
            break;

            case 'fraccionxiii':
                $borra = DB::table('fraccionxiii')
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=', $iddep)
                ->where('idupload','=',$baja)
                ->delete();
            break;

            case 'fraccionxva':
                $borra = DB::table('fraccionxva')
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=', $iddep)
                ->where('idupload','=',$baja)
                ->delete();
            break;

            case 'fraccionxvb':
                $borra = DB::table('fraccionxvb')
                ->where('iduser','=',$iduser)
                ->where('iddependencia','=', $iddep)
                ->where('idupload','=',$baja)
                ->delete();
            break;

        }



        $borraform = DB::table('formato_descarga')
        ->where('iduser','=',$iduser)
        ->where('iddependencia','=', $iddep)
        ->where('iddescarga','=',$iddescarga)
        ->delete();
        }


        return redirect('/home')->with('warning','Formato eliminado correctamente');


    }
}
