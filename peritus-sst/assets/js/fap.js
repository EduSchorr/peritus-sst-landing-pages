(function () {
  'use strict';

  function init() {
    const form = document.getElementById('fap-form');
    if (!form) return;

    const salary = document.getElementById('fap-salary');
    const current = document.getElementById('fap-current');
    const rat = document.getElementById('fap-rat');
    const city = document.getElementById('fap-city');
    const state = document.getElementById('fap-state');
    const result = document.getElementById('fap-result');
    state.innerHTML = Peritus.statesOptions('RS');

    function calculate(animate) {
      const payroll = Peritus.parseCurrency(salary.value);
      const fap = Math.min(2, Math.max(.5, Number(current.value) || .5));
      const ratValue = Number(rat.value) || 1;
      const perPayroll = payroll * (ratValue / 100) * fap;
      const annual = perPayroll * 13;
      const twoYears = perPayroll * 26;
      const minimum = payroll * (ratValue / 100) * .5 * 26;
      const difference = Math.max(0, twoYears - minimum);

      document.getElementById('fap-two-years').textContent = Peritus.money(twoYears);
      document.getElementById('fap-per-payroll').textContent = Peritus.money(perPayroll);
      document.getElementById('fap-annual').textContent = Peritus.money(annual);
      document.getElementById('fap-minimum').textContent = Peritus.money(minimum);
      document.getElementById('fap-difference').textContent = Peritus.money(difference);
      if (animate) Peritus.announceResult(result);
      return { payroll, fap, ratValue, twoYears, difference };
    }

    salary.addEventListener('blur', () => {
      Peritus.formatCurrencyInput(salary);
      calculate(true);
    });
    form.addEventListener('input', () => calculate(true));
    form.addEventListener('change', () => calculate(true));
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = calculate(false);
      if (data.payroll <= 0 || city.value.trim().length < 2) return;
      Peritus.openWhatsApp([
        'Olá, Peritus SST! Solicito uma análise preliminar de viabilidade do FAP:',
        '',
        '- Massa salarial mensal: ' + Peritus.money(data.payroll),
        '- FAP vigente: ' + Peritus.number(data.fap, 4),
        '- RAT: ' + data.ratValue + '%',
        '- Localidade: ' + city.value.trim() + ' - ' + state.value,
        '- Impacto estimado em 2 anos: ' + Peritus.money(data.twoYears),
        '- Diferença matemática vs FAP 0,5000: ' + Peritus.money(data.difference)
      ].join('\n'));
    });

    calculate(false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
