// Script da calculadora de volume de concreto
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('calc-form');
    var resultado = document.getElementById('resultado');
    if (!form || !resultado) return;

    function formatNumber(n) {
      return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function sugerirBetoneira(m3) {
      if (m3 <= 2) {
        return { modelo: '120L', slug: 'betoneira-120l', producao: 2, desc: 'Ideal para pequenas reformas e contrapisos.' };
      } else if (m3 <= 5) {
        return { modelo: '150L', slug: 'betoneira-150l', producao: 3, desc: 'Perfeita para obras residenciais e reformas comerciais.' };
      } else if (m3 <= 10) {
        return { modelo: '200L', slug: 'betoneira-200l', producao: 7, desc: 'Recomendada para construções de grande porte.' };
      } else {
        return { modelo: '400L', slug: 'betoneira-400l', producao: 10, desc: 'Indicada para grandes empreendimentos e usinas de concreto.' };
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var comprimento = parseFloat(document.getElementById('comprimento').value.replace(',', '.')) || 0;
      var largura = parseFloat(document.getElementById('largura').value.replace(',', '.')) || 0;
      var espessura = parseFloat(document.getElementById('espessura').value.replace(',', '.')) || 0;
      var perda = parseFloat(document.getElementById('perda').value) || 10;

      if (comprimento <= 0 || largura <= 0 || espessura <= 0) {
        resultado.classList.remove('hidden');
        resultado.innerHTML = '<p class="text-red-600 font-medium">Preencha todos os campos com valores maiores que zero.</p>';
        return;
      }

      var volume = (comprimento * largura * (espessura / 100));
      var volumeComPerda = volume * (1 + perda / 100);
      var cimento = volumeComPerda * 7;
      var areia = volumeComPerda * 0.6;
      var brita = volumeComPerda * 0.8;
      var agua = volumeComPerda * 180;
      var betoneira = sugerirBetoneira(volumeComPerda);
      var dias = Math.ceil(volumeComPerda / betoneira.producao);

      resultado.classList.remove('hidden');
      resultado.innerHTML =
        '<div class="space-y-6">' +
        '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">' +
        '<div class="rounded-xl bg-gray-50 p-5 border border-gray-200 text-center"><p class="text-sm text-gray-500">Volume de concreto</p><p class="text-3xl font-black text-secondary">' + formatNumber(volume) + ' m³</p></div>' +
        '<div class="rounded-xl bg-gray-50 p-5 border border-gray-200 text-center"><p class="text-sm text-gray-500">Volume com perda (' + perda + '%)</p><p class="text-3xl font-black text-secondary">' + formatNumber(volumeComPerda) + ' m³</p></div>' +
        '</div>' +
        '<div class="rounded-xl bg-secondary/10 p-5 border border-secondary/20"><h3 class="text-lg font-bold text-gray-900 mb-2">Materiais estimados</h3><ul class="space-y-2 text-gray-700">' +
        '<li><strong>Cimento (sacos 50kg):</strong> ' + formatNumber(cimento) + ' unidades</li>' +
        '<li><strong>Areia:</strong> ' + formatNumber(areia) + ' m³</li>' +
        '<li><strong>Brita:</strong> ' + formatNumber(brita) + ' m³</li>' +
        '<li><strong>Água:</strong> ' + formatNumber(agua) + ' litros</li>' +
        '</ul></div>' +
        '<div class="rounded-xl bg-primary/10 p-5 border border-primary/20"><h3 class="text-lg font-bold text-gray-900 mb-2">Betoneira recomendada</h3><p class="text-gray-700 mb-3">Para <strong>' + formatNumber(volumeComPerda) + ' m³</strong>, recomendamos a <strong>betoneira ' + betoneira.modelo + '</strong>. ' + betoneira.desc + '</p>' +
        '<p class="text-gray-700 mb-4">Produção estimada: até ' + betoneira.producao + ' m³/dia. Tempo aproximado na obra: <strong>' + dias + ' dia' + (dias > 1 ? 's' : '') + '</strong>.</p>' +
        '<div class="flex flex-col sm:flex-row gap-3"><a href="/servicos/' + betoneira.slug + '/" class="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-base font-bold text-white hover:bg-secondary-700 transition-all">Ver Betoneira ' + betoneira.modelo + ' →</a>' +
        '<a href="https://wa.me/5521997751577?text=Ol%C3%A1%2C%20calculei%20' + encodeURIComponent(formatNumber(volumeComPerda)) + '%20m%C3%B3%20de%20concreto%20no%20site%20e%20gostaria%20de%20um%20or%C3%A7amento" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center rounded-full bg-whatsapp px-6 py-3 text-base font-bold text-white hover:bg-whatsapp-dark transition-all">Pedir Orçamento no WhatsApp</a></div></div>' +
        '</div>';
    });
  });
})();
