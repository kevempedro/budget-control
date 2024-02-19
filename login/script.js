import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

import Snackbar from '../components/snackbar/script.js';

new Vue({
    el: '#login',
    vuetify: new Vuetify(),

    components: {
        'snackbar-component': Snackbar,
    },

    data () {
        return {
            email: '',
            password: '',
            showPassword: false,
            loadingLoginButton: false,
            authFirebase: getAuth(),
            showSnack: false,
            snackbarText: '',
            emailRules: [
                v => !!v || 'Campo obrigatório',
                v => /.+@.+\..+/.test(v) || 'Informe um e-mail válido'
            ],
            passwordRules: [
                v => !!v || 'Campo obrigatório'
            ]
        };
    },

    computed: {
        disabledLoginButton() {
            return !this.email || !this.password;
        }
    },

    methods: {
        // registerUser() {
        //     createUserWithEmailAndPassword(this.authFirebase, 'kevempereira520@gmail.com', 'mR6MM8T4@')
        //     .then((userCredential) => {
        //         // Registro bem-sucedido
        //         const user = userCredential.user;
        //         console.log('Usuário registrado:', userCredential);
        //     })
        //     .catch((error) => {
        //         // Tratamento de erros
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.error('Erro ao registrar usuário:', error);
        //     });
        // },

        // updateUserProfile() {
        //     updateProfile(this.authFirebase.currentUser, { displayName: 'Kevem Lima' })
        //     .then(() => {
        //         console.log('Usuário atualizado com sucesso!');
        //     })
        //     .catch((error) => {
        //         console.error('Erro ao atualizar usuário: ', error);
        //     });
        // },

        // updateUserPhoneNumber() {
        //     updatePhoneNumber(this.authFirebase.currentUser, '38998397695')
        //     .then(() => {
        //         console.log('Telefone atualizado com sucesso!');
        //     })
        //     .catch((error) => {
        //         console.error('Erro ao atualizar telefone   : ', error);
        //     });
        // },

        async loginUser() {
            try {
                if (!this.email) {
                    this.showSnack = true;
                    this.snackbarText = 'Campo e-mail é obrigatório';

                    return;
                }

                if (!(/.+@.+\..+/.test(this.email))) {
                    this.showSnack = true;
                    this.snackbarText = 'Informe um e-mail válido';

                    return;
                }

                if (!this.password) {
                    this.showSnack = true;
                    this.snackbarText = 'Campo senha é obrigatório';

                    return;
                }

                this.loadingLoginButton = true;

                const { user } = await signInWithEmailAndPassword(this.authFirebase, this.email.trim(), this.password.trim());

                const uid = user.uid;

                if (uid) {
                    window.location.href = '../index.html';
                }
            } catch (error) {
                console.error('Erro ao logar usuário:', error);
                const errorCode = error.code;

                if (errorCode === 'auth/invalid-email' || errorCode === 'auth/invalid-login-credentials') {
                    this.showSnack = true;
                    this.snackbarText = 'E-mail ou senha inválidos';
                }

                if (errorCode === 'auth/user-disabled') {
                    this.showSnack = true;
                    this.snackbarText = 'Usuário desativado';
                }
            } finally {
                this.loadingLoginButton = false;
            }
        },
    }
});
