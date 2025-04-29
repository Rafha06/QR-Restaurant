let subtotal = 0;
let tempoMaximo = 0;

const cardapio = [
  { nome: "Feijoada", preco: 25.90, tempoPreparo: "40" },
  { nome: "Lasanha", preco: 22.50, tempoPreparo: "50" },
  { nome: "Salada Caesar", preco: 18.00, tempoPreparo: "15" },
  { nome: "Moqueca", preco: 27.00, tempoPreparo: "35" },
  { nome: "Strogonoff de Frango", preco: 21.50, tempoPreparo: "25" }
];

function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

function adicionarPrato() {
  const nomeDigitado = document.getElementById('nomePrato').value.toLowerCase();
  const pratoEncontrado = cardapio.find(p => p.nome.toLowerCase() === nomeDigitado);

  if (!pratoEncontrado) {
    alert("Esse prato não está no cardápio.");
    return;
  }

  const nome = pratoEncontrado.nome;
  const preco = pratoEncontrado.preco;
  const obs = document.getElementById('obsPrato').value;
  const qtd = parseInt(document.getElementById('qtdPrato').value);

  if (!nome || isNaN(qtd)) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const totalItem = qtd * preco;
  subtotal += totalItem;

  // Atualiza o tempo máximo de preparo
  const tempoNumerico = parseInt(pratoEncontrado.tempoPreparo);
  if (tempoNumerico > tempoMaximo) {
    tempoMaximo = tempoNumerico;
  }

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

  atualizarTotais();

  // Limpa campos
  document.getElementById('nomePrato').value = '';
  document.getElementById('obsPrato').value = '';
  document.getElementById('qtdPrato').value = 1;
  document.getElementById('precoPrato').value = '';
  document.getElementById('tempoPreparoInfo').textContent = '';
}

function atualizarTotais() {
  const taxaEntrega = 5.00;
  const totalFinal = subtotal + taxaEntrega;

  document.getElementById('resumoPedido').innerHTML = `
    Subtotal: ${formatarMoeda(subtotal)}<br>
    Taxa de entrega: ${formatarMoeda(taxaEntrega)}<br>
    <strong>Total Final: ${formatarMoeda(totalFinal)}</strong>
  `;

  document.getElementById('tempoTotalPreparo').innerHTML = `
    Tempo estimado de preparo: ${tempoMaximo + tempoPreparo} min
  `;
}

document.getElementById('nomePrato').addEventListener('input', function () {
  const nomeDigitado = this.value.toLowerCase();
  const prato = cardapio.find(p => p.nome.toLowerCase() === nomeDigitado);

  if (prato) {
    document.getElementById('precoPrato').value = prato.preco;
    document.getElementById('tempoPreparoInfo').textContent = `Tempo de preparo: ${prato.tempoPreparo} min`;
  } else {
    document.getElementById('tempoPreparoInfo').textContent = '';
    document.getElementById('precoPrato').value = '';
  }
});