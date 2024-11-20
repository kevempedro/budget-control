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
        },
        tags: {
            required: true
        }
    },
    data () {
        return {
            years: [2023, 2024, 2025],
            yearSelected: [new Date().getFullYear()],
            descriptionReport: '',
            typeBudgetsReport: [],
            budgetTypesEnumData: budgetTypesEnum,
            filterTags: []
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

            if (this.filterTags.length > 0) {
                data = data.filter(budget => budget.tags && budget.tags.some(tag => this.filterTags.includes(tag)));
            }

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
        },

        budgetBackground(index) {
            if (index % 2 === 0) {
                return 'background-color: #f5f5f5; padding: 8px; 5px; border-radius: 3px;'
            }

            return 'padding: 8px; 5px;';
        }
    }
};

export default AdvancedReportDialog;
