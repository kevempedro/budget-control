import budgetTypesEnum from '../../enums/budgetTypes.enum.js';

import html from './html-page.js';

const Filter = {
    name: 'FilterComponent',
    props: {
        tags: {
            required: true
        }
    },
    data () {
        return {
            datePickerFilter: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            descriptionFilter: '',
            budgetTypesEnumData: budgetTypesEnum,
            typeBudgetFilter: '',
            typeBudgetsFilter: [],
            filterTags: []
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

        filterTags() {
            this.applyFilter();
        }
    },

    methods: {
        applyFilter() {
            this.$emit('on-apply-filter', {
                datePickerFilter: this.datePickerFilter,
                descriptionFilter: this.descriptionFilter,
                typeBudgetsFilter: this.typeBudgetsFilter,
                filterTags: this.filterTags
            });
        },

        clearFilter() {
            this.typeBudgetsFilter = [],
            this.datePickerFilter = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            this.descriptionFilter = ''
            this.filterTags = [];
        },
    }
};

export default Filter;
