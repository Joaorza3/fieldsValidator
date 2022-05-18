function validate() {
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
    console.log(fieldValidator.validate())
}

class FieldsValidator {
    constructor(fieldsList) {
        this.fieldsList = this.getFieldById(fieldsList[0])
        this.notValidateList = fieldsList[1] || []
        this.fieldsValids = true;
    }

    getFieldById(arrayIds) {
        const fields = [];
        arrayIds.forEach(id => {
            fields.push(document.getElementById(id));
        })
        return fields;
    }

    validate() {
        this.fieldsList.forEach(field => {

            field.value = field.value.trim()

            if (!this.notValidateList.includes(field.id)) {
                if (field.value.trim().length === 0) {
                    this.temporaryRedBorders(field)
                    this.fieldsValids = false;
                }
                this.fieldFormatter(field)
            }
        })
        return this.fieldsValids;
    }

    temporaryRedBorders(field) {
        field.style.borderColor = 'red';
        field.addEventListener('blur', () => {
            field.style.borderColor = '';
        })
    }

    fieldFormatter(field) {
        this.fieldLengthValidate(field)
        return field
    }

    emailValidate(field) {
        const email = field.value
        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            this.temporaryRedBorders(field)
            this.fieldsValids = false;
        }
    }

    fieldLengthValidate(field) {
        const fieldId = field.id
        this.doFormat(field)

        if (fieldId === 'numero') {
            field.addEventListener('keyup', (e) => {
                FieldFormatter.numberFormatter(e.target)
            })
        }

        const fieldLength = field.value.length

        const validationSettings = [
            { id: 'nome', minLength: 3, maxLength: null, },
            { id: 'email', minLength: 5, maxLength: null, },
            { id: 'senha', minLength: 6, maxLength: null, },
            { id: 'confirmaSenha', minLength: 6, maxLength: null, },
            { id: 'numero', minLength: 1, maxLength: null, },
            { id: 'data', minLength: 10, maxLength: null, },
            { id: 'telefone', minLength: 15, maxLength: 17, },
            { id: 'celular', minLength: 15, maxLength: 17, },
            { id: 'cpf', minLength: 11, maxLength: 14, },
            { id: 'cnpj', minLength: 14, maxLength: null, },
            { id: 'cep', minLength: 10, maxLength: 11, },
            { id: 'endereco', minLength: 3, maxLength: null, }
        ]

        validationSettings.forEach(setting => {
            if (fieldId.includes(setting.id)) {
                if (fieldLength < setting.minLength) {
                    this.temporaryRedBorders(field)
                    this.fieldsValids = false;
                }
                if (fieldLength > setting.maxLength && setting.maxLength) {
                    this.temporaryRedBorders(field)
                    field.value = field.value.slice(0, setting.maxLength + 1)
                    this.fieldsValids = false;
                }
            }

        })
    }

    doFormat(field) {
        const fieldId = field.id

        fieldId.includes('cpf') ? field.value = FieldFormatter.cpfFormatter(field) : null
        fieldId.includes('cnpj') ? field.value = FieldFormatter.cnpjFormatter(field) : null
        fieldId.includes('telefone') ? field.value = FieldFormatter.phoneFormatter(field) : null
        fieldId.includes('celular') ? field.value = FieldFormatter.phoneFormatter(field) : null
        fieldId.includes('cep') ? field.value = FieldFormatter.cepFormatter(field) : null
        fieldId.includes('email') && this.emailValidate(field)

        if (fieldId.includes('senha') || fieldId.includes('confirmaSenha')) {

            try {
                const senha = document.getElementById('senha')
                const confirmaSenha = document.getElementById('confirmaSenha')

                if (senha.value != confirmaSenha.value) {
                    this.temporaryRedBorders(senha)
                    this.temporaryRedBorders(confirmaSenha)

                    console.log('senhas não conferem' + senha.value + ' | ' + confirmaSenha.value);
                    this.fieldsValids = false;
                } else {
                    senha.style.borderColor = '';
                    confirmaSenha.style.borderColor = '';
                }

            } catch (e) {}
        }
    }
}

class FieldFormatter {
    static cpfFormatter(field) {
        field.value = field.value.replace(/\D/g, '');
        field.value = field.value.replace(/(\d{3})(\d)/, '$1.$2');
        field.value = field.value.replace(/(\d{3})(\d)/, '$1.$2');
        field.value = field.value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        if (field.value.length > 14) {
            setTimeout(_ => {
                field.value = field.value.slice(0, 14)
            }, 500)
        }

        return field.value;
    }
    static cnpjFormatter(field) {
        field.value = field.value.replace(/\D/g, '');
        field.value = field.value.replace(/(\d{2})(\d)/, '$1.$2');
        field.value = field.value.replace(/(\d{3})(\d)/, '$1.$2');
        field.value = field.value.replace(/(\d{3})(\d)/, '$1/$2');
        field.value = field.value.replace(/(\d{4})(\d)/, '$1-$2');
        return field.value;
    }
    static phoneFormatter(field) {
        field.value = field.value.replace(/\D/g, '');
        field.value = field.value.replace(/(\d{2})(\d)/, '($1) $2');
        field.value = field.value.replace()
        field.value = field.value.replace(/(\d{5})(\d)/, '$1-$2');


        if (field.value.length >= 15) {
            setTimeout(_ => {
                field.value = field.value.slice(0, 15)
            }, 500)

        }

        return field.value;
    }
    static cepFormatter(field) {
        field.value = field.value.replace(/\D/g, '');
        field.value = field.value.replace(/(\d{2})(\d)/, '$1.$2');
        field.value = field.value.replace(/(\d{3})(\d)/, '$1-$2');

        if (field.value.length > 10) {
            setTimeout(_ => {
                field.value = field.value.slice(0, 10)
            }, 500)
        }

        return field.value;
    }
    static numberFormatter(field) {
        let fieldText = field.value
        const regex = /[^0-9\.]/gi
        const haveAnotherDot = fieldText.match(/\./g)

        if (haveAnotherDot && haveAnotherDot.length > 1) {
            field.value = fieldText.slice(0, -1)
        } else {
            field.value = fieldText.replace(regex, '')
        }
        return field.value;
    }
}