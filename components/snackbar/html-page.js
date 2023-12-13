const html = `
    <v-snackbar v-model="showSnackbarError" left>
        {{ snackbarErrorText }}

        <template v-slot:action="{ attrs }">
            <v-btn
                color="primary"
                text
                v-bind="attrs"
                @click="closeSnackbar"
            >
                Fechar
            </v-btn>
        </template>
    </v-snackbar>
`;

export default html;
