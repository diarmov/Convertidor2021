<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Concerns\Exportable;
use App\Exports\FraccionIvExport;
use App\Exports\FraccionViiiExport;
use Excel;
use DB;

class ExportController extends Controller
{

    use Exportable;

    public function export($id)
    {

        //dd($id);
        $fraccion=DB::table('formato_descarga')
        ->select('ruta','nombre_archivo')
        ->where('iddescarga','=',$id)
        ->first();


        $nomchivo=$fraccion->nombre_archivo;
        //dd($nomchivo);

        switch ($fraccion->ruta) {
                case 'fraccioniv':
                    $frac=(new FraccionIvExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionviii':

                //dd('aqui va en fracción 8');
                $frac=(new FraccionViiiExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionix':

                dd('aqui va en fracción 9');
                $frac=(new FraccionIxExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxiii':

                dd('aqui va en fracción 13');
                $frac=(new FraccionXiiiExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxva':

                dd('aqui va en fracción 15a');
                $frac=(new FraccionXvaExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxvb':

                dd('aqui va en fracción 15b');
                $frac=(new FraccionXvbExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxvii':

                dd('aqui va en fracción 17');
                $frac=(new FraccionXviiExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxix':

                dd('aqui va en fracción 19');
                $frac=(new FraccionXixExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxx':

                dd('aqui va en fracción 20');
                $frac=(new FraccionXxExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxxia':

                dd('aqui va en fracción 21a');
                $frac=(new FraccionXxiaExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxxib':

                dd('aqui va en fracción 21b');
                $frac=(new FraccionXxibExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxxiiia':

                dd('aqui va en fracción 23a');
                $frac=(new FraccionXxiiiaExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxxiiib':

                dd('aqui va en fracción 23b');
                $frac=(new FraccionXxiiibExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxxiiic':

                dd('aqui va en fracción 23c');
                $frac=(new FraccionXxiiicExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxxviiia':

                dd('aqui va en fracción 28a');
                $frac=(new FraccionXxviiiaExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxxviiib':

                dd('aqui va en fracción 28b');
                $frac=(new FraccionXxviiibExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxxxiii':

                dd('aqui va en fracción 33');
                $frac=(new FraccionXxxiiiExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxxxv':

                dd('aqui va en fracción 35');
                $frac=(new FraccionXxxvExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxxxvii':

                dd('aqui va en fracción 37');
                $frac=(new FraccionXxxviiExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxlia':

                dd('aqui va en fracción 41a');
                $frac=(new FraccionXliaExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxlib':

                dd('aqui va en fracción 41b');
                $frac=(new FraccionXlibExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxlic':

                dd('aqui va en fracción 41c');
                $frac=(new FraccionXlicExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxlid':

                dd('aqui va en fracción 41d');
                $frac=(new FraccionXlidExport($id))->download($nomchivo.'.csv');

                  break;

                case 'fraccionxlv':

                dd('aqui va en fracción 45');
                $frac=(new FraccionXlvExport($id))->download($nomchivo.'.csv');

                  break;
            }

        return  $frac;
    }
}
