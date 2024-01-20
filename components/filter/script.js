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
            typeBudgetsFilter: [],
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

        typeBudgetsFilter() {
            this.applyFilter();
        },
    },

    methods: {
        applyFilter() {
            this.$emit('on-apply-filter', {
                datePickerFilter: this.datePickerFilter,
                descriptionFilter: this.descriptionFilter,
                typeBudgetsFilter: this.typeBudgetsFilter
            });
        },

        clearFilter() {
            this.typeBudgetsFilter = [],
            this.datePickerFilter = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            this.descriptionFilter = ''
        },
    }
};

export default Filter;
