import html from './html-page.js';

const Profile = {
    name: 'Profile',
    props: {
        user: {
            required: true
        }
    },

    data () {
        return {
            description: '',
        };
    },

    template: html,

    computed: {
        getInitialNameUser() {
            const letters = this.user?.displayName?.split(' ');
            let initials = '';

            letters?.forEach(letter => initials += letter.charAt(0).toUpperCase());

            return initials;
        }
    },

    methods: {
        logoutUser() {
            this.$emit('logout-user');
        }
    }
};

export default Profile;
