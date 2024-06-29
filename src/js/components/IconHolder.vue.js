export default {
    props: ['icon','tooltip','value'],
    template : `
        <span class="h5" :class="value ? 'text-success' : 'text-secondary'" data-bs-toggle="tooltip" data-bs-html="true" :data-bs-title="tooltip">
            <i :class="icon" class="bi"></i>
        </span>
    `,
}