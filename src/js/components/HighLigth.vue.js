import LoaderViewer from '../../../src/js/loaderViewer.vue.js?v=1.0.0'

export default {
    components : {
        LoaderViewer
    },
    props: ['busy','dataLength','query'],
    template : `
        <LoaderViewer :busy="busy"/>

        <div v-if="busy === false" class="card-body pb-0">
            <div v-if="dataLength == 0" class="alert border border-light text-center">
                <strong>Aviso</strong>
                <div>
                    No hay resultados. Intenta cambiar tu búsqueda o recarga la página
                </div>
            </div>
        </div>
    `,
}