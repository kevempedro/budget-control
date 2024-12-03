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
                Tem certeza de que deseja remover está tag?
            </v-card-text>

            <v-card-actions>

                <v-spacer></v-spacer>

                <v-btn
                    outlined
                    color="red darken-1"
                    @click="closeRemoveTagModal"
                >
                    Cancelar
                </v-btn>

                <v-btn
                    outlined
                    color="primary"
                    :loading="loadingRemoveTag"
                    @click="onRemoveTag"
                >
                    Remover
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
`;

export default html;
