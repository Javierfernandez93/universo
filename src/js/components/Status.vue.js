const Status = {
    props: ['status'],
    template: `
        <span class="h3">
            <i :class="status == 1 ? 'bi-check text-success' : 'bi-x text-secondary'" class="bi"></i>
        </span>
    `,
};

export default Status;