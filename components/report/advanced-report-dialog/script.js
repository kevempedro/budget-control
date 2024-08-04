import budgetTypesEnum from '../../../enums/budgetTypes.enum.js';

import html from './html-page.js';

const AdvancedReportDialog = {
    name: 'AdvancedReportDialog',
    props: {
        isOpen: {
            required: true
        },
        budgetItems: {
            required: true
        }
    },
    data () {
        return {
            years: [2023, 2024, 2025],
            yearSelected: [new Date().getFullYear()],
            descriptionReport: '',
            typeBudgetsReport: [],
            budgetTypesEnumData: budgetTypesEnum
        };
    },

    template: html,

    methods: {
        filterAdvancedReport() {
            let data = this.budgetItems.filter(
                item => (
                    item.description
                    .toLowerCase()
                    .trim()
                    .includes(
                        this.descriptionReport
                        .toLowerCase()
                        .trim()
                    )
                )
            );

			data = data.filter(budget => {
				const getOnlyYearFromDate = budget.date.split('/')[1];

				return this.yearSelected.includes(Number(getOnlyYearFromDate)) || this.yearSelected.length <= 0;
			});

			data = data.filter(budget => this.typeBudgetsReport.includes(budget.typeBudget) || this.typeBudgetsReport.length <= 0);

			const gains = data.filter(budget => budget.typeBudget === this.budgetTypesEnumData.GAIN);
			const investments = data.filter(budget => budget.typeBudget === this.budgetTypesEnumData.INVESTMENT);
			const costs = data.filter(budget => budget.typeBudget === this.budgetTypesEnumData.COST);

			const amountGain = gains.reduce((total, budget) => {
				return total + Number(budget.amount);
			}, 0);
			const amountInvestment = investments.reduce((total, budget) => {
				return total + Number(budget.amount);
			}, 0);
			const amountCost = costs.reduce((total, budget) => {
				return total + Number(budget.amount);
			}, 0);

            return [
                {
                    type: this.budgetTypesEnumData.GAIN,
                    name: 'Ganhos',
                    amount: amountGain.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    items: gains,
                    icon: 'mdi-cash-plus',
                    color: '#4caf50'
                },
                {
                    type: this.budgetTypesEnumData.INVESTMENT,
                    name: 'Investimentos',
                    amount: amountInvestment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    items: investments,
                    icon: 'mdi-piggy-bank-outline',
                    color: '#2196f3'
                },
                {
                    type: this.budgetTypesEnumData.COST,
                    name: 'Despesas',
                    amount: amountCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                    items: costs,
                    icon: 'mdi-cash-minus',
                    color: '#ff5252'
                }
            ];
        },

        isPayed(budget) {
            if (budget?.typeBudget === this.budgetTypesEnumData.COST) {
                if (budget?.payed) {
                    return 'Pago (Sim)';
                }

                return 'Pago (Não)';
            }
        },

        closeAdvancedReportDialog() {
            this.$emit('close-advance-report-dialog');
        }
    }
};

export default AdvancedReportDialog;
