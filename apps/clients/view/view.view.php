<div class="container-fluid py-4" id="app">
    <viewuserwidgetfromseller-viewer type="clientes" :seller="true"></viewuserwidgetfromseller-viewer>
    
    <viewclientfromseller-viewer ref="client" @pull="pull" @show="show"></viewclientfromseller-viewer>

    <viewtasklistwidget-viewer @refresh="refresh" ref="task"></viewtasklistwidget-viewer>

    <propertypull-viewer @refresh="refresh" ref="property"></propertypull-viewer>
</div>