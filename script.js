import { getDatabase, ref, child, get, set, update, remove  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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
            budgetItems: [],
            typeBudgetFilter: '',
            datePickerFilter: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            descriptionFilter: '',
            dataBase: getDatabase(),
            tableName: 'budgets',
            loadingRegisterBudget: false,
            loadingUpdateBudget: false,
            loadingDeleteBudget: false,
            amountOfTheCurrentYear: 0,
            currentYear: new Date().getFullYear(),
            years: ['2023', '2024', '2025'],
            yearSelected: ''
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

    created() {
        this.yearSelected = this.currentYear
        this.getBudgetItems();
    },

    computed: {
        disabledRegisterButton() {
            return !this.description || !this.amount;
        },

        disabledUpdateButton() {
            return !this.descriptionUpdate || !this.amountUpdate;
        }
    },

    methods: {
        openDeleteModal(id) {
            this.deleteDialog = {
                isOpen: true,
                id
            };
        },

        async openUpdateModal(id) {
            this.updateDialog = {
                isOpen: true,
                id
            };

            const item = await this.getBudgetItemById(id);

            if (item) {
                const currentDateSplited = item.date.split('/');

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

        clearFilter() {
            this.typeBudgetFilter = '',
            this.datePickerFilter = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            this.descriptionFilter = ''
        },

        calculateGains() {
            let total = 0;

            this.filterBudgetItems().forEach((item) => {
                if (item.typeBudget === 'gain') {
                    total += Number(item.amount);
                }
            });

            return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        },

        calculateInvestments() {
            let total = 0;

            this.filterBudgetItems().forEach((item) => {
                if (item.typeBudget === 'investment') {
                    total += Number(item.amount);
                }
            });

            return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        },

        calculateCosts() {
            let total = 0;

            this.filterBudgetItems().forEach((item) => {
                if (item.typeBudget === 'cost') {
                    total += Number(item.amount);
                }
            });

            return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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

            return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        },

        resultsOfTheYear() {
            const budgetItemsInCurrentYear = this.budgetItems.filter(budget => budget.date.includes(`/${this.yearSelected.toString()}`));

            this.amountOfTheCurrentYear = budgetItemsInCurrentYear.reduce((acc, budget) => {
                acc += Number(budget.amount)

                return acc;
            }, 0)

            return [
                {
                    title: 'Ganhos',
                    color: '#4caf50',
                    total: budgetItemsInCurrentYear.reduce((acc, budget) => {
                        if (budget.typeBudget === 'gain') {
                            acc += Number(budget.amount)
                        }

                        return acc;
                    }, 0)
                },
                {
                    title: 'Investimentos',
                    color: '#2196f3',
                    total: budgetItemsInCurrentYear.reduce((acc, budget) => {
                        if (budget.typeBudget === 'investment') {
                            acc += Number(budget.amount);
                        }

                        return acc;
                    }, 0)
                },
                {
                    title: 'Despesas',
                    color: '#ff5252',
                    total: budgetItemsInCurrentYear.reduce((acc, budget) => {
                        if (budget.typeBudget === 'cost') {
                            acc += Number(budget.amount)
                        }

                        return acc;
                    }, 0)
                }
            ];
        },

        getBudgetItems() {
            get(child(ref(this.dataBase), this.tableName))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    this.budgetItems = snapshot.val();
                } else {
                    console.log("Erro ao retornar os registros");
                }
            }).catch((error) => {
                console.error(error);
            });
        },

        async getBudgetItemById(id) {
            let data = null;

            await get(child(ref(this.dataBase), `${this.tableName}/${id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    data = snapshot.val();
                } else {
                    console.log("Erro ao retornar o registro");
                }
            }).catch((error) => {
                console.error(error);
            });

            return data;
        },

        registerBudget() {
            this.loadingRegisterBudget = true;

            const datePickerSplited = this.datePicker.split('-');

            let payload = {
                id: this.budgetItems.length,
                description: this.description,
                amount: parseFloat(this.amount).toFixed(2),
                date: `${datePickerSplited[1]}/${datePickerSplited[0]}`,
                typeBudget: this.typeBudget
            };

            if (payload.typeBudget === 'cost') {
                payload = { ...payload, payed: false };
            }

            set(ref(this.dataBase, `${this.tableName}/${this.budgetItems.length}`), payload)
            .then(() => {
                console.log('Registro criado com sucesso');

                this.description = '';
                this.amount = null;
                this.typeBudget = 'gain';

                this.getBudgetItems();
              })
              .catch(() => {
                console.log('Erro ao criar o registro');
            })
            .finally(() => {
                this.loadingRegisterBudget = false;
            });
        },

        removeItemFromBudget() {
            this.loadingDeleteBudget = true;

            remove(ref(this.dataBase, `${this.tableName}/${this.deleteDialog.id}`))
            .then(() => {
                console.log('Registro removido com sucesso');

                this.getBudgetItems();
            })
            .catch(() => {
                console.log('Erro ao remover o registro');
            })
            .finally(() => {
                this.loadingDeleteBudget = false;
                this.closeDeleteModal();
            });
        },

        UpdateItemInBudget() {
            this.loadingUpdateBudget = true;

            const datePickerUpdateSplited = this.datePickerUpdate.split('-');

            const payload =  {
                description: this.descriptionUpdate,
                amount: this.amountUpdate,
                typeBudget: this.typeBudgetUpdate,
                date: `${datePickerUpdateSplited[1]}/${datePickerUpdateSplited[0]}`
            };

            update(ref(this.dataBase, `${this.tableName}/${this.updateDialog.id}`), payload)
            .then(() => {
                console.log('Registro atualizado com sucesso');

                this.getBudgetItems();
              })
              .catch(() => {
                console.log('Erro ao atualizar o registro');
            })
            .finally(() => {
                this.loadingUpdateBudget = false;
                this.closeUpdateModal();
            });
        },

        checkPayed(item) {
            update(ref(this.dataBase, `${this.tableName}/${item.id}`), { payed: item.payed })
            .then(() => {
                console.log('Registro atualizado com sucesso');
              })
              .catch(() => {
                console.log('Erro ao atualizar o registro');
            });
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
