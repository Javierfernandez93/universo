<div class="vh-100" id="app">
    <sellerclients-viewer ref="list" @add="add" @edit="edit"></sellerclients-viewer>

    <sellerclientsadd-viewer ref="add" @update="update"></sellerclientsadd-viewer>
    <sellerclientsedit-viewer ref="edit" @update="update"></sellerclientsedit-viewer>
</div>