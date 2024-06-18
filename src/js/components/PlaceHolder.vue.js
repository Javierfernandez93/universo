const PlaceHolder = {
    props: ['value','type','postfix','placeholder'],
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
            <p v-else class="placeholder-glow mb-0">
                <span class="placeholder col-12"></span>
            </p>
        </span>
    `,
}

export default PlaceHolder