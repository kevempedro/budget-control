const html = `
    <div class="register-container">
        <v-text-field
            v-model="description"
            name="description"
            clearable
            label="Descrição"
            type="text"
        >
        </v-text-field>

        <v-text-field
            v-model="amount"
            name="amount"
            clearable
            label="Valor"
            type="text"
            prefix="R$"
        >
        </v-text-field>

        <v-autocomplete
            v-model="selectedTags"
            :items="tags"
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

        <v-date-picker
            class="mt-4"
            v-model="datePicker"
            type="month"
            locale="pt-br"
        >
        </v-date-picker>

        <v-radio-group
            v-model="typeBudget"
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

        <v-btn
            outlined
            color="primary"
            class="mt-2"
            :loading="loadingRegisterBudget"
            :disabled="disabledRegisterButton"
            @click="registerBudget"
        >
            Registrar
        </v-btn>
    </div>
`;

export default html;
