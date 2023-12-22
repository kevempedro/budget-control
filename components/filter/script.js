import budgetTypesEnum from '../../enums/budgetTypes.enum.js';

import html from './html-page.js';

const Filter = {
    name: 'Filter',
    props: {
    },
    data () {
        return {
            datePickerFilter: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            descriptionFilter: '',
            budgetTypesEnumData: budgetTypesEnum,
            typeBudgetFilter: '',
        };
    },

    template: html,

    watch: {
        datePickerFilter() {
            this.applyFilter();
        },

        descriptionFilter() {
            this.applyFilter();
        },

        typeBudgetFilter() {
            this.applyFilter();
        },
    },

    methods: {
        applyFilter() {
            this.$emit('on-apply-filter', {
                datePickerFilter: this.datePickerFilter,
                descriptionFilter: this.descriptionFilter,
                typeBudgetFilter: this.typeBudgetFilter
            });
        },

        clearFilter() {
            this.typeBudgetFilter = '',
            this.datePickerFilter = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            this.descriptionFilter = ''
        },
    }
};

export default Filter;
