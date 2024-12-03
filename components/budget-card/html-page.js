const html = `
    <v-card :class="returnBorderCardClass(item.typeBudget)">
        <v-card-title class="d-flex justify-space-between align-center">
            {{ item.date }}

            <v-checkbox
                v-if="item.typeBudget === budgetTypesEnumData.COST"
                class="checkbox-payed"
                v-model="item.payed"
                label="Paga"
                color="grey"
                value=""
                @click="onCheckPayed({ id: item.id, payed: item.payed })"
            >
            </v-checkbox>
        </v-card-title>

        <v-card-text class="card__text">
            <p>{{ item.description }}</p>

            <p class="card__text__amount mt-2">
                <v-icon>
                    {{
                        item.typeBudget === budgetTypesEnumData.GAIN ? 'mdi-cash-plus' : ''
                    }}
                    {{
                        item.typeBudget === budgetTypesEnumData.INVESTMENT ? 'mdi-piggy-bank-outline' : ''
                    }}
                    {{
                        item.typeBudget === budgetTypesEnumData.COST ? 'mdi-cash-minus' : ''
                    }}
                </v-icon>

                {{ Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
            </p>

            <div
                v-if="item.tags"
                class="mt-4"
                style="gap: 10px"
            >
                <p>
                    <v-icon small>
                        mdi-tag
                    </v-icon>

                    <b>Tags</b>
                </p>

                <v-chip
                    v-for="(tag, index) in item.tags"
                    :key="index"
                    class="mr-2 mt-2"
                    outlined
                    small
                    close
                    @click:close="openRemoveTagModal(item, tag)"
                >
                    {{ tag }}
                </v-chip>
            </div>
        </v-card-text>

        <v-card-actions>
            <v-btn icon @click="openUpdateModal(item.id)">
                <v-icon>
                    mdi-pencil
                </v-icon>
            </v-btn>

            <v-btn icon @click="openDeleteModal(item.id)">
                <v-icon>
                    mdi-trash-can
                </v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
`;

export default html;
