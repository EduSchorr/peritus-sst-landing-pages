(function () {
  'use strict';

  const catalog = {
    fumos: { label: 'Fumos metálicos', unit: 480, text: 'Soldagem e aquecimento liberam partículas muito pequenas. A medição mostra a concentração realmente respirada.' },
    ruido: { label: 'Ruído contínuo — dosimetria', unit: 220, text: 'A dosimetria mede a dose contínua ao longo da jornada e ajuda a avaliar controles existentes.' },
    calor: { label: 'Calor ocupacional — IBUTG', unit: 280, text: 'O índice IBUTG avalia a sobrecarga térmica em atividades com exposição relevante ao calor.' },
    poeira: { label: 'Poeiras/Sílica', unit: 450, text: 'Partículas inaláveis e respiráveis exigem quantificação para verificar a exposição.' },
    vibracao: { label: 'Vibração — VCI/VDVR', unit: 650, text: 'A medição verifica as acelerações transmitidas às mãos, braços ou corpo inteiro.' }
  };
  const mobilization = 650;

  function init() {
    const form = document.getElementById('quant-form');
    if (!form) return;

    const agent = document.getElementById('quant-agent');
    const area = document.getElementById('quant-area');
    const workers = document.getElementById('quant-workers');
    const city = document.getElementById('quant-city');
    const state = document.getElementById('quant-state');
    const result = document.getElementById('quant-result');
    state.innerHTML = Peritus.statesOptions('RS');

    function calculate(animate) {
      const item = catalog[agent.value];
      const squareMeters = Math.max(0, Number(area.value) || 0);
      const points = Math.max(1, Math.ceil(squareMeters / 10));
      const subtotal = points * item.unit;
      const total = subtotal + mobilization;

      document.getElementById('quant-explanation').textContent = item.text;
      document.getElementById('quant-total').textContent = Peritus.money(total);
      document.getElementById('quant-points').textContent = points + (points === 1 ? ' ponto' : ' pontos');
      document.getElementById('quant-unit').textContent = Peritus.money(item.unit);
      document.getElementById('quant-mobilization').textContent = Peritus.money(mobilization);
      if (animate) Peritus.announceResult(result);
      return { item, squareMeters, points, subtotal, total, workers: Math.max(0, Number(workers.value) || 0) };
    }

    form.addEventListener('input', () => calculate(true));
    form.addEventListener('change', () => calculate(true));
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (Number(area.value) <= 0 || Number(workers.value) <= 0 || city.value.trim().length < 2) return;
      const data = calculate(false);
      Peritus.openWhatsApp([
        'Olá, Peritus SST! Gostaria de validar uma estimativa técnica:',
        '',
        '- Agente: ' + data.item.label,
        '- Área: ' + data.squareMeters + ' m²',
        '- Pontos estimados: ' + data.points,
        '- Trabalhadores expostos: ' + data.workers,
        '- Localidade: ' + city.value.trim() + ' - ' + state.value,
        '- Investimento estimado: ' + Peritus.money(data.total)
      ].join('\n'));
    });

    calculate(false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
