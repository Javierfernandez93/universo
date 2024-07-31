export default {
    props: ['busy'],
    template : `
        <div v-if="busy" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>    
        </div>
    `,
}