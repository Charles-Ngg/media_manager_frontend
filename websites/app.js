(function () {
  const host = window.location.hostname || '192.168.50.222';
  const sites = (window.WEBSITES || []).map((site) => ({
    ...site,
    url: site.url || `http://${host}:${site.port}${site.path}`,
  }));

  const grid = document.getElementById('site-grid');
  const hostLine = document.getElementById('host-line');
  const frontendLink = document.getElementById('frontend-link');
  const filters = Array.from(document.querySelectorAll('.filter'));

  hostLine.textContent = `主機: ${host}`;
  frontendLink.href = `http://${host}:3000/`;

  function render(filter) {
    const visibleSites = filter === 'all'
      ? sites
      : sites.filter((site) => site.category === filter);

    grid.replaceChildren(...visibleSites.map((site) => {
      const card = document.createElement('article');
      card.className = 'site-card';

      const head = document.createElement('div');
      head.className = 'site-head';

      const title = document.createElement('h2');
      title.textContent = site.label;

      const port = document.createElement('span');
      port.className = 'port';
      port.textContent = `:${site.port}`;

      const note = document.createElement('p');
      note.textContent = site.note;

      const link = document.createElement('a');
      link.href = site.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = site.url;

      head.append(title, port);
      card.append(head, note, link);

      return card;
    }));
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      render(button.dataset.filter);
    });
  });

  render('all');
}());
