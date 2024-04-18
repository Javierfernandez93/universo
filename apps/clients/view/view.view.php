<div class="container-fluid py-4" id="app">
    <viewuserwidgetfromseller-viewer type="clientes" :seller="true"></viewuserwidgetfromseller-viewer>
    
    <propertieslist-viewer ref="client" @pull="pull" @show="show"></propertieslist-viewer>

    <div class="row mt-3">
        <div class="col-12 col-md-6">
            <viewclientfromseller-viewer ref="client" @pull="pull" @show="show"></viewclientfromseller-viewer>
        </div>
        <div class="col-12 col-md-6">
            <feedbackclient-viewer ref="client" @pull="pull" @show="show"></feedbackclient-viewer>
        </div>
    </div>

    <viewtasklistwidget-viewer @refresh="refresh" ref="task"></viewtasklistwidget-viewer>

    <propertypull-viewer @refresh="refresh" ref="property"></propertypull-viewer>
</div>