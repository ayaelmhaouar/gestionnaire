<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('style.css') }}">
</head>
<body>
    <h1>Ajouter</h1>
    <form action="{{ route("EnregistrerProjet") }}" method="post" enctype="multipart/form-data">
        @csrf
        <table>
            <tr>
                <td><label for="nomP">Nom :</label></td>
                <td><input type="text" id="nomP" name="nomP"></td>
            </tr>
            @error('nomP')
            <tr>
                <td></td>
                <td><span class="error">{{ $message }}</span></td>
            </tr>
            @enderror

            <tr>
                <td><label for="description">Description:</label></td>
                <td><input type="text" id="description" name="description"></td>
            </tr>
            @error('description')
            <tr>
                <td></td>
                <td><span class="error">{{ $message }}</span></td>
            </tr>
            @enderror

            
                <td></td>
                <td><span class="error">{{ $message }}</span></td>
            </tr>
            @enderror

            <tr>
                <td></td>
                <td><input type="submit" value="Ajouter"></td>
            </tr>

            @if(session('msg'))
            <tr>
                <td></td>
                <td><p>{{session('msg')}}</p></td>
            </tr>
            @endif
        </table>
    </form>
</body>
</html>