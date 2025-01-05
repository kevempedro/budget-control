const html = `
    <v-dialog
        v-model="isOpen"
        persistent
        max-width="600px"
    >
        <v-card>
            <v-toolbar color="primary">
				<v-toolbar-title
                    class="text-h5"
                    style="color: #FFF;"
                >
					Atualizar Registro
				</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-container>
                    <v-row class="mt-2">
                        <v-col cols="12">
                            <v-text-field
                                v-model="descriptionUpdate"
                                clearable
                                outlined
                                hide-details
                                id="descriptionUpdate"
                                name="descriptionUpdate"
                                label="Descrição"
                                type="text"
                            >
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                                v-model="amountUpdate"
                                clearable
                                outlined
                                hide-details
                                id="amountUpdate"
                                name="amountUpdate"
                                label="Valor"
                                type="number"
                                prefix="R$"
                            >
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-autocomplete
                                v-model="selectedTags"
                                :items="tags"
                                outlined
                                hide-details
                                chips
                                small-chips
                                deletable-chips
                                label="Tags"
                                clearable
                                multiple
                                @update:search-input="searchInuptTag"
                                @keydown.enter="createTag"
                            >
                                <template v-slot:no-data>
                                    <div class="d-flex align-center justify-center">
                                        <div v-if="isMobile" class="d-flex align-center justify-center">
                                            <span class="mr-2">Essa tag não foi encontrada</span>

                                            <v-btn
                                                text
                                                small
                                                color="primary"
                                                @click="createTag"
                                            >
                                                Criar tag
                                            </v-btn>
                                        </div>

                                        <span v-else>Essa tag não foi encontrada: <b>Pressione enter para criar</b></span>
                                    </div>
                                </template>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12">
                            <v-radio-group
                                v-model="typeBudgetUpdate"
                                column
                            >
                                <v-radio
                                    label="Ganho"
                                    color="success"
                                    value="gain"
                                >
                                </v-radio>

                                <v-radio
                                    label="Investimento"
                                    color="info"
                                    value="investment"
                                >
                                </v-radio>

                                <v-radio
                                    label="Despesa"
                                    color="error"
                                    value="cost"
                                >
                                </v-radio>
                            </v-radio-group>
                        </v-col>

                        <v-col cols="12">
                            <v-date-picker
                                v-model="datePickerUpdate"
                                type="month"
                                locale="pt-br"
                            >
                            </v-date-picker>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    outlined
                    color="red darken-1"
                    @click="closeUpdateModal"
                >
                    Fechar
                </v-btn>

                <v-btn
                    outlined
                    color="primary"
                    :disabled="disabledUpdateButton"
                    :loading="loadingUpdateBudget"
                    @click="onUpdateBudget"
                >
                    Atualizar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
`;

export default html;
