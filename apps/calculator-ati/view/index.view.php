<div class="row justify-content-center py-4" id="app">
    <div class="co-12 col-xl-10">
        <div class="card mb-3">
            <div class="card-header">
                <span class="badge bg-primary">ATI</span>
                <h2>Calculadora de riesgo</h2>
            </div>
            <div class="card-body">
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-xl mb-3">
                        <label for="balance">Balance:</label>
                        <input class="form-control" placeholder="Ingresar" type="number" id="balance">
                    </div>
                    <div class="col-12 col-xl mb-3">
                        <label for="lotajeBase">Lotaje Base:</label>
                        <input class="form-control" placeholder="Ingresar" type="number" id="lotajeBase">
                    </div>
                </div>
                <div class="row justify-content-center align-items-center">
                    <div class="col-12 col-xl mb-3">
                        <label for="numeroPatron">Número Patrón:</label>
                        <input class="form-control" placeholder="Ingresar" type="number" id="numeroPatron">
                    </div>
                    <div class="col-12 col-xl mb-3">
                        <label for="step">Step:</label>
                        <input class="form-control" placeholder="Ingresar" type="number" id="step">
                    </div>
                    <div class="col-12 col-xl mb-3">
                        <label for="valorPunto">Valor Punto:</label>
                        <input class="form-control" placeholder="Ingresar" type="number" id="valorPunto">
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="d-flex justify-content-end mt-3">
                    <button class="btn btn-primary" onclick="calcularMartingala()">Calcular</button>
                </div>
            </div>
        </div>
        <div id="result" class="card mt-3 d-none overflow-hidden">
            <div class="card-header">
                <h2>Resultados</h2>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Paso</th>
                        <th>Float (USD)</th>
                        <th>DD (%)</th>
                        <th>DD (Puntos)</th>
                    </tr>
                </thead>
                <tbody id="resultados">
                </tbody>
            </table>
            <div class="card-footer" id="resumen">
                <p id="flotanteTotal"></p>
                <p id="drawdownTotal"></p>
                <p id="sumaLotes"></p>
            </div>
        </div>
    </div>
</div>