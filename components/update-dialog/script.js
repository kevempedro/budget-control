import html from './html-page.js';

const UpdateDialog = {
    name: 'UpdateDialog',
    props: {
        isOpen: {
            required: true,
            default: false
        },
        item: {
            required: true,
        },
        loadingUpdateBudget: {
            required: true,
            default: false
        },
        tags: {
            required: true
        }
    },
    data () {
        return {
            descriptionUpdate: '',
            amountUpdate: null,
            typeBudgetUpdate: '',
            datePickerUpdate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            selectedTags: [],
            searchedTag: ''
        };
    },

    template: html,

    watch: {
        isOpen(value) {
            if (value) {
                const currentDateSplited = this.item.date.split('/');

                this.descriptionUpdate = this.item.description;
                this.amountUpdate = this.item.amount;
                this.typeBudgetUpdate = this.item.typeBudget;
                this.datePickerUpdate = `${currentDateSplited[1]}-${currentDateSplited[0]}`;
                this.selectedTags = this.item.tags || [];
            }
        }
    },

    computed: {
        disabledUpdateButton() {
            return !this.descriptionUpdate || !this.amountUpdate;
        },

        isMobile() {
            // Verifica se o tamanho da tela é menor ou igual ao breakpoint `sm`
            return this.$vuetify.breakpoint.smAndDown;
        },
    },

    methods: {
        onUpdateBudget() {
            const datePickerUpdateSplited = this.datePickerUpdate.split('-');

            const payload =  {
                description: this.descriptionUpdate,
                amount: this.amountUpdate,
                typeBudget: this.typeBudgetUpdate,
                date: `${datePickerUpdateSplited[1]}/${datePickerUpdateSplited[0]}`,
                tags: this.selectedTags
            };

            this.$emit('on-update-budget', payload);
        },

        closeUpdateModal() {
            this.$emit('close-update-modal');
        },

        searchInuptTag(newTag) {
            this.searchedTag = newTag?.trim();
        },

        createTag() {
            if (this.searchedTag && !this.tags.some(item => item.toLowerCase() === this.searchedTag.toLowerCase())) {
                this.$emit('register-tag', this.searchedTag);
                this.selectedTags.push(this.searchedTag);

                this.searchedTag = '';
            }
        }
    }
};

export default UpdateDialog;
