document.getElementById('formaPagamento').addEventListener('change', function () {
  const parcelasDiv = document.getElementById('parcelasDiv');
  parcelasDiv.style.display = this.value === 'parcelado' ? 'block' : 'none';
});

function calcular() {
  const salario = parseFloat(document.getElementById('salario').value || 0);
  const luz = parseFloat(document.getElementById('luz').value || 0);
  const agua = parseFloat(document.getElementById('agua').value || 0);
  const aluguel = parseFloat(document.getElementById('aluguel').value || 0);
  const valorCompra = parseFloat(document.getElementById('valorCompra').value || 0);
  const forma = document.getElementById('formaPagamento').value;
  const parcelas = parseInt(document.getElementById('parcelas').value || 1);

  const gastosFixos = luz + agua + aluguel;
  const dinheiroDisponivel = salario - gastosFixos;

  let mensagem = "";

  if (forma === "parcelado") {
    const valorParcela = valorCompra / parcelas;
    if (valorParcela > dinheiroDisponivel * 0.3) {
      mensagem = `❌ Cuidado! Cada parcela de R$${valorParcela.toFixed(2)} compromete muito sua renda.`;
    } else {
      mensagem = `✅ Pode comprar! Cada parcela será de R$${valorParcela.toFixed(2)}.`;
    }
  } else {
    if (valorCompra <= dinheiroDisponivel) {
      mensagem = "✅ Pode comprar! Seu orçamento dá conta.";
    } else {
      mensagem = "❌ Não é recomendado! Você pode ficar no aperto depois.";
    }
  }

  document.getElementById('resultado').innerText = mensagem;
}
