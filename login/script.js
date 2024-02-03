import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
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

        loginUser() {
            this.loadingLoginButton = true;

            signInWithEmailAndPassword(this.authFirebase, this.email, this.password)
            .then((userCredential) => {
                const uid = userCredential.user.uid;

                if (uid) {
                    localStorage.setItem('uid-firebase', uid);

                    window.location.href = '../index.html';
                }
            })
            .catch((error) => {
                const errorCode = error.code;

                if (errorCode === 'auth/invalid-email' || errorCode === 'auth/invalid-login-credentials') {
                    console.log('errorCode -> ', errorCode);
                    this.showSnack = true;
                    this.snackbarText = 'E-mail ou senha inválidos';
                }

                console.error('Erro ao logar usuário:', error);
            })
            .finally(() => {
                this.loadingLoginButton = false;
            });
        },
    }
});
