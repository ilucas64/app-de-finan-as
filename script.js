let transacoes = [];
let chart;

document.getElementById("form-transacao").addEventListener("submit", function(e) {
  e.preventDefault();

  const valor = parseFloat(document.getElementById("valor").value);
  const categoria = document.getElementById("categoria").value;

  if (!valor || !categoria) return;

  transacoes.push({ valor, categoria });
  document.getElementById("valor").value = '';
  document.getElementById("categoria").value = '';

  atualizarInterface();
});

function atualizarInterface() {
  const lista = document.getElementById("lista-transacoes");
  lista.innerHTML = "";

  let salarioTotal = 0;
  let gastos = 0;

  for (const t of transacoes) {
    if (t.categoria === "Salário") {
      salarioTotal += t.valor;
    } else {
      gastos += Math.abs(t.valor);
    }

    const li = document.createElement("li");
    li.textContent = `${t.categoria}: R$ ${t.valor.toFixed(2)}`;
    lista.appendChild(li);
  }

  const saldo = salarioTotal - gastos;
  document.getElementById("saldo").textContent = saldo.toFixed(2);
  document.getElementById("gastos").textContent = gastos.toFixed(2);

  atualizarGrafico(salarioTotal, gastos);
}

function agruparDespesasPorCategoria() {
  const categorias = {};
  for (const t of transacoes) {
    if (t.categoria !== "Salário") {
      categorias[t.categoria] = (categorias[t.categoria] || 0) + Math.abs(t.valor);
    }
  }
  return categorias;
}

function atualizarGrafico(salarioTotal, gastos) {
  const ctx = document.getElementById("grafico").getContext("2d");
  const despesas = agruparDespesasPorCategoria();

  const labels = [...Object.keys(despesas), "Saldo Restante"];
  const valores = [...Object.values(despesas), Math.max(salarioTotal - gastos, 0)];

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: "Distribuição do Salário",
        data: valores,
        backgroundColor: [
          '#e74c3c', // Aluguel
          '#f1c40f', // Luz/Água
          '#3498db', // Compras
          '#9b59b6', // Lazer
          '#95a5a6', // Outro
          '#2ecc71'  // Saldo restante
        ],
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
        }
      }
    }
  });
}
