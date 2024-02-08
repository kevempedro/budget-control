import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    updatePhoneNumber
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
            snackbarText: ''
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
                this.loadingLoginButton = true;

                const { user } = await signInWithEmailAndPassword(this.authFirebase, this.email, this.password);

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
            } finally {
                this.loadingLoginButton = false;
            }
        },
    }
});
