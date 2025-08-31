
// ===== Guru Nanak Traders - main.js =====
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  // Simple active link flag if not using server-side
  document.querySelectorAll('header a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === path){ a.classList.add('active'); }
  });

  // Product page logic
  if(path === 'products.html'){
    const grid = document.getElementById('products-grid');
    const search = document.getElementById('search');
    const category = document.getElementById('category');
    const count = document.getElementById('count');

    fetch('data/products.json')
      .then(r => r.json())
      .then(items => {
        let cur = items;
        const render = () => {
          const q = (search.value || '').toLowerCase();
          const cat = category.value;
          const filtered = cur.filter(p => {
            const hit = (p.name + ' ' + p.brand + ' ' + p.description).toLowerCase().includes(q);
            const catOk = (cat === 'all' ? true : p.category === cat);
            return hit && catOk;
          });
          grid.innerHTML = filtered.map(p => `
            <div class="card">
              <img src="${p.image}" alt="${p.name}" style="border-radius:10px;margin-bottom:10px">
              <h3>${p.name}</h3>
              <p>${p.brand} • <span class="badge">${p.category}</span></p>
              <p style="margin-top:6px">${p.description}</p>
              <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
                <a class="btn chip" href="https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent('Interested in '+p.name)}" target="_blank" rel="noopener">Enquire</a>
                ${p.in_stock ? '<span class="badge">In stock</span>' : '<span class="badge">Out of stock</span>'}
              </div>
            </div>
          `).join('');
          count.textContent = `${filtered.length} item(s)`;
        };
        search.addEventListener('input', render);
        category.addEventListener('change', render);
        render();
      }).catch(e => {
        grid.innerHTML = '<div class="notice">Could not load products.json. Ensure the file exists when viewing locally with Live Server or over HTTP.</div>';
      });
  }
})();
