<div class="container-fluid py-4" id="app">
    <userwidget-viewer type="clientes"></userwidget-viewer>
    
    <client-viewer ref="client" @show="show"></client-viewer>

    <tasklistwidget-viewer @refresh="refresh" ref="task"></tasklistwidget-viewer>
</div>