import budgetTypesEnum from '../../enums/budgetTypes.enum.js';

import html from './html-page.js';

const Register = {
    name: 'Register',
    props: {
        loadingRegisterBudget: {
            required: true
        },

        tags: {
            required: true
        }
    },

    data () {
        return {
            description: '',
            amount: null,
            typeBudget: budgetTypesEnum.GAIN,
            datePicker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            selectedTags: [],
            searchedTag: ''
        };
    },

    template: html,

    computed: {
        disabledRegisterButton() {
            return !this.description || !this.amount;
        },

        isMobile() {
            // Verifica se o tamanho da tela é menor ou igual ao breakpoint `sm`
            return this.$vuetify.breakpoint.smAndDown;
        },
    },

    methods: {
        registerBudget() {
            this.$emit('register-budget', {
                description: this.description,
                amount: this.amount,
                typeBudget: this.typeBudget,
                datePicker: this.datePicker,
                selectedTags: this.selectedTags
            });

            this.description = '';
            this.amount = null;
            this.typeBudget = budgetTypesEnum.GAIN;
            this.selectedTags = [];
        },

        searchInuptTag(newTag) {
            this.searchedTag = newTag?.trim();
        },

        createTag() {
            if (this.searchedTag && !this.tags.some(item => item.toLowerCase() === this.searchedTag.toLowerCase())) {
                this.$emit('register-tag', this.searchedTag);
                this.selectedTags.push(this.searchedTag);

                this.searchedTag = '';
            }
        }
    }
};

export default Register;
