import {
    getDatabase,
    ref,
    child,
    get,
    set,
    update,
    remove,
    orderByChild,
    orderByKey,
    equalTo,
    query
}from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import {
    getAuth,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

import { getFullMonthByNumber, uuidv4, unscrambleString } from './utils.js';
import budgetTypesEnum from './enums/budgetTypes.enum.js';

import Report from './components/report/script.js';
import BudgetCard from './components/budget-card/script.js';
import DeleteDialog from './components/delete-dialog/script.js';
import UpdateDialog from './components/update-dialog/script.js';
import Snackbar from './components/snackbar/script.js';
import Filter from './components/filter/script.js';

new Vue({
    el: '#app',
    vuetify: new Vuetify(),

    components: {
        'report-component': Report,
        'budget-card-component': BudgetCard,
        'delete-dialog-component': DeleteDialog,
        'update-dialog-component': UpdateDialog,
        'snackbar-component': Snackbar,
        'filter-component': Filter
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
            typeBudgetsFilter: [],
            datePickerFilter: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            descriptionFilter: '',
            dataBase: getDatabase(),
            authFirebase: getAuth(),
            tableName: 'budgets',
            loadingRegisterBudget: false,
            loadingUpdateBudget: false,
            loadingDeleteBudget: false,
            loadingLogout: false,
            years: ['2023', '2024', '2025'],
            showSnack: false,
            snackbarText: '',
            mdSize: '12',
            budgetTypesEnumData: budgetTypesEnum,
            pagination: 1,
            totalPagination: 0,
            pages: [10, 20, 30, 40, 50],
            itemsPerPage: 20,
            loginUid: ''
        };
    },

    created() {
        const uidFirebaseInLocalStorage = localStorage.getItem('uid-firebase');

        if (uidFirebaseInLocalStorage) {
            this.loginUid = unscrambleString(uidFirebaseInLocalStorage);

            this.getBudgetItems();
        } else {
            window.location.href = './login/index.html';
        }
    },

    computed: {
        disabledRegisterButton() {
            return !this.description || !this.amount;
        },

        setPagination() {
            this.pagination = 1;
            this.totalPagination = 0;

            this.totalPagination = Math.ceil((this.budgetItemsFiltered.length / this.itemsPerPage));
            this.budgetItemsFiltered = this.budgetItemsFiltered.slice(0, this.itemsPerPage);
        },

        getLoginUid() {
            return this.loginUid;
        },

        costsLeftTopay() {
            const datePickerFilterSplited = this.datePickerFilter.split('-');

            const costs = this.budgetItems.filter(item => (
                item.typeBudget === budgetTypesEnum.COST &&
                item.date === `${datePickerFilterSplited[1]}/${datePickerFilterSplited[0]}`
            ));

            const costsPayed = costs.filter(item => item.payed);

            return `${costsPayed.length}/${costs.length} pagas`;
        }
    },

    watch: {
        pagination() {
            this.filterBudgetItems();

            const totalItemsToShow = (this.itemsPerPage * this.pagination);
            this.budgetItemsFiltered = this.budgetItemsFiltered.slice(((totalItemsToShow - this.itemsPerPage)),
                totalItemsToShow)
            ;

            const targetDiv = this.$refs.paginationAnchor;
            window.scrollTo({
                top: targetDiv.offsetTop,
                behavior: 'smooth'
            });
        },

        itemsPerPage() {
            this.filterBudgetItems();
            this.setPagination
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
            const { data } = await this.getBudgetItemById(id);

            if (data) {
                this.updateDialog = {
                    isOpen: true,
                    id,
                    item: data
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

        applyFilter(item) {
            const { datePickerFilter, descriptionFilter, typeBudgetsFilter } = item;

            this.datePickerFilter = datePickerFilter,
            this.descriptionFilter = descriptionFilter,
            this.typeBudgetsFilter = typeBudgetsFilter

            this.filterBudgetItems();
            this.setPagination;
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

                // if (item.typeBudget === budgetTypesEnum.INVESTMENT) {
                //     total -= Number(item.amount);
                // }

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

        async logoutUser() {
            try {
                this.loadingLogout = true;

                await signOut(this.authFirebase);

                if (this.getLoginUid) {
                    localStorage.removeItem('uid-firebase');

                    window.location.href = './login/index.html';
                }
            } catch (error) {
                console.error('Erro ao deslogar usuário:', error)
            } finally {
                this.loadingLogout = false;
            }
        },

        async getBudgetItems() {
            try {
                const queryCondition = query(
                    ref(this.dataBase, this.tableName),
                    orderByKey(),
                    equalTo(this.getLoginUid)
                );

                // const snapshot = await get(child(ref(this.dataBase), this.tableName));
                const snapshot = await get(queryCondition);

                if (snapshot.exists()) {
                    this.budgetItems = snapshot.val()[this.getLoginUid];
                    this.filterBudgetItems();

                    this.setPagination;
                } else {
                    this.budgetItems = [];
                }
            } catch (error) {
                console.error('Erro ao trazer os registros: ', error);
            }
        },

        async getBudgetItemById(id) {
            try {
                let data = null;
                let index = null;

                const queryCondition = query(
                    ref(this.dataBase, `${this.tableName}/${this.getLoginUid}`),
                    orderByChild('id'),
                    equalTo(id)
                );

                // const snapshot = await get(child(ref(this.dataBase), `${this.tableName}/${this.getLoginUid}/${id}`));
                const snapshot = await get(queryCondition);

                if (snapshot.exists()) {
                    const arrayOfValue = Object.values(snapshot.val());
                    const arrayOfKey = Object.keys(snapshot.val());

                    data = arrayOfValue.reduce((obj, item) => {
                        return { ...obj, ...item };
                    }, {});

                    index = arrayOfKey.reduce((obj, item) => {
                        return item
                    }, {});
                } else {
                    console.log("Erro ao retornar o registro");
                }

                return { data, index };
            } catch (error) {
                console.error(`Erro ao trazer os registros ${id}: `, error);
            }
        },

        async registerBudget() {
            try {
                this.loadingRegisterBudget = true;
                this.showSnack = false;

                const descriptionSlited = this.description.split(';');
                const amountSlited = this.amount.split(';');

                const hasAnyDescriptionEmpty = descriptionSlited.find(description => description.trim() === '') !== undefined;
                const hasAnyAmountEmpty = amountSlited.find(amount => amount.trim() === '')!== undefined;

                if ((descriptionSlited.length !== amountSlited.length) || hasAnyDescriptionEmpty || hasAnyAmountEmpty) {
                    this.showSnack = true;
                    this.snackbarText = 'Informe a mesma quantidade de descrições e valores';

                    return;
                }

                const hasAnyAmountString = amountSlited.find(amount => !Number(amount.replace(',', '.')));

                if (hasAnyAmountString) {
                    this.showSnack = true;
                    this.snackbarText = 'Informe apenas números no valor';

                    return;
                }

                const datePickerSplited = this.datePicker.split('-');
                const currentBudgets = this.budgetItems.filter(item => item.date === `${datePickerSplited[1]}/${datePickerSplited[0]}`);

                for (let i = 0; i < descriptionSlited.length; i++) {
                    const currentId = (i === 0) ? this.budgetItems.length : this.budgetItems.length + i;
                    const currentOrder =  currentBudgets.length + (i + 1);

                    let payload = {
                        id: uuidv4(),
                        description: descriptionSlited[i].trim(),
                        amount: parseFloat(amountSlited[i].replace(/\./g, '').replace(',', '.')).toString(),
                        date: `${datePickerSplited[1]}/${datePickerSplited[0]}`,
                        typeBudget: this.typeBudget,
                        order: currentOrder
                    };

                    if (payload.typeBudget === budgetTypesEnum.COST) {
                        payload = { ...payload, payed: false };
                    }

                    await set(ref(this.dataBase, `${this.tableName}/${this.getLoginUid}/${currentId}`), payload)

                    this.getBudgetItems();

                    this.description = '';
                    this.amount = null;
                    this.typeBudget = budgetTypesEnum.GAIN;

                    this.showSnack = true;
                    this.snackbarText = 'Registro cadastrado com sucesso';
                }
            } catch (error) {
                console.error('Erro ao registrar o registro: ', error);
            } finally {
                this.loadingRegisterBudget = false;
            }
        },

        async deleteBudget() {
            try {
                this.loadingDeleteBudget = true;
                const { index } = await this.getBudgetItemById(this.deleteDialog.id);

                await remove(ref(this.dataBase, `${this.tableName}/${this.getLoginUid}/${index}`));

                this.getBudgetItems();

                this.showSnack = true;
                this.snackbarText = 'Registro excluido com sucesso';
            } catch (error) {
                console.error('Erro ao remover o registro: ', error);
            } finally {
                this.loadingDeleteBudget = false;
                this.closeDeleteModal();
            }
        },

        async updateBudget(payload) {
            try {
                this.loadingUpdateBudget = true;
                const { index } = await this.getBudgetItemById(this.updateDialog.id);

                await update(ref(this.dataBase, `${this.tableName}/${this.getLoginUid}/${index}`), payload);

                this.getBudgetItems();

                this.showSnack = true;
                this.snackbarText = 'Registro atualizado com sucesso';
            } catch (error) {
                console.error('Erro ao atualizar o registro: ', error);
            } finally {
                this.loadingUpdateBudget = false;
                this.closeUpdateModal();
            }
        },

        async checkPayed(item) {
            try {
                const { index } = await this.getBudgetItemById(item.id);

                await update(ref(this.dataBase, `${this.tableName}/${this.getLoginUid}/${index}`), { payed: item.payed });

                this.showSnack = true;
                this.snackbarText = 'Registro atualizado com sucesso';
            } catch (error) {
                console.error('Erro ao marcar a despesa como paga: ', error);
            }
        },

        filterBudgetItems() {
            this.budgetItemsFiltered = [];
            this.budgetItemsFiltered = this.budgetItems;

            const datePickerFilterSplited = this.datePickerFilter.split('-');
            this.budgetItemsFiltered = this.budgetItems.filter(item => item.date === `${datePickerFilterSplited[1]}/${datePickerFilterSplited[0]}`);

            this.budgetItemsCaculation = this.budgetItemsFiltered;

            if (this.typeBudgetsFilter.length > 0) {
                this.budgetItemsFiltered = this.budgetItemsFiltered.filter(item => this.typeBudgetsFilter.includes(item.typeBudget));
            }

            if (this.descriptionFilter) {
                this.budgetItemsFiltered = this.budgetItemsFiltered.filter(
                    item => (
                        item.description
                        .toLowerCase()
                        .trim()
                        .includes(
                            this.descriptionFilter
                            .toLowerCase()
                            .trim()
                        )
                    )
                );
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
