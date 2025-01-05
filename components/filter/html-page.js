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
                <v-row class="justify-space-between">
                    <v-col cols="12" md="4" style="max-width: max-content;">
                        <v-date-picker
                            v-model="datePickerFilter"
                            type="month"
                            locale="pt-br"
                        >
                        </v-date-picker>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field
                            style="width: 100%;"
                            v-model="descriptionFilter"
                            clearable
                            outlined
                            id="descriptionFilter"
                            name="descriptionFilter"
                            label="Descrição"
                            type="text"
                        >
                        </v-text-field>

                        <v-autocomplete
                            v-model="filterTags"
                            :items="tags"
                            style="width: 100%;"
                            chips
                            outlined
                            small-chips
                            deletable-chips
                            label="Tags"
                            clearable
                            multiple
                        >
                            <template v-slot:no-data>
                                <div class="d-flex align-center justify-center">
                                    <span>Essa tag não existe</span>
                                </div>
                            </template>
                        </v-autocomplete>
                    </v-col>

                    <v-col cols="12" md="4" style="max-width: max-content;">
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
                    </v-col>
                </v-row>

                <v-btn
                    outlined
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
