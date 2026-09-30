(function () {
  'use strict';

  const services = {
    insalubridade: { label: 'Insalubridade', base: 1350, title: 'Por que contratar assistência em insalubridade?', text: 'A análise verifica agentes nocivos, controles existentes e critérios aplicáveis ao caso.' },
    periculosidade: { label: 'Periculosidade', base: 1450, title: 'Por que contratar assistência em periculosidade?', text: 'Avalia inflamáveis, explosivos, eletricidade e demais hipóteses relacionadas à NR-16.' },
    combinada: { label: 'Insalubridade + Periculosidade', base: 1950, title: 'Por que integrar as duas análises?', text: 'Estratégia integrada para processos que discutem pedidos cumulados ou alternativos.' },
    acidente: { label: 'Acidente ou Doença do Trabalho', base: 2200, title: 'Por que avaliar acidente ou doença do trabalho?', text: 'Avaliação do nexo causal, condições da atividade, ergonomia, documentos e medidas preventivas.' }
  };

  const deadlines = {
    standard: { label: 'Padrão — até 15 dias', factor: 1 },
    priority: { label: 'Prioritário — até 5 dias', factor: 1.25 },
    urgent: { label: 'Plantão urgente — até 48h', factor: 1.5 }
  };

  function init() {
    const form = document.getElementById('forensic-form');
    if (!form) return;

    const type = document.getElementById('forensic-type');
    const sectors = document.getElementById('forensic-sectors');
    const deadline = document.getElementById('forensic-deadline');
    const city = document.getElementById('forensic-city');
    const state = document.getElementById('forensic-state');
    const result = document.getElementById('forensic-result');
    state.innerHTML = Peritus.statesOptions('RS');

    function calculate(animate) {
      const service = services[type.value];
      const term = deadlines[deadline.value];
      const count = Math.max(1, Math.floor(Number(sectors.value) || 1));
      const additional = Math.max(0, count - 1) * 350;
      const total = (service.base + additional) * term.factor;

      document.getElementById('forensic-explanation-title').textContent = service.title;
      document.getElementById('forensic-explanation').textContent = service.text;
      document.getElementById('forensic-total').textContent = Peritus.money(total);
      document.getElementById('forensic-base').textContent = Peritus.money(service.base);
      document.getElementById('forensic-additional').textContent = Peritus.money(additional);
      document.getElementById('forensic-factor').textContent = Peritus.number(term.factor, 2) + 'x';
      if (animate) Peritus.announceResult(result);
      return { service, term, count, total };
    }

    form.addEventListener('input', () => calculate(true));
    form.addEventListener('change', () => calculate(true));
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (Number(sectors.value) < 1 || city.value.trim().length < 2) return;
      const data = calculate(false);
      Peritus.openWhatsApp([
        'Olá, Peritus SST! Gostaria de agendar uma consulta pericial preliminar:',
        '',
        '- Objeto pericial: ' + data.service.label,
        '- Setores mapeados: ' + data.count,
        '- Prazo: ' + data.term.label,
        '- Localidade: ' + city.value.trim() + ' - ' + state.value,
        '- Estimativa preliminar: ' + Peritus.money(data.total)
      ].join('\n'));
    });

    calculate(false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
