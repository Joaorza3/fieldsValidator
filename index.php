<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fields Validator</title>
</head>
<body>

    <input id="nome" type="text" placeholder="Nome">
    <input id="email" type="text" placeholder="E-mail">
    <input id="senha" type="text" placeholder="Senha">
    <input id="confirmaSenha" type="text" placeholder="Confirmação de Senha">
    <input id="numero" type="number" placeholder="Número" onkeyup="FieldFormatter.numberFormatter(this)">
    <input id="data" type="date" placeholder="Data">
    <input id="telefone" type="tel" placeholder="Telefone" onkeyup="FieldFormatter.phoneFormatter(this)">
    <input id="telefone2" type="tel" placeholder="Telefone2" onkeyup="FieldFormatter.phoneFormatter(this)">
    <input id="celular" type="tel" placeholder="Celular" onkeyup="FieldFormatter.phoneFormatter(this)">
    <input id="cpf" type="text" placeholder="CPF" onkeyup="FieldFormatter.cpfFormatter(this)">
    <input id="cnpj" type="text" placeholder="CNPJ" onkeyup="FieldFormatter.cnpjFormatter(this)">
    <input id="cep" type="text" placeholder="CEP" onkeyup="FieldFormatter.cepFormatter(this)">

    <br>
    <br>
    <br>
    <br>

    <input id="cpf_solicitante" type="text" placeholder="CPF" onkeyup="FieldFormatter.cpfFormatter(this)">
    <input id="endereco" type="text" placeholder="Endereço">

    <button onclick="validate()" id="validar">Validar</button>
    
    <script src="./fieldsValidator.js"></script>
    
</body>
</html>