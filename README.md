# fieldsValidator
 #### _Javascript library to validate and format inputs_

The library has two main classes:
    
    FieldsValidator
    FieldFormatter
   
## FieldsValidator Class
**FieldsValidator** takes a two-position array as an argument. 
  
  The first argument which is also an array has the ids of the fields that will be validated and the second argument has the ids of the fields that will not need to be validated.

~~~javascript
const fieldsToValidate = [
        'nome',
        'email',
        'senha',
        'confirmaSenha',
        'numero',
        'data',
        'telefone',
        'telefone2',
        'celular',
        'cpf',
        'cpf_solicitante',
        'cnpj',
        'cep',
        'endereco'
    ]

    const optionalFields = ['nome', 'email']

    const fieldValidator = new FieldsValidator([fieldsToValidate, optionalFields])
~~~

To verify that the fields are filled in correctly, use the method **_validade()_**

~~~javascript
fieldValidator.validate()
~~~

## FieldFormatter Class
**FieldFormatter** is a class with static methods. Its methods are:

    cpfFormatter
    phoneFormatter
    cepFormatter
    numberFormatter

To use FieldFormatter, you need to pass the HTML element by parameter to the method:
~~~javascript
FieldFormatter.phoneFormatter(element)
~~~

You can also use FieldFormatter to format input while the user is typing:

~~~html
<form>
  <input id="celular" type="tel" placeholder="Celular" onkeyup="FieldFormatter.phoneFormatter(this)">
  <input type="submit" value="Send">
</form>
~~~
