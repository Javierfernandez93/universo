$(document).ready(function () {
  window.calcularMartingala = function () {
    // Obtener valores de los campos de entrada
    var balance = parseFloat(document.getElementById("balance").value);
    var lotajeBase = parseFloat(document.getElementById("lotajeBase").value);
    var numeroPatron = parseFloat(
      document.getElementById("numeroPatron").value
    );
    var step = parseFloat(document.getElementById("step").value);
    var valorPunto = parseFloat(document.getElementById("valorPunto").value);

    // Lista de patrones
    var patrones = {
      1: "1.3, 1.3, 1.5, 1.5, 1.5, 1.5, 2.0, 2.0, 2.3, 2.3, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 3.0, 3.0, 3.0, 3.0",
      2: "1.4, 1.4, 1.4, 1.4, 2.0, 2.0, 2.5, 2.5, 2.5, 2.5, 2.7, 2.7, 2.7, 2.7, 2.7, 2.7, 2.7, 2.7, 2.7, 2.7",
      3: "1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0",
      4: "1.2, 1.2, 1.4, 1.4, 1.6, 1.6, 1.8, 1.8, 2.0, 2.0, 2.2, 2.2, 2.5, 2.5, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0",
      5: "1.0, 1.0, 1.2, 1.2, 1.5, 1.5, 1.5, 1.5, 2.0, 2.0, 2.0, 2.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5",
      6: "1.5, 1.5, 1.5, 1.5, 2.0, 2.0, 2.0, 2.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5",
      7: "1.0, 1.0, 1.0, 1.0, 1.8, 1.8, 1.8, 1.8, 2.0, 2.0, 2.5, 2.5, 2.8, 2.8, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0",
      8: "1.3, 1.3, 1.3, 1.3, 1.8, 1.8, 1.8, 1.8, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.8, 2.8",
      9: "1.4, 1.4, 1.4, 1.4, 1.7, 1.7, 1.7, 1.7, 1.8, 1.8, 2.0, 2.0, 2.5, 2.5, 3.0, 3.0, 4.0, 4.0, 4.0, 4.0",
      10: "1.5, 1.5, 1.5, 1.5, 2.0, 2.0, 2.0, 2.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.8, 2.8, 3.5, 3.5",
      11: "1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 3.0, 3.0, 3.0, 3.0, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5",
      12: "2.0, 2.0, 2.0, 2.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 3.0, 3.0, 3.0, 3.0",
      13: "1.2, 1.2, 1.4, 1.4, 2.0, 2.0, 2.2, 2.2, 2.4, 2.4, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0",
      14: "1.5, 1.5, 1.5, 1.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.8, 2.8, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0",
      15: "1.0, 1.0, 1.0, 1.0, 1.5, 1.5, 1.5, 1.5, 2.0, 2.0, 3.0, 3.0, 3.5, 3.5, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0",
      16: "1.3, 1.3, 1.3, 1.3, 1.5, 1.5, 1.5, 1.5, 2.0, 2.0, 2.3, 2.3, 2.5, 2.5, 2.8, 2.8, 3.2, 3.2, 3.5, 3.5",
      17: "2.0, 2.0, 2.0, 2.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0",
      18: "1.4, 1.4, 2.0, 2.0, 2.0, 2.0, 2.5, 2.5, 2.5, 2.5, 3.0, 3.0, 3.3, 3.3, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0",
      19: "1.7, 1.7, 2.0, 2.0, 2.2, 2.2, 2.5, 2.5, 2.8, 2.8, 3.0, 3.0, 3.3, 3.3, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5",
      20: "1.0, 1.0, 1.0, 1.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 3.0, 3.0, 3.0, 3.0, 3.5, 3.5, 3.5, 3.5, 3.8, 3.8",
      21: "1.0, 1.0, 1.5, 1.5, 1.8, 1.8, 2.0, 2.0, 2.5, 2.5, 2.8, 2.8, 3.0, 3.0, 3.5, 3.5, 3.0, 3.0, 3.0, 3.0",
      22: "2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.5, 3.5",
    };
    var patronMartingalasRaw = patrones[numeroPatron];

    if (typeof patronMartingalasRaw !== "string") {
      alertMessage("Por favor, introduce un patrón de martingalas válido.");
      return;
    }

    var patronMartingalas = patronMartingalasRaw.split(",");

    var flotante = 0;
    var sumaLotes = 0;
    var flotantesPorPaso = [];
    var drawdownPorPaso = [];
    var drawdownPuntosPorPaso = [];
    var lotes_activos = [];

    for (var i = 0; i < patronMartingalas.length; i++) {
      var loteActual = parseFloat(patronMartingalas[i].trim()) * lotajeBase;
      sumaLotes += loteActual;
      lotes_activos.push(loteActual);
      flotante = 0;

      for (var j = 0; j < lotes_activos.length; j++) {
        flotante -= lotes_activos[j] * (i - j + 1) * step * valorPunto;
      }

      flotantesPorPaso.push(flotante);
      drawdownPorPaso.push((Math.abs(flotante) / balance) * 100);
      drawdownPuntosPorPaso.push((i + 1) * step);
    }

    // Mostrar resultados en la tabla
    var tbody = document.getElementById("resultados");
    tbody.innerHTML = ""; // Limpiar resultados anteriores

    for (var j = 0; j < flotantesPorPaso.length; j++) {
      var tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${j + 1}</td>
            <td>${flotantesPorPaso[j].toFixed(2)}</td>
            <td>${drawdownPorPaso[j].toFixed(2)}%</td>
            <td>-${drawdownPuntosPorPaso[j]}</td>
        `;
      tbody.appendChild(tr);
    }

    var drawdownTotal = (Math.abs(flotante) / balance) * 100;
    document.getElementById("flotanteTotal").innerText =
      "Flotante total (USD): " + flotante.toFixed(2);
    document.getElementById("drawdownTotal").innerText =
      "Drawdown total (%): " + drawdownTotal.toFixed(2) + "%";
    document.getElementById("sumaLotes").innerText =
      "Suma de Lotes: " + sumaLotes.toFixed(2);

    document.getElementById("result").classList.remove("d-none")

    $("html, body").animate({
        scrollTop: $("#result").offset().top - 50,
    },200);
  };
});
