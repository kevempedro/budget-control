import html from './html-page.js';

const Snackbar = {
    name: 'Snackbar',
    props: {
        showSnackbar: {
            required: true,
            default: false
        },
        snackbarText: {
            required: true,
            default: ''
        }
    },

    template: html,

    watch: {
        showSnackbar(value) {
            if (value) {
                setTimeout(() => {
                    this.closeSnackbar();
                }, 5000);
            }
        }
    },

    methods: {
        closeSnackbar() {
            this.$emit('close-snackbar');
        }
    }
};

export default Snackbar;
