import html from './html-page.js';

import {
    getAuth,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

import Snackbar from '../snackbar/script.js';

const Profile = {
    name: 'Profile',
    props: {
        user: {
            required: true
        }
    },

    components: {
        'snackbar-component': Snackbar,
    },

    data () {
        return {
            dialog: false,
            authFirebase: getAuth(),
            showSnack: false,
            snackbarText: '',
            displayName: '',
            email: '',
            emailVerified: false,
            loadingChangeName: false,
            loadingVerifyEmail: false,
            loadingChangePassword: false,
            disabledChangePassword: false,
            resendResetPasswordEmailCount: 60,
            displayNameRules: [
                v => !!v || 'Campo obrigatório',
                v => {
                  const words = v ? v.trim().split(/\s+/) : [];
                  return words.length >= 2 || 'Informe o nome e sobrenome';
                },
                v => {
                    return (v.length <= 100) || 'Nome pode conter apenas 100 caracteres';
                }
            ],
            emailRules: [
                v => !!v || 'Campo obrigatório',
                v => /.+@.+\..+/.test(v) || 'Informe um e-mail válido',
                v => {
                    return (v.length <= 50) || 'E-mail pode conter apenas 50 caracteres';
                }
            ]
        };
    },

    template: html,

    computed: {
        loadData() {
            const { displayName, email, emailVerified } = this.user;

            this.displayName = displayName || '';
            this.email = email || '';
            this.emailVerified = emailVerified || false;
        },

        getInitialNameUser() {
            const letters = this.user?.displayName?.split(' ') || [];

            if (letters.length > 0) {
                return `${letters[0].charAt(0).toUpperCase()}${letters.reverse()[0].charAt(0).toUpperCase()}`;
            }
        },

        showDisplayName() {
            return this.displayName || this.user?.displayName;
        },

        showEmail() {
            return this.email || this.user?.email;
        },

        disabledChangeNameButton() {
            const words = this.displayName ? this.displayName.trim().split(/\s+/) : [];

            return !this.displayName || words.length < 2 || this.displayName.length > 100;
        }
    },

    watch: {
        dialog(value) {
            if (value) {
                this.loadData;
            }
        }
    },

    methods: {
        logoutUser() {
            this.$emit('logout-user');
        },

        openAdvancedReport() {
            this.$emit('open-advanced-report');
        },

        async changeName() {
            try {
                const words = this.displayName ? this.displayName.trim().split(/\s+/) : [];

                if (!this.displayName.trim()) {
                    this.showSnack = true;
                    this.snackbarText = 'Campo obrigatório';

                    return;
                }

                if (words.length < 2) {
                    this.showSnack = true;
                    this.snackbarText = 'Informe o nome e sobrenome';

                    return;
                }

                if (this.displayName.length > 100) {
                    this.showSnack = true;
                    this.snackbarText = 'Nome pode conter apenas 100 caracteres';

                    return;
                }

                this.loadingChangeName = true;

                await updateProfile(this.authFirebase.currentUser, { displayName: this.displayName.trim() });

                this.showSnack = true;
                this.snackbarText = 'Nome do usuário atualizado com sucesso.';
            } catch (error) {
                console.error('Erro ao atualizar o nome do usuário: ', error);
            } finally {
                this.loadingChangeName = false;
            }
        },

        async verifyEmail() {
            try {
                this.loadingVerifyEmail = true;

                await sendEmailVerification(this.authFirebase.currentUser);

                this.showSnack = true;
                this.snackbarText = 'Um link de verificação foi enviado para o seu e-mail.';
            } catch (error) {
                console.error('Erro ao enviar e-mail de verificação: ', error);
            } finally {
                this.loadingVerifyEmail = false;
            }
        },

        async changePassword() {
            try {
                this.loadingChangePassword = true;

                await sendPasswordResetEmail(this.authFirebase, this.user?.email);

                this.showSnack = true;
                this.snackbarText = 'Um link para redefinir sua senha foi enviado para o seu e-mail.';

                this.disabledChangePassword = true;
                this.resendResetPasswordEmail();
            } catch (error) {
                console.error('Erro ao enviar e-mail de redefinir senha: ', error);
            } finally {
                this.loadingChangePassword = false;
            }
        },

        resendResetPasswordEmail() {
            const interval = setInterval(() => {
                this.resendResetPasswordEmailCount--;

                if (this.resendResetPasswordEmailCount <= 0) {
                    this.disabledChangePassword = false;
                    this.resendResetPasswordEmailCount = 60;

                    clearInterval(interval);
                }
            }, 1000);
        }
    }
};

export default Profile;
