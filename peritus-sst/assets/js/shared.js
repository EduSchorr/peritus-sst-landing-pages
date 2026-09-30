(function () {
  'use strict';

  const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  function money(value) {
    return BRL.format(Number.isFinite(Number(value)) ? Number(value) : 0);
  }

  function number(value, digits) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: digits || 0,
      maximumFractionDigits: digits || 0
    }).format(Number(value) || 0);
  }

  function parseCurrency(value) {
    const raw = String(value || '').trim();
    if (!raw) return 0;
    if (raw.includes(',')) {
      const normalized = raw.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
      return Number(normalized) || 0;
    }
    const normalized = raw.replace(/[^\d.-]/g, '');
    return Number(normalized) || 0;
  }

  function formatCurrencyInput(input) {
    const value = parseCurrency(input.value);
    input.value = money(value);
    return value;
  }

  function statesOptions(selected) {
    const states = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
    return states.map(function (state) {
      return '<option value="' + state + '"' + (state === selected ? ' selected' : '') + '>' + state + '</option>';
    }).join('');
  }

  function announceResult(element) {
    if (!element) return;
    element.classList.remove('result-flash');
    void element.offsetWidth;
    element.classList.add('result-flash');
  }

  function openWhatsApp(message) {
    const url = 'https://wa.me/5554999999999?text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function setupSharedUI() {
    const menuButton = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-main-nav]');
    if (menuButton && nav) {
      menuButton.addEventListener('click', function () {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        nav.classList.toggle('nav-open', !isOpen);
      });
      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          menuButton.setAttribute('aria-expanded', 'false');
          nav.classList.remove('nav-open');
        });
      });
    }

    document.querySelectorAll('[data-accordion-button]').forEach(function (button) {
      button.addEventListener('click', function () {
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        panel.hidden = expanded;
      });
    });

    document.querySelectorAll('[data-scroll-calculator]').forEach(function (button) {
      button.addEventListener('click', function () {
        const calculator = document.querySelector('[data-calculator]');
        if (calculator) calculator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  window.Peritus = { money, number, parseCurrency, formatCurrencyInput, statesOptions, announceResult, openWhatsApp };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupSharedUI);
  else setupSharedUI();
}());
