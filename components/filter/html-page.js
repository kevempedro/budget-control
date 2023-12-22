const html = `
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header>
                <div>
                    <v-icon
                        class="mr-2"
                        style="background:#dfdede;border-radius:50%;padding:5px;"
                    >
                        mdi-filter-variant
                    </v-icon>

                    FILTROS
                </div>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
                <div class="d-flex flex-column flex-md-row align-start justify-space-between">
                    <v-date-picker
                        v-model="datePickerFilter"
                        type="month"
                    >
                    </v-date-picker>

                    <v-text-field
                        style="width: 100%;"
                        class="mx-md-10 mt-6 mt-md-0"
                        v-model="descriptionFilter"
                        clearable
                        id="descriptionFilter"
                        name="descriptionFilter"
                        label="Descrição"
                        type="text"
                    >
                    </v-text-field>

                    <v-radio-group
                        v-model="typeBudgetFilter"
                        column
                    >
                        <v-radio
                            label="Ganho"
                            color="success"
                            :value="budgetTypesEnumData.GAIN"
                        >
                        </v-radio>

                        <v-radio
                            label="Investimento"
                            color="info"
                            :value="budgetTypesEnumData.INVESTMENT"
                        >
                        </v-radio>

                        <v-radio
                            label="Despesa"
                            color="error"
                            :value="budgetTypesEnumData.COST"
                        >
                        </v-radio>

                        <v-radio
                            label="Nenhum"
                            color="grey"
                            value=""
                        >
                        </v-radio>
                    </v-radio-group>
                </div>

                <v-btn
                    class="mt-5"
                    color="primary"
                    @click="clearFilter"
                >
                    Limpar Filtros
                </v-btn>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
`;

export default html;
