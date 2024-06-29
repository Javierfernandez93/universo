export default {
    props: ['value','type','postfix','placeholder','empty'],
    template : `
        <span v-if="value != null">
            <span v-if="type == 'number'">
                $ {{value.numberFormat(2)}} {{postfix ? postfix : ''}}
            </span>
            <span v-else>
                {{value}} {{postfix ? postfix : ''}}
            </span>
        </span>
        <span v-else> 
            <p v-if="placeholder" class="text-secondary">
                {{placeholder}}
            </p>
            <p v-else-if="empty" class="text-secondary">
                -
            </p>
            <p v-else class="lead text-dark">
                <span class="placeholder col-12"></span>
            </p>
        </span>
    `,
}