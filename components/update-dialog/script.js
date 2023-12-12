import html from './html-page.js';

const UpdateDialog = {
    name: 'UpdateDialog',
    props: {
        isOpen: {
            required: true
        },
        item: {
            required: true,
        },
        loadingUpdateBudget: {
            required: true,
            default: false
        }
    },
    data () {
        return {
            descriptionUpdate: '',
            amountUpdate: null,
            typeBudgetUpdate: '',
            datePickerUpdate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        };
    },

    template: html,

    watch: {
        isOpen(value) {
            if (value) {
                const currentDateSplited = this.item.date.split('/');

                this.descriptionUpdate = this.item.description;
                this.amountUpdate = this.item.amount;
                this.typeBudgetUpdate = this.item.typeBudget;
                this.datePickerUpdate = `${currentDateSplited[1]}-${currentDateSplited[0]}`;
            }
        }
    },

    computed: {
        disabledUpdateButton() {
            return !this.descriptionUpdate || !this.amountUpdate;
        },
    },

    methods: {
        onUpdateBudget() {
            const datePickerUpdateSplited = this.datePickerUpdate.split('-');

            const payload =  {
                description: this.descriptionUpdate,
                amount: this.amountUpdate,
                typeBudget: this.typeBudgetUpdate,
                date: `${datePickerUpdateSplited[1]}/${datePickerUpdateSplited[0]}`
            };

            this.$emit('on-update-budget', payload);
        },

        closeUpdateModal() {
            this.$emit('close-update-modal');
        }
    }
};

export default UpdateDialog;
