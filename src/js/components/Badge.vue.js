export default {
    props: ['value','myClass'],
    template: `
        <span :class="myClass" class="badge">
            {{value}}
        </div>
    `,
};