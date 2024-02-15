const html = `
    <div>
        <v-menu
            bottom
            min-width="200px"
            rounded
            offset-y
        >
            <template v-slot:activator="{ on }">
                <v-btn
                    icon
                    x-large
                    v-on="on"
                >
                    <v-avatar
                        color="primary"
                        size="45"
                    >
                        <span
                            v-if="getInitialNameUser"
                            class="white--text text-h5"
                        >
                            {{ getInitialNameUser }}
                        </span>

                        <v-icon v-else color="#FFF">
                            mdi-account-outline
                        </v-icon>
                    </v-avatar>
                </v-btn>
            </template>

            <v-card>
                <v-list-item-content class="justify-center mx-2">
                    <div class="mx-auto text-center">
                        <h3>{{ showDisplayName }}</h3>

                        <p class="text-caption mt-1">
                            {{ showEmail }}
                        </p>

                        <v-divider class="my-3"></v-divider>

                        <v-btn
                            depressed
                            rounded
                            text
                            @click="dialog = !dialog"
                        >
                            Editar perfil
                        </v-btn>

                        <v-divider class="my-3"></v-divider>

                        <v-btn
                            depressed
                            rounded
                            text
                            @click="logoutUser"
                        >
                            Sair

                            <v-icon size="20">
                                mdi-power
                            </v-icon>
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-card>
        </v-menu>

        <v-dialog
            v-model="dialog"
            persistent
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                    dark
                    color="primary"
                >
                    <v-btn
                        icon
                        dark
                        @click="dialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-toolbar-title>
                        Editar perfil
                    </v-toolbar-title>
                </v-toolbar>

                <v-list
                    class="mt-10"
                    three-line
                    subheader
                >
                    <v-list-item>
                        <v-list-item-content>
                            <h3>Dados Pessoais</h3>

                            <v-text-field
                                class="mt-4"
                                v-model="displayName"
                                name="displayName"
                                :rules="displayNameRules"
                                label="Nome"
                                type="text"
                            >
                            </v-text-field>

                            <v-btn
                                outlined
                                color="primary"
                                :loading="loadingChangeName"
                                :disabled="disabledChangeNameButton"
                                @click="changeName"
                                style="max-width: max-content;"
                            >
                                Alterar nome
                            </v-btn>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-text-field
                                class="mr-8"
                                v-model="email"
                                :rules="emailRules"
                                name="email"
                                disabled
                                label="E-mail"
                                type="email"
                            >
                            </v-text-field>

                            <v-btn
                                v-if="!emailVerified"
                                outlined
                                color="primary"
                                :loading="loadingVerifyEmail"
                                @click="verifyEmail"
                                style="max-width: max-content;"
                            >
                                Verificar e-mail
                            </v-btn>

                            <div
                                v-else
                                class="d-flex align-center"
                            >
                                <v-icon
                                    class="mr-1"
                                    color="success"
                                >
                                    mdi-check-circle-outline
                                </v-icon>

                                <span style="color: #4caf50; font-size: 14px;">
                                    E-mail verificado
                                </span>
                            </div>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="mt-10">
                        <v-list-item-content>
                            <h3>Redefinir Senha</h3>

                            <v-alert
                                v-if="!emailVerified"
                                class="mt-4"
                                dense
                                type="warning"
                                icon="mdi-alert-outline"
                            >
                                <strong>Atenção: </strong>Para redefinir sua senha, você deve primeiro verificar seu e-mail.
                            </v-alert>

                            <p
                                v-if="disabledChangePassword"
                                class="mt-2"
                            >
                                Não recebeu o e-mail de redefinição de senha? Você pode reenviá-lo em {{ resendResetPasswordEmailCount }} segundos.
                            </p>

                            <v-btn
                                outlined
                                class="mt-4"
                                color="primary"
                                :loading="loadingChangePassword"
                                :disabled="!emailVerified || disabledChangePassword"
                                @click="changePassword"
                                style="max-width: max-content;"
                            >
                                Redefinir senha
                            </v-btn>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Início - Snackbar -->
            <snackbar-component
                :show-snackbar="showSnack"
                :snackbar-text="snackbarText"
                @close-snackbar="showSnack = false"
            >
            </snackbar-component>
            <!-- Fim - Snackbar -->
        </v-dialog>
    </div>
`;

export default html;
