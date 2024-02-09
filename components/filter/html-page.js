const html = `
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header>
                <div>
                    <v-icon
                        class="mr-2"
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
                        :locale="locale"
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

                    <div class="d-flex flex-column">
                        <v-checkbox
                            v-model="typeBudgetsFilter"
                            style="width:max-content;"
                            class="ma-0"
                            label="Ganhos"
                            color="success"
                            :value="budgetTypesEnumData.GAIN"
                        >
                        </v-checkbox>

                        <v-checkbox
                            v-model="typeBudgetsFilter"
                            style="width:max-content;"
                            class="ma-0"
                            label="Investimentos"
                            color="info"
                            :value="budgetTypesEnumData.INVESTMENT"
                        >
                        </v-checkbox>

                        <v-checkbox
                            v-model="typeBudgetsFilter"
                            style="width:max-content;"
                            class="ma-0"
                            label="Despesas"
                            color="error"
                            :value="budgetTypesEnumData.COST"
                        >
                        </v-checkbox>
                    </div>
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
