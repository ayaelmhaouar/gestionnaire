@extends('app')

@section('content')
    <h1 style="text-align:center; color:#333;">Tableau de bord</h1>

    <div style="max-width:400px; margin:auto; background:#fff; padding:20px; border-radius:12px; box-shadow:0 4px 8px rgba(0,0,0,0.1);">
        <p><strong>Nom :</strong> {{ Auth::user()->name }}</p>
        <p><strong>E-mail :</strong> {{ Auth::user()->email }}</p>
    </div>
@endsection


