<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Maatwebsite\Excel\Facades\Excel;
use App\Exports\FraccionIvExport;
use Excel;

class ExportController extends Controller
{
    public function export()
    {
        //return (new FraccionIvExport)->download('invoices.csv', \Maatwebsite\Excel\Excel::CSV);
        return (new FraccionIvExport)->download('fraccioniv.csv', Excel::CSV, ['Content-Type' => 'text/csv']);
        //return (new FraccionIvExport)->download('fraccioniv.csv', Excel::CSV);
    }
}
