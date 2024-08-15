import LoaderViewer from '../../../src/js/loaderViewer.vue.js?v=1.1.7'

export default {
    components : {
        LoaderViewer
    },
    props: ['busy','dataLength','query'],
    template : `
        <LoaderViewer :busy="busy"/>

        <div v-if="busy === false && dataLength == 0" class="card-body pb-0">
            <div class="alert border border-light text-center">
                <strong>Aviso</strong>
                <div>
                    No hay resultados. Intenta cambiar tu búsqueda o recarga la página
                </div>
            </div>
        </div>
    `,
}