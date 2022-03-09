<?php

namespace App\Http\Controllers\Vuex\Payment;

use App\Http\Controllers\Controller;
use App\Http\Models\Common\Payments;
use App\Traits\VuexAutoMethods;

class PaymentController extends Controller
{
    use VuexAutoMethods;

    //*** root route
    public function index()
    {
        return view('vuex.payment.payment', ['settings' => $this->settings()]);
    }

    //*** api
    public function initPayments()
    {
        return [
            'payments' => $this->payments()
        ];
    }

    //*** inner methods

    private function payments(){
        return Payments::vuexFilter()->paginate(request('per_page'));
    }


}
