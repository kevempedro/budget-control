const html = `
    <v-dialog
        v-model="isOpen"
        persistent
        max-width="290"
    >
        <v-card>
           <v-toolbar color="primary">
				<v-toolbar-title
                    class="text-h5"
                    style="color: #FFF;"
                >
					Atenção
				</v-toolbar-title>
            </v-toolbar>

            <v-card-text class="mt-4">
                Tem certeza de que deseja excluir este registro?
            </v-card-text>

            <v-card-actions>

                <v-spacer></v-spacer>

                <v-btn
                    outlined
                    color="red darken-1"
                    @click="closeDeleteModal"
                >
                    Cancelar
                </v-btn>

                <v-btn
                    outlined
                    color="primary"
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
