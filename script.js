const ADMIN_USER = "miggy636";
const ADMIN_PASSWORD = "canaiza2025";
const LS_PRODUCTS = "cnl_products_v1";
const LS_STORIES = "cnl_stories_v1";
const LS_CART = "cnl_cart_v1";
document.addEventListener('DOMContentLoaded', ()=>{const loader=document.getElementById('loader');setTimeout(()=>{loader.classList.add('hidden');document.body.classList.add('loaded');},3000);faders();renderProducts();renderStories();renderCartCount();});
function faders(){document.querySelectorAll('.fade-section').forEach(el=>{const rect=el.getBoundingClientRect();if(rect.top<window.innerHeight-80)el.classList.add('visible');});}
window.addEventListener('scroll',faders);window.addEventListener('resize',faders);
function loadProducts(){try{return JSON.parse(localStorage.getItem(LS_PRODUCTS))||[];}catch(e){return[];}}
function saveProducts(arr){localStorage.setItem(LS_PRODUCTS,JSON.stringify(arr));}
function loadStories(){try{return JSON.parse(localStorage.getItem(LS_STORIES))||[];}catch(e){return[];}}
function saveStories(arr){localStorage.setItem(LS_STORIES,JSON.stringify(arr));}
function loadCart(){try{return JSON.parse(localStorage.getItem(LS_CART))||[];}catch(e){return[];}}
function saveCart(a){localStorage.setItem(LS_CART,JSON.stringify(a));}
function renderProducts(){const grid=document.getElementById('productGrid');grid.innerHTML='';const products=loadProducts();if(products.length===0){grid.innerHTML='<p class="muted">No products yet. Use Admin to add items.</p>';return;}products.forEach((p,idx)=>{const card=document.createElement('article');card.className='product-card';card.innerHTML=`<div class="product-media"><img src="${p.image}" alt="${p.name}"></div><div class="product-body"><h4 class="product-name">${p.name}</h4><div class="product-price">${p.price}</div><p class="muted">${p.desc||''}</p><div class="product-actions"><button class="btn-outline" onclick="quickView(${idx})">Quick View</button><button class="btn-primary" onclick="addToCart(${idx})">Add to Cart</button></div></div>`;grid.appendChild(card);});}
function renderStories(){const grid=document.getElementById('storiesGrid');grid.innerHTML='';const stories=loadStories();if(stories.length===0){grid.innerHTML='<p class="muted">No stories yet.</p>';return;}stories.forEach((s,idx)=>{const card=document.createElement('article');card.className='story-card';card.innerHTML=`<div class="story-media">${s.image?`<img src="${s.image}" alt="${s.title}">`:''}</div><div class="story-body"><h4>${s.title}</h4><p class="muted">${s.text||''}</p></div>`;grid.appendChild(card);});}
function renderCartCount(){const cart=loadCart();const btn=document.getElementById('cartBtn');btn.textContent=`🛒 (${cart.length})`;}
function addToCart(idx){const products=loadProducts();const item=products[idx];if(!item)return alert('Product not found');const cart=loadCart();cart.push({...item,qty:1});saveCart(cart);renderCartCount();alert('Added to cart');}
document.getElementById('cartBtn').addEventListener('click',()=>{openCart();});
function openCart(){const modal=document.getElementById('cartModal');const itemsDiv=document.getElementById('cartItems');const cart=loadCart();itemsDiv.innerHTML='';if(cart.length===0){itemsDiv.innerHTML='<p class="muted">Cart is empty.</p>';document.getElementById('cartTotal').textContent='KSh 0';}else{let total=0;cart.forEach((c,i)=>{total+=parseFloat(c.price.toString().replace(/[^0-9.-]+/g,""))||0;const el=document.createElement('div');el.style.display='flex';el.style.justifyContent='space-between';el.style.marginBottom='8px';el.innerHTML=`<div style="max-width:70%"><strong>${c.name}</strong><div class="muted">${c.desc||''}</div></div><div><div>${c.price}</div><button onclick="removeCart(${i})" class="btn-outline">Remove</button></div>`;itemsDiv.appendChild(el);});document.getElementById('cartTotal').textContent='KSh '+total.toFixed(2);}modal.classList.remove('hidden');}
document.getElementById('closeCart').addEventListener('click',()=>document.getElementById('cartModal').classList.add('hidden'));
document.getElementById('checkoutBtn').addEventListener('click',()=>{document.getElementById('cartModal').classList.add('hidden');document.getElementById('paymentModal').classList.remove('hidden');});
function removeCart(i){const cart=loadCart();cart.splice(i,1);saveCart(cart);renderCartCount();openCart();}
document.getElementById('closePayment').addEventListener('click',()=>document.getElementById('paymentModal').classList.add('hidden'));
document.getElementById('confirmPayment').addEventListener('click',()=>{document.getElementById('paymentModal').classList.add('hidden');const ty=document.getElementById('thankYou');ty.classList.remove('hidden');setTimeout(()=>ty.classList.add('hidden'),3000);localStorage.removeItem(LS_CART);renderCartCount();});
function quickView(i){const p=loadProducts()[i];if(p)alert(p.name+"\n"+p.price+"\n\n"+(p.desc||''));}
document.getElementById('adminBtn').addEventListener('click',()=>document.getElementById('loginOverlay').classList.remove('hidden'));
document.getElementById('closeLogin').addEventListener('click',()=>document.getElementById('loginOverlay').classList.add('hidden'));
document.getElementById('loginBtn').addEventListener('click',()=>{const user=document.getElementById('adminUser').value.trim();const pw=document.getElementById('adminPassword').value;if(user===ADMIN_USER&&pw===ADMIN_PASSWORD){document.getElementById('loginOverlay').classList.add('hidden');window.open('admin.html','_blank');}else alert('Incorrect admin credentials');});
// allow other pages to add products/stories via localStorage import (admin will use admin.html to push)
