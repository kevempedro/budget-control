import html from './html-page.js';

const RemoveTagDialog = {
    name: 'RemoveTagDialog',
    props: {
        isOpen: {
            required: true,
            default: false
        },
        loadingRemoveTag: {
            required: true,
            default: false
        }
    },

    template: html,

    methods: {
        onRemoveTag() {
            this.$emit('on-remove-tag');
        },

        closeRemoveTagModal() {
            this.$emit('close-remove-tag-modal');
        }
    }
};

export default RemoveTagDialog;
