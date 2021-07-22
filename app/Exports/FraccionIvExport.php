<?php

namespace App\Exports;

//use App\fraccioniv;
use Maatwebsite\Excel\Concerns\FromView;
use DB;
use App\Models\Fraccioniv;
use Maatwebsite\Excel\Concerns\Exportable;
use Request;
use Illuminate\Contracts\View\View;
use Auth;


class FraccionIvExport implements FromView
{

    use Exportable;

        public $id;

            public function __construct($id)
            {
                $this->id = $id; // errro en en linea
            }

       public function view(): View{
        $id=$this->id;
        $iduser = Auth::user()->id;
        $iddep = Auth::user()->iddependencia;


        $fractions=DB::table('fraccioniv')
        ->select('*')
        ->join('formato_descarga','formato_descarga.idformato','=','fraccioniv.idupload')
        ->where('fraccioniv.iduser','=',$iduser)
        ->where('fraccioniv.iddependencia','=',$iddep)
        ->where('formato_descarga.iddescarga','=',$id)
        ->get();

        //dd($fraccionivs);



        return view('/export.fraccioniv',compact('fractions'));

    }

}
