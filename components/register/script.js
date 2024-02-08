import budgetTypesEnum from '../../enums/budgetTypes.enum.js';

import html from './html-page.js';

const Register = {
    name: 'Register',
    props: {
        loadingRegisterBudget: {
            required: true
        }
    },

    data () {
        return {
            description: '',
            amount: null,
            typeBudget: budgetTypesEnum.GAIN,
            datePicker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        };
    },

    template: html,

    computed: {
        disabledRegisterButton() {
            return !this.description || !this.amount;
        }
    },

    methods: {
        registerBudget() {
            this.$emit('register-budget', {
                description: this.description,
                amount: this.amount,
                typeBudget: this.typeBudget,
                datePicker: this.datePicker
            });

            this.description = '';
            this.amount = null;
            this.typeBudget = budgetTypesEnum.GAIN;
        },
    }
};

export default Register;
