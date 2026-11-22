/* Medição da Zuelli: Google Analytics 4 + Microsoft Clarity.
   Nada é carregado antes de a pessoa aceitar (LGPD). Escolha salva neste navegador.
   Conversões: generate_lead (clique no WhatsApp ou formulário enviado). */
(function () {
  var GA = 'G-NHP7ZD0W63', CLARITY = 'zftlq6ez4n', CHAVE = 'zv-consentimento';
  var ativo = false;

  function ler() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function salvar(v) { try { localStorage.setItem(CHAVE, v); } catch (e) {} }

  function carregar() {
    if (ativo) return; ativo = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA);
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA; document.head.appendChild(s);
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY);
  }

  /* Evento público para o resto do site: window.zvEvento('nome', {params}) */
  window.zvEvento = function (nome, params) {
    if (!ativo || !window.gtag) return;
    gtag('event', nome, params || {});
    if (window.clarity) clarity('event', nome);
  };

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var onde = a.getAttribute('data-local') || (a.closest('header') ? 'topo' : a.closest('footer') ? 'rodape' : a.closest('form') ? 'formulario' : 'pagina');
    if (/wa\.me|api\.whatsapp/.test(href)) window.zvEvento('generate_lead', { method: 'whatsapp', link_location: onde, page_path: location.pathname });
    else if (/instagram\.com/.test(href)) window.zvEvento('click_instagram', { link_location: onde });
  }, true);

  /* Banner */
  var css = '.zv-ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:520px;margin:0 auto;background:#10181A;color:#F3F6F5;border:1px solid #2A3638;border-radius:18px;padding:18px 18px 16px;box-shadow:0 18px 48px -18px rgba(0,0,0,.6);font:400 .95rem/1.5 "Space Grotesk",system-ui,sans-serif}' +
    '.zv-ck p{margin:0 0 14px}.zv-ck a{color:#2DD4BF}.zv-ck .b{display:flex;gap:10px;flex-wrap:wrap}' +
    '.zv-ck button{min-height:44px;padding:0 20px;border-radius:999px;font:600 .95rem "Space Grotesk",system-ui,sans-serif;cursor:pointer;border:1px solid #2DD4BF}' +
    '.zv-ck .s{background:#2DD4BF;color:#10181A}.zv-ck .n{background:transparent;color:#F3F6F5;border-color:#5B6B69}' +
    '.zv-ck button:focus-visible{outline:3px solid #F3F6F5;outline-offset:2px}';

  function banner() {
    if (document.querySelector('.zv-ck')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var d = document.createElement('div'); d.className = 'zv-ck'; d.setAttribute('role', 'region'); d.setAttribute('aria-label', 'Cookies de medição');
    d.innerHTML = '<p>Posso usar cookies de medição (Google Analytics e Microsoft Clarity) para entender como o site é usado e melhorá-lo? Nada de anúncios. <a href="/privacidade/">Saiba mais</a></p>' +
      '<div class="b"><button type="button" class="s">Aceitar</button><button type="button" class="n">Recusar</button></div>';
    document.body.appendChild(d);
    d.querySelector('.s').addEventListener('click', function () { salvar('sim'); d.remove(); carregar(); });
    d.querySelector('.n').addEventListener('click', function () { salvar('nao'); d.remove(); });
  }

  window.zvPreferencias = function () {
    try { localStorage.removeItem(CHAVE); } catch (e) {}
    if (ativo) { location.reload(); return; }
    banner();
  };

  var v = ler();
  if (v === 'sim') carregar();
  else if (v !== 'nao') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner); else banner();
  }
})();
