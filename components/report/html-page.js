const html = `
    <div class="order-last" style="height: max-content;">
        <h3>Resultados do ano de {{ yearSelected }}</h3>

        <v-select v-model="yearSelected" :items="years" label="Ano"></v-select>

        <div v-if="resultsOfTheYearHasAnyRegister" class="d-flex flex-column mt-4">
            <div class="d-flex justify-space-between" style="gap: 20px;">
                <div v-for="(budget, index) in resultsOfTheYear" :key="index" class="d-flex align-center flex-column">
                    <p class="ma-0 text-center mb-2">
                        {{ budget.title }}
                    </p>

                    <v-progress-circular
                        :rotate="360"
                        :size="100"
                        :width="15"
                        :value="((budget.total / amountOfTheCurrentYear) * 100)" :color="budget.color"
                    >
                        {{ ((budget.total / amountOfTheCurrentYear) * 100).toFixed(2) }}%
                    </v-progress-circular>

                    <p class="ma-0 text-center mt-2">
                        {{ budget.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </p>
                </div>
            </div>

            <h3 class="mt-10">Mês em Destaque</h3>

            <div class="d-flex justify-space-between mt-6" style="gap: 20px;">
                <div
                    v-for="(element, index) in bestMonths"
                    :key="index"
                    class="month-result-container d-flex align-center flex-column" :class="element.type"
                >
                    <p class="ma-0 mb-2 text-center">
                        {{ getFullMonthByNumber(element.month) }}
                    </p>

                    <v-tooltip
                        top
                        color="info"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on">
                                {{
                                element.type === budgetTypesEnumData.GAIN ? 'mdi-cash-plus' : ''
                                }}
                                {{
                                element.type === budgetTypesEnumData.INVESTMENT ? 'mdi-piggy-bank-outline' : ''
                                }}
                                {{
                                element.type === budgetTypesEnumData.COST ? 'mdi-cash-minus' : ''
                                }}
                            </v-icon>
                        </template>

                        <span>
                            {{
                            element.type === budgetTypesEnumData.GAIN ? 'Ganhos' : ''
                            }}
                            {{
                            element.type === budgetTypesEnumData.INVESTMENT ? 'Investimentos' : ''
                            }}
                            {{
                            element.type === budgetTypesEnumData.COST ? 'Despesas' : ''
                            }}
                        </span>
                    </v-tooltip>

                    <p class="ma-0 mt-2 text-center">
                        {{ element.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </p>
                </div>
            </div>
        </div>

        <p v-else class="ma-0 text-center mt-2">
            Nenhum registro encontrado para o ano de <strong>{{ yearSelected }}</strong>
        </p>
    </div>
`;

export default html;
