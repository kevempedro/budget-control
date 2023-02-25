new Vue({
    el: '#app',
    vuetify: new Vuetify(),

    data () {
        return {
            deleteDialog: { isOpen: false, id: 0 },
            updateDialog: { isOpen: false, id: 0 },
            description: '',
            descriptionUpdate: '',
            amount: null,
            amountUpdate: null,
            typeBudget: 'gain',
            typeBudgetUpdate: '',
            datePicker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            datePickerUpdate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            budgetItems: JSON.parse(localStorage.getItem('budgetItems')) || [],
            typeBudgetFilter: '',
            datePickerFilter: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            descriptionFilter: ''
        };
    },

    watch: {
        typeBudgetFilter() {
            this.filterBudgetItems();
        },

        datePickerFilter() {
            this.filterBudgetItems();
        },

        descriptionFilter() {
            this.filterBudgetItems();
        }
    },

    methods: {
        disabledRegisterButton() {
            return !this.description || !this.amount;
        },

        disabledUpdateButton() {
            return !this.descriptionUpdate || !this.amountUpdate;
        },

        openDeleteModal(id) {
            this.deleteDialog = {
                isOpen: true,
                id
            };
        },

        openUpdateModal(id) {
            this.updateDialog = {
                isOpen: true,
                id
            };

            this.budgetItems = JSON.parse(localStorage.getItem('budgetItems')) || [];

            const item = this.budgetItems.find(item => (item.id === this.updateDialog.id));

            const currentDateSplited = item.date.split('/');

            if (item) {
                this.descriptionUpdate = item.description;
                this.amountUpdate = item.amount;
                this.typeBudgetUpdate = item.typeBudget;
                this.datePickerUpdate = `${currentDateSplited[1]}-${currentDateSplited[0]}`;
            }
        },

        closeDeleteModal() {
            this.deleteDialog = {
                isOpen: false,
                id: 0
            };
        },

        closeUpdateModal() {
            this.updateDialog = {
                isOpen: false,
                id: 0
            };
        },

        calculateGains() {
            let total = 0;

            this.filterBudgetItems().forEach((item) => {
                if (item.typeBudget === 'gain') {
                    total += Number(item.amount);
                }
            });

            return parseFloat(total).toFixed(2);
        },

        calculateInvestments() {
            let total = 0;

            this.filterBudgetItems().forEach((item) => {
                if (item.typeBudget === 'investment') {
                    total += Number(item.amount);
                }
            });

            return parseFloat(total).toFixed(2);
        },

        calculateCosts() {
            let total = 0;

            this.filterBudgetItems().forEach((item) => {
                if (item.typeBudget === 'cost') {
                    total += Number(item.amount);
                }
            });

            return parseFloat(total).toFixed(2);
        },

        calculateAmountMonth() {
            let total = 0;

            this.filterBudgetItems().forEach((item) => {
                if (item.typeBudget === 'gain') {
                    total += Number(item.amount);
                }

                if (item.typeBudget === 'investment') {
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

        UpdateItemInBudget() {
            this.budgetItems = JSON.parse(localStorage.getItem('budgetItems')) || [];

            const itemIndex = this.budgetItems.findIndex(item => (item.id === this.updateDialog.id));

            if (itemIndex > -1) {
                const datePickerUpdateSplited = this.datePickerUpdate.split('-');

                const budgetItemsUpated = Object.assign(
                    {},
                    this.budgetItems[itemIndex],
                    {
                        description: this.descriptionUpdate,
                        amount: this.amountUpdate,
                        typeBudget: this.typeBudgetUpdate,
                        date: `${datePickerUpdateSplited[1]}/${datePickerUpdateSplited[0]}`
                    }
                );

                this.budgetItems[itemIndex] = budgetItemsUpated;

                localStorage.setItem('budgetItems', JSON.stringify(this.budgetItems));
            }

            this.closeUpdateModal();
        },

        clearFilter() {
            this.typeBudgetFilter = '',
            this.datePickerFilter = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            this.descriptionFilter = ''
        },

        filterBudgetItems() {
            let budgetItemsFiltered = this.budgetItems;

            const datePickerFilterSplited = this.datePickerFilter.split('-');
            budgetItemsFiltered = this.budgetItems.filter(item => item.date === `${datePickerFilterSplited[1]}/${datePickerFilterSplited[0]}`);

            if (this.typeBudgetFilter) {
                budgetItemsFiltered = budgetItemsFiltered.filter(item => item.typeBudget === this.typeBudgetFilter);
            }

            if (this.descriptionFilter) {
                budgetItemsFiltered = budgetItemsFiltered.filter(item => item.description.toLowerCase().includes(this.descriptionFilter.toLowerCase()));
            }

            budgetItemsFiltered.sort(function(a, b) {
                const typeBudgetA = a.typeBudget.toUpperCase();
                const typeBudgetB = b.typeBudget.toUpperCase();

                if (typeBudgetA < typeBudgetB) {
                  return 1;
                }

                if (typeBudgetA > typeBudgetB) {
                  return -1;
                }

                return 0;
            });

            return budgetItemsFiltered;
        },

        returnCardBorderColor(typeBudget) {
            switch(typeBudget) {
                case 'gain':
                    return '#4caf50';
                case 'cost':
                    return '#ff5252';
                case 'investment':
                    return '#2196f3'
                default:
                    return '#9e9e9e';
            }
        },

        returnBorderCardClass(typeBudget) {
            switch(typeBudget) {
                case 'gain':
                    return 'card__gain';
                case 'cost':
                    return 'card__cost';
                case 'investment':
                    return 'card__investment';
                default:
                    return '';
            }
        }
    }
});
