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
            :loading="loadingRegisterBudget"
            :disabled="disabledRegisterButton"
            @click="registerBudget"
        >
            Registrar
        </v-btn>
    </div>
`;

export default html;
