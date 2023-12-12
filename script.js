import { getDatabase, ref, child, get, set, update, remove  } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

import { getFullMonthByNumber } from './utils.js';
import budgetTypesEnum from './enums/budgetTypes.enum.js';

import Report from './components/report/script.js';
import BudgetCard from './components/budget-card/script.js';
import DeleteDialog from './components/delete-dialog/script.js';
import UpdateDialog from './components/update-dialog/script.js';

new Vue({
    el: '#app',
    vuetify: new Vuetify(),

    components: {
        'report-component': Report,
        'budget-card-component': BudgetCard,
        'delete-dialog-component': DeleteDialog,
        'update-dialog-component': UpdateDialog
    },

    data () {
        return {
            deleteDialog: { isOpen: false, id: 0 },
            updateDialog: { isOpen: false, id: 0, item: {} },
            description: '',
            amount: null,
            typeBudget: budgetTypesEnum.GAIN,
            datePicker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            budgetItems: [],
            budgetItemsFiltered: [],
            budgetItemsCaculation: [],
            typeBudgetFilter: '',
            datePickerFilter: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            descriptionFilter: '',
            dataBase: getDatabase(),
            tableName: 'budgets',
            loadingRegisterBudget: false,
            loadingUpdateBudget: false,
            loadingDeleteBudget: false,
            years: ['2023', '2024', '2025'],
            showSnackbarError: false,
            snackbarErrorText: '',
            mdSize: '12',
            budgetTypesEnumData: budgetTypesEnum,
            pagination: 1,
            totalPagination: 0,
            itemsPerPage: 10,
        };
    },

    created() {
        this.getBudgetItems();
    },

    watch: {
        typeBudgetFilter() {
            this.filterBudgetItems();

            this.setPagination;
        },

        datePickerFilter() {
            this.filterBudgetItems();

            this.setPagination;
        },

        descriptionFilter() {
            this.filterBudgetItems();

            this.setPagination;
        },

        pagination() {
            this.filterBudgetItems();

            const totalItemsToShow = (this.itemsPerPage * this.pagination);
            this.budgetItemsFiltered = this.budgetItemsFiltered.slice(((totalItemsToShow - this.itemsPerPage)),
                totalItemsToShow)
            ;

            const targetDiv = this.$refs.paginationAnchor;
            window.scrollTo({
                top: targetDiv.offsetTop,
                behavior: 'smooth' // Adiciona um efeito de rolagem suave
            });
        }
    },

    computed: {
        disabledRegisterButton() {
            return !this.description || !this.amount;
        },

        setPagination() {
            this.pagination = 1;
            this.totalPagination = 0;
            this.itemsPerPage = 10;

            this.totalPagination = Math.ceil((this.budgetItemsFiltered.length / this.itemsPerPage));
            this.budgetItemsFiltered = this.budgetItemsFiltered.slice(0, this.itemsPerPage);
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
            const item = await this.getBudgetItemById(id);

            if (item) {
                this.updateDialog = {
                    isOpen: true,
                    id,
                    item
                };
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
                id: 0,
                item: {}
            };
        },

        clearFilter() {
            this.typeBudgetFilter = '',
            this.datePickerFilter = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            this.descriptionFilter = ''
        },

        calculateGains() {
            let total = 0;

            this.budgetItemsCaculation.forEach((item) => {
                if (item.typeBudget === budgetTypesEnum.GAIN) {
                    total += Number(item.amount);
                }
            });

            return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        },

        calculateInvestments() {
            let total = 0;

            this.budgetItemsCaculation.forEach((item) => {
                if (item.typeBudget === budgetTypesEnum.INVESTMENT) {
                    total += Number(item.amount);
                }
            });

            return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        },

        calculateCosts() {
            let total = 0;

            this.budgetItemsCaculation.forEach((item) => {
                if (item.typeBudget === budgetTypesEnum.COST) {
                    total += Number(item.amount);
                }
            });

            return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        },

        calculateAmountMonth() {
            let total = 0;

            this.budgetItemsCaculation.forEach((item) => {
                if (item.typeBudget === budgetTypesEnum.GAIN) {
                    total += Number(item.amount);
                }

                if (item.typeBudget === budgetTypesEnum.INVESTMENT) {
                    total -= Number(item.amount);
                }

                if (item.typeBudget === budgetTypesEnum.COST) {
                    total -= Number(item.amount);
                }
            });

            return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        },

        changeMdSize() {
            if (this.mdSize === '12') {
                this.mdSize = '6';
            } else {
                this.mdSize = '12';
            }
        },

        getFullMonthByNumber(month) {
            const monthNumber = Number(month.replace('0', '')) - 1;

            return getFullMonthByNumber(monthNumber);
        },

        getBudgetItems() {
            get(child(ref(this.dataBase), this.tableName))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    this.budgetItems = snapshot.val();
                    this.filterBudgetItems();

                    this.setPagination;
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
            try {
                this.loadingRegisterBudget = true;
                this.showSnackbarError = false;

                const descriptionSlited = this.description.split(';');
                const amountSlited = this.amount.split(';');

                const hasAnyDescriptionEmpty = descriptionSlited.find(description => description.trim() === '') !== undefined;
                const hasAnyAmountEmpty = amountSlited.find(amount => amount.trim() === '')!== undefined;

                if ((descriptionSlited.length !== amountSlited.length) || hasAnyDescriptionEmpty || hasAnyAmountEmpty) {
                    this.showSnackbarError = true;
                    this.snackbarErrorText = 'Informe a mesma quantidade de descrições e valores';

                    return;
                }

                const datePickerSplited = this.datePicker.split('-');

                for (let i = 0; i < descriptionSlited.length; i++) {
                    const currentId = (i === 0) ? this.budgetItems.length : this.budgetItems.length + i

                    let payload = {
                        id: currentId,
                        description: descriptionSlited[i].trim(),
                        amount: parseFloat(amountSlited[i].replace(/\./g, '').replace(',', '.')).toString(),
                        date: `${datePickerSplited[1]}/${datePickerSplited[0]}`,
                        typeBudget: this.typeBudget
                    };

                    if (payload.typeBudget === budgetTypesEnum.COST) {
                        payload = { ...payload, payed: false };
                    }

                    set(ref(this.dataBase, `${this.tableName}/${currentId}`), payload)
                    .then(() => {
                        this.getBudgetItems();
                    })
                    .catch(() => {
                        console.log('Erro ao criar o registro');
                    });
                }
            } catch (err) {
                console.log(err);
            } finally {
                this.loadingRegisterBudget = false;

                this.description = '';
                this.amount = null;
                this.typeBudget = budgetTypesEnum.GAIN;
            }
        },

        deleteBudget() {
            this.loadingDeleteBudget = true;

            remove(ref(this.dataBase, `${this.tableName}/${this.deleteDialog.id}`))
            .then(() => {
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

        updateBudget(payload) {
            this.loadingUpdateBudget = true;

            update(ref(this.dataBase, `${this.tableName}/${this.updateDialog.id}`), payload)
            .then(() => {
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
            this.budgetItemsFiltered = [];
            this.budgetItemsFiltered = this.budgetItems;

            const datePickerFilterSplited = this.datePickerFilter.split('-');
            this.budgetItemsFiltered = this.budgetItems.filter(item => item.date === `${datePickerFilterSplited[1]}/${datePickerFilterSplited[0]}`);

            this.budgetItemsCaculation = this.budgetItemsFiltered;

            if (this.typeBudgetFilter) {
                this.budgetItemsFiltered = this.budgetItemsFiltered.filter(item => item.typeBudget === this.typeBudgetFilter);
            }

            if (this.descriptionFilter) {
                this.budgetItemsFiltered = this.budgetItemsFiltered.filter(item => item.description.toLowerCase().includes(this.descriptionFilter.toLowerCase()));
            }

            this.budgetItemsFiltered.sort(function(a, b) {
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
        }
    }
});
