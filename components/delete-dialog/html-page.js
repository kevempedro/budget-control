const html = `
    <v-dialog
        v-model="isOpen"
        persistent
        max-width="290"
    >
        <v-card>
            <v-card-title class="text-h5">
                Atenção
            </v-card-title>

            <v-card-text>
                Realmente deseja excluir esse registro?
            </v-card-text>

            <v-card-actions>

                <v-spacer></v-spacer>

                <v-btn
                    color="red darken-1"
                    text
                    @click="closeDeleteModal"
                >
                    Cancelar
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    :loading="loadingDeleteBudget"
                    @click="onDeleteBudget"
                >
                    Excluir
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
`;

export default html;
