<div class="container-fluid py-4" id="app">
    <userwidget-viewer type="cliente"></userwidget-viewer>
    
    <client-viewer ref="client" @pull="pull"  @show="show"></client-viewer>

    <tasklistwidget-viewer @refresh="refresh" ref="task"></tasklistwidget-viewer>

    <property-admin-pull-viewer ref="property"></property-admin-pull-viewer>
</div>