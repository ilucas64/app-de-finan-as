document.getElementById('pagamento').addEventListener('change', function () {
  const div = document.getElementById('parcelasDiv');
  div.style.display = this.value === 'parcelado' ? 'block' : 'none';
});

document.getElementById('financeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const salario = parseFloat(document.getElementById('salario').value);
  const luz = parseFloat(document.getElementById('luz').value) || 0;
  const agua = parseFloat(document.getElementById('agua').value) || 0;
  const aluguel = parseFloat(document.getElementById('aluguel').value) || 0;
  const compra = parseFloat(document.getElementById('compra').value) || 0;
  const pagamento = document.getElementById('pagamento').value;
  const parcelas = parseInt(document.getElementById('parcelas').value) || 1;

  const despesasFixas = luz + agua + aluguel;
  const saldo = salario - despesasFixas;

  let mensagem = `<h3>Resumo Financeiro</h3>`;
  mensagem += `<p>Saldo disponível após despesas fixas: <strong>R$ ${saldo.toFixed(2)}</strong></p>`;

  if (compra > 0) {
    if (pagamento === 'parcelado') {
      const valorParcela = compra / parcelas;
      mensagem += `<p>Parcelas de R$${valorParcela.toFixed(2)} em ${parcelas}x.</p>`;
      if (valorParcela > saldo * 0.3) {
        mensagem += `<p>⚠️ Cuidado! A parcela compromete mais de 30% do seu saldo disponível.</p>`;
      } else {
        mensagem += `<p>✅ Parcelamento possível sem grandes riscos.</p>`;
      }
    } else {
      if (compra > saldo) {
        mensagem += `<p>🚫 Você não deve comprar isso agora. Vai se apertar!</p>`;
      } else {
        mensagem += `<p>✅ Você pode comprar agora sem risco.</p>`;
      }
    }
  }

  const resultado = document.getElementById('resultado');
  resultado.innerHTML = mensagem;
  resultado.classList.remove('hidden');
});

// Mini IA local (respostas automáticas com palavras-chave)
function responderIA() {
  const pergunta = document.getElementById('pergunta').value.toLowerCase();
  const respostaDiv = document.getElementById('respostaIA');

  let resposta = "🤔 Ainda estou aprendendo. Tente outra pergunta.";

  if (pergunta.includes("economizar")) {
    resposta = "💡 Dica: Corte gastos supérfluos, use lista no mercado e evite parcelamentos.";
  } else if (pergunta.includes("guardar") || pergunta.includes("poupar")) {
    resposta = "📊 Comece guardando 10% do seu salário mensal em uma poupança.";
  } else if (pergunta.includes("vale a pena") && pergunta.includes("parcelar")) {
    resposta = "📌 Vale a pena parcelar apenas se não houver juros e a parcela couber confortavelmente no seu orçamento.";
  } else if (pergunta.includes("como ficar rico")) {
    resposta = "💰 Trabalhe com constância, evite dívidas, invista com sabedoria e gaste menos do que ganha.";
  }

  respostaDiv.textContent = resposta;
}
