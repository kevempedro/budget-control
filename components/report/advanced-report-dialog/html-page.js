const html = `
    <v-dialog
        v-model="isOpen"
        persistent
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar
                dark
                color="primary"
            >
                <v-btn
                    icon
                    dark
                    @click="closeAdvancedReportDialog"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title>
                    Relatório avançado
                </v-toolbar-title>
            </v-toolbar>

            <div class="d-flex flex-column pa-6" style="gap: 40px;">
                <div>
                    <v-text-field
                        v-model="descriptionReport"
                        id="descriptionReport"
                        name="descriptionReport"
                        label="Descrição"
                        type="text"
                    >
                    </v-text-field>

                    <v-select
                        v-model="yearSelected"
                        :items="years"
                        label="Ano"
                        multiple
                    >
                    </v-select>

                     <v-autocomplete
                        v-model="filterTags"
                        :items="tags"
                        style="width: 100%;"
                        chips
                        small-chips
                        deletable-chips
                        label="Tags"
                        clearable
                        multiple
                    >
                        <template v-slot:no-data>
                            <div class="d-flex align-center justify-center">
                                <span>Essa tag não foi encontrada</span>
                            </div>
                        </template>
                    </v-autocomplete>

                    <div class="d-flex flex-column">
                        <v-checkbox
                            v-model="typeBudgetsReport"
                            style="width:max-content;"
                            class="ma-0"
                            label="Ganhos"
                            color="success"
                            :value="budgetTypesEnumData.GAIN"
                        >
                        </v-checkbox>

                        <v-checkbox
                            v-model="typeBudgetsReport"
                            style="width:max-content;"
                            class="ma-0"
                            label="Investimentos"
                            color="info"
                            :value="budgetTypesEnumData.INVESTMENT"
                        >
                        </v-checkbox>

                        <v-checkbox
                            v-model="typeBudgetsReport"
                            style="width:max-content;"
                            class="ma-0"
                            label="Despesas"
                            color="error"
                            :value="budgetTypesEnumData.COST"
                        >
                        </v-checkbox>
                    </div>
                </div>

                <v-expansion-panels
                    v-for="(item, index) in filterAdvancedReport()"
                    :key="index"
                >
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <div>
                                <div class="d-flex align-center">
                                    <v-icon
                                        :class="item.type"
                                        class="mr-2"
                                        size="30"
                                        :color="item.color"
                                    >
                                        {{ item.icon }}
                                    </v-icon>

                                    <h2
                                        class="budget-name"
                                        :class="item.type"
                                    >
                                        {{ item.name }}
                                    </h2>
                                </div>

                                <p class="ma-0 mt-6">
                                    <b>
                                        Total:
                                    </b>

                                    {{ item.items.length }} registros
                                </p>

                                <p class="ma-0 mt-1">
                                    <b>
                                        valor total:
                                    </b>

                                    {{ item.amount }}
                                </p>
                            </div>
                        </v-expansion-panel-header>

                        <v-expansion-panel-content>
                            <p
                                v-for="(budget, indexBudget) in item.items"
                                :key="budget.id"
                                :style="budgetBackground(indexBudget)"
                            >
                                {{ budget.description }}
                                <br>
                                {{ budget.date }}
                                <br>
                                {{ Number(budget.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                                <br>
                                {{ budget.typeBudget === 'cost' ? isPayed(budget) : '' }}
                                <br v-if="budget.typeBudget === 'cost'">
                                <v-chip
                                    v-for="(tag, indexTag) in budget.tags"
                                    :key="indexTag"
                                    outlined
                                    small
                                    class="mr-2 mt-2"
                                >
                                    {{ tag }}
                                </v-chip>
                            </p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </v-card>
    </v-dialog>
`;

export default html;
