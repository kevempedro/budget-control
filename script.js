new Vue({
    el: '#app',
    vuetify: new Vuetify(),

    data () {
        return {
            deleteDialog: { isOpen: false, id: 0 },
            description: '',
            amount: null,
            typeBudget: 'gain',
            datePicker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            budgetItems: JSON.parse(localStorage.getItem('budgetItems')) || []
        };
    },

    methods: {
        disabledButton() {
            return !this.description || !this.amount;
        },

        openDeleteModal(id) {
            this.deleteDialog = {
                isOpen: true,
                id
            };
        },

        closeDeleteModal() {
            this.deleteDialog = {
                isOpen: false,
                id: 0
            };
        },

        calculateGains() {
            let total = 0;

            this.budgetItems.forEach((item) => {
                if (item.typeBudget === 'gain') {
                    total += Number(item.amount);
                }
            });

            return parseFloat(total).toFixed(2);
        },

        calculateCosts() {
            let total = 0;

            this.budgetItems.forEach((item) => {
                if (item.typeBudget === 'cost') {
                    total += Number(item.amount);
                }
            });

            return parseFloat(total).toFixed(2);
        },

        calculateAmountMonth() {
            let total = 0;

            this.budgetItems.forEach((item) => {
                if (item.typeBudget === 'gain') {
                    total += Number(item.amount);
                }

                if (item.typeBudget === 'cost') {
                    total -= Number(item.amount);
                }
            });

            return parseFloat(total).toFixed(2);
        },

        registerBudget() {
            const datePickerSplited = this.datePicker.split('-');

            this.budgetItems = JSON.parse(localStorage.getItem('budgetItems')) || [];

            this.budgetItems.push({
                id: this.budgetItems.length + 1,
                description: this.description,
                amount: parseFloat(this.amount).toFixed(2),
                date: `${datePickerSplited[1]}/${datePickerSplited[0]}`,
                typeBudget: this.typeBudget
            });

            localStorage.setItem('budgetItems', JSON.stringify(this.budgetItems));
        },

        removeItemFromBudget() {
            this.budgetItems = JSON.parse(localStorage.getItem('budgetItems')) || [];

            const itemIndex = this.budgetItems.findIndex(item => (item.id === this.deleteDialog.id));

            if (itemIndex > -1) {
                this.budgetItems.splice(itemIndex, 1);

                localStorage.setItem('budgetItems', JSON.stringify(this.budgetItems));
            }

            this.closeDeleteModal();
        },
    }
});
