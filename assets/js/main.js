// ===== Guru Nanak Traders - main.js with Cart Sidebar (Optimized) =====
document.addEventListener('DOMContentLoaded', () => {

  const path = window.location.pathname.split('/').pop() || 'index.html';

  // Active link highlight
  document.querySelectorAll('header a').forEach(a=>{
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  // Cart setup
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));

  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');

  const renderCart = () => {
    if(!cartItemsEl) return;
    if(cart.length === 0){
      cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
      cartTotalEl.textContent = '';
      return;
    }
    cartItemsEl.innerHTML = cart.map(c=>`
      <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
        <span>${c.name} x ${c.qty}</span>
        <button class="remove-btn" data-id="${c.id}" style="background:none;border:none;color:red;cursor:pointer" aria-label="Remove ${c.name}">x</button>
      </div>
    `).join('');
    const totalItems = cart.reduce((sum,c)=>sum+c.qty,0);
    cartTotalEl.textContent = `Total items: ${totalItems}`;
  };

  // Remove item
  if(cartItemsEl){
    cartItemsEl.addEventListener('click', e=>{
      if(e.target.classList.contains('remove-btn')){
        const id = e.target.dataset.id;
        cart = cart.filter(c=>c.id!==id);
        saveCart();
        renderCart();
      }
    });
  }

  renderCart();

  // Product page logic
  if(path === 'products.html'){
    const grid = document.getElementById('products-grid');
    const search = document.getElementById('search');
    const category = document.getElementById('category');
    const count = document.getElementById('count');

    // Helper: Render a single product card
    function renderProductCard(p) {
      return `
        <div class="card">
          <img src="${p.image}" alt="${p.name}" style="border-radius:10px;margin-bottom:10px">
          <h3>${p.name}</h3>
          <p>${p.brand} • <span class="badge">${p.category}</span></p>
          <p style="margin-top:6px">${p.description}</p>
          <div style="margin-top:10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <input type="number" min="1" value="1" class="qty" data-id="${p.id}" style="width:50px" ${!p.in_stock ? 'disabled' : ''} aria-label="Quantity for ${p.name}">
            <button class="btn chip add-to-cart" data-id="${p.id}" ${!p.in_stock ? 'disabled' : ''} aria-label="Add ${p.name} to cart">Add to Cart</button>
            ${p.in_stock ? '<span class="badge">In stock</span>' : '<span class="badge">Out of stock</span>'}
          </div>
        </div>
      `;
    }

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

          grid.innerHTML = filtered.map(renderProductCard).join('');
          count.textContent = `${filtered.length} item(s)`;
        };

        search.addEventListener('input', render);
        category.addEventListener('change', render);

        // Add to cart
        grid.addEventListener('click', e=>{
          if(e.target.classList.contains('add-to-cart')){
            e.preventDefault();
            const id = e.target.dataset.id;
            const qtyInput = document.querySelector(`.qty[data-id="${id}"]`);
            let qty = parseInt(qtyInput.value, 10);
            if(isNaN(qty) || qty < 1) qty = 1;
            qtyInput.value = qty; // sanitize input
            const item = items.find(p=>p.id===id);
            if(!item || !item.in_stock) return;
            const inCart = cart.find(c=>c.id===id);
            if(inCart) inCart.qty += qty;
            else cart.push({id:item.id, name:item.name, qty});
            saveCart();
            renderCart();
            alert(`${qty} x ${item.name} added to cart`);
          }
        });

        render();
      })
      .catch(e => {
        console.error(e);
        grid.innerHTML = '<div class="notice">Could not load products.json.</div>';
      });
  }

  // Place order
  const placeOrderBtn = document.getElementById('place-order');
  if(placeOrderBtn){
    placeOrderBtn.addEventListener('click', e=>{
      e.preventDefault();
      if(cart.length === 0){ alert('Cart is empty'); return; }
      let msg = 'Hello, I want to order:\n' + cart.map(c=>`${c.qty} x ${c.name}`).join('\n');
      const waLink = `https://wa.me/918958352000?text=${encodeURIComponent(msg)}`;
      window.open(waLink, '_blank');
    });
    }

});