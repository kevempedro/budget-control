import html from './html-page.js';

const DeleteDialog = {
    name: 'DeleteDialog',
    props: {
        isOpen: {
            required: true
        },
        loadingDeleteBudget: {
            required: true,
            default: false
        }
    },

    template: html,

    methods: {
        onDeleteBudget() {
            this.$emit('on-delete-budget');
        },

        closeDeleteModal() {
            this.$emit('close-delete-modal');
        }
    }
};

export default DeleteDialog;
