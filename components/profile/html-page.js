const html = `
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
                    <h3>{{ user.displayName }}</h3>

                    <p class="text-caption mt-1">
                        {{ user.email }}
                    </p>

                    <v-divider class="my-3"></v-divider>

                    <v-btn
                        depressed
                        rounded
                        text
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
`;

export default html;
