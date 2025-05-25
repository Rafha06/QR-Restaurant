let subtotal = 0;
let tempoTotalPreparo = 0;

const TAXA_ENTREGA = 5.00;

const cardapio = [
  { nome: "Feijoada", preco: 25.90, tempoPreparo: 40 },
  { nome: "Lasanha", preco: 22.50, tempoPreparo: 60 },
  { nome: "Salada Caesar", preco: 18.00, tempoPreparo: 15 },
  { nome: "Moqueca", preco: 27.00, tempoPreparo: 35 },
  { nome: "Strogonoff de Frango", preco: 21.50, tempoPreparo: 25 }
  
];

function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

function limparCampos() {
  document.getElementById('nomePrato').value = '';
  document.getElementById('obsPrato').value = '';
  document.getElementById('qtdPrato').value = 1;
  document.getElementById('precoPrato').value = '';
  document.getElementById('tempoPreparoInfo').textContent = '';
}

function atualizarTotais() {
  const totalFinal = subtotal + TAXA_ENTREGA;

  document.getElementById('resumoPedido').innerHTML = `
    Subtotal: ${formatarMoeda(subtotal)}<br>
    Taxa de entrega: ${formatarMoeda(TAXA_ENTREGA)}<br>
    <strong>Total Final: ${formatarMoeda(totalFinal)}</strong>
  `;

  document.getElementById('tempoTotalPreparo').innerHTML = `
    Tempo estimado total de preparo: ${tempoTotalPreparo} min
  `;
}

function adicionarLinhaTabela(qtd, nome, obs, preco, totalItem) {
  const tabela = document.querySelector('#tabelaPedido tbody');
  const linha = document.createElement('tr');

  linha.innerHTML = `
    <td>${qtd}</td>
    <td>${nome}</td>
    <td>${obs}</td>
    <td>${formatarMoeda(preco)}</td>
    <td>${formatarMoeda(totalItem)}</td>
  `;

  tabela.appendChild(linha);
}

function adicionarPrato() {
  const nomeInput = document.getElementById('nomePrato').value.trim().toLowerCase();
  const qtdInput = parseInt(document.getElementById('qtdPrato').value);
  const obsInput = document.getElementById('obsPrato').value.trim();

  if (!nomeInput || isNaN(qtdInput) || qtdInput <= 0) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  const prato = cardapio.find(p => p.nome.toLowerCase() === nomeInput);

  if (!prato) {
    alert("Esse prato não está no cardápio.");
    return;
  }

  const totalItem = prato.preco * qtdInput;
  subtotal += totalItem;

  // ✅ Acumula o tempo de preparo conforme a quantidade
  tempoTotalPreparo += prato.tempoPreparo * qtdInput;

  adicionarLinhaTabela(qtdInput, prato.nome, obsInput, prato.preco, totalItem);
  atualizarTotais();
  limparCampos();
}

document.getElementById('nomePrato').addEventListener('input', function () {
  const nomeDigitado = this.value.trim().toLowerCase();
  const prato = cardapio.find(p => p.nome.toLowerCase() === nomeDigitado);

  if (prato) {
    document.getElementById('precoPrato').value = prato.preco.toFixed(2);
    document.getElementById('tempoPreparoInfo').textContent = `Tempo de preparo: ${prato.tempoPreparo} min`;
  } else {
    document.getElementById('precoPrato').value = '';
    document.getElementById('tempoPreparoInfo').textContent = '';
  }
});
