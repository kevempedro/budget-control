import budgetTypesEnum from '../../enums/budgetTypes.enum.js';
import { getFullMonthByNumber } from '../../utils.js';
import yearsMock from '../../mocks/years.js';

import html from './html-page.js';

const Report = {
    name: 'Report',
    props: {
        budgetItems: {
            required: true
        }
    },
    data () {
        return {
            years: yearsMock,
            yearSelected: new Date().getFullYear(),
            amountOfTheCurrentYear: 0,
            budgetTypesEnumData: budgetTypesEnum
        };
    },

    template: html,

    computed: {
        resultsOfTheYearHasAnyRegister() {
            return this.resultsOfTheYear.find(register => register.total > 0);
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
                        if (budget.typeBudget === budgetTypesEnum.GAIN) {
                            acc += Number(budget.amount);
                        }

                        return acc;
                    }, 0)
                },
                {
                    title: 'Investimentos',
                    color: '#2196f3',
                    total: budgetItemsInCurrentYear.reduce((acc, budget) => {
                        if (budget.typeBudget === budgetTypesEnum.INVESTMENT) {
                            acc += Number(budget.amount);
                        }

                        return acc;
                    }, 0)
                },
                {
                    title: 'Despesas',
                    color: '#ff5252',
                    total: budgetItemsInCurrentYear.reduce((acc, budget) => {
                        if (budget.typeBudget === budgetTypesEnum.COST) {
                            acc += Number(budget.amount);
                        }

                        return acc;
                    }, 0)
                }
            ];
        },

        bestMonths() {
            const budgetItemsInCurrentYear = this.budgetItems.filter(budget => budget.date.includes(`/${this.yearSelected.toString()}`));

            const budgetItemsGroupedByDate = budgetItemsInCurrentYear.reduce((acc, obj) => {
                const found = acc.find(item => item.date.split('/')[0] === obj.date.split('/')[0]);

                if (found) {
                  found.data.push(obj);
                } else {
                  acc.push({ date: obj.date.split('/')[0], data: [obj] });
                }

                return acc;
            }, []);

            const gain = [];
            const investment = [];
            const cost = [];

            budgetItemsGroupedByDate.forEach(element => {
                const total = element.data.reduce((acc, budget) => {
                    if (budget.typeBudget === budgetTypesEnum.GAIN) {
                        acc += Number(budget.amount);
                    }

                    return acc;
                }, 0);

                gain.push({
                    type: budgetTypesEnum.GAIN,
                    month: element.date,
                    total
                });
            });

            budgetItemsGroupedByDate.forEach(element => {
                const total = element.data.reduce((acc, budget) => {
                    if (budget.typeBudget === budgetTypesEnum.INVESTMENT) {
                        acc += Number(budget.amount);
                    }

                    return acc;
                }, 0);

                investment.push({
                    type: budgetTypesEnum.INVESTMENT,
                    month: element.date,
                    total
                });
            });

            budgetItemsGroupedByDate.forEach(element => {
                const total = element.data.reduce((acc, budget) => {
                    if (budget.typeBudget === budgetTypesEnum.COST) {
                        acc += Number(budget.amount);
                    }

                    return acc;
                }, 0);

                cost.push({
                    type: budgetTypesEnum.COST,
                    month: element.date,
                    total
                });
            });

            return [

                gain.reduce((previous, current) => {
                    return parseFloat(previous.total) > parseFloat(current.total) ? previous : current;
                }),

                investment.reduce((previous, current) => {
                    return parseFloat(previous.total) > parseFloat(current.total) ? previous : current;
                }),

                cost.reduce((previous, current) => {
                        return parseFloat(previous.total) > parseFloat(current.total) ? previous : current;
                })
            ];
        }
    },

    methods: {
        getFullMonthByNumber(month) {
            const monthNumber = Number(month.replace('0', '')) - 1;

            return getFullMonthByNumber(monthNumber);
        },
    }
};

export default Report;
