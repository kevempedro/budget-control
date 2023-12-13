import html from './html-page.js';

const Snackbar = {
    name: 'Snackbar',
    props: {
        showSnackbarError: {
            required: true,
            default: false
        },
        snackbarErrorText: {
            required: true,
            default: ''
        }
    },

    template: html,

    methods: {
        closeSnackbar() {
            this.$emit('close-snackbar');
        }
    }
};

export default Snackbar;
