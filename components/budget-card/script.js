import budgetTypesEnum from '../../enums/budgetTypes.enum.js';

import html from './html-page.js';

const BudgetCard = {
    name: 'BudgetCard',
    props: {
        item: {
            required: true
        }
    },
    data () {
        return {
            budgetTypesEnumData: budgetTypesEnum
        };
    },

    template: html,

    methods: {
        openUpdateModal(id) {
            this.$emit('open-update-modal', id);
        },

        openDeleteModal(id) {
            this.$emit('open-delete-modal', id);
        },

        onCheckPayed(payload) {
            this.$emit('on-check-payed', payload);
        },

        returnBorderCardClass(typeBudget) {
            switch(typeBudget) {
                case budgetTypesEnum.GAIN:
                    return 'card__gain';
                case budgetTypesEnum.COST:
                    return 'card__cost';
                case budgetTypesEnum.INVESTMENT:
                    return 'card__investment';
                default:
                    return '';
            }
        }
    }
};

export default BudgetCard;
