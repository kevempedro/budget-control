const html = `
    <v-dialog
        v-model="isOpen"
        persistent
        max-width="600px"
    >
        <v-card>
            <v-card-title>
                <span class="text-h5">Atualizar Registro</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="descriptionUpdate"
                                clearable
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
                                id="amountUpdate"
                                name="amountUpdate"
                                label="Valor"
                                type="number"
                                prefix="R$"
                            >
                            </v-text-field>
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
                            >
                            </v-date-picker>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="red darken-1"
                    text
                    @click="closeUpdateModal"
                >
                    Fechar
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
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
