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
        ->select('formato_descarga.nombre_archivo','users.iddependencia','formato_descarga.idformato')
        ->where('users.id','=',$iduser)
        ->get();

//        dd($results);

        return view('home', compact('fracciones','fractions','results'));
    }
}
