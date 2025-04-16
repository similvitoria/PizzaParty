// Carrinho de compras
let cart = [];
 
// Adicionar ao carrinho
function addToCart(item, price) {
    cart.push({ item, price });
    updateCartCount();
    saveCart();
}

// Remover do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    saveCart();
    renderCartItems();
}

// Atualizar contador do carrinho
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Salvar carrinho no localStorage
function saveCart() {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
}

// Carregar carrinho do localStorage
function loadCart() {
    const savedCart = localStorage.getItem('pizzaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function initTabs() {
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.click(); // Simula um clique na primeira aba
    }
}

// Renderizar itens do carrinho
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p>Seu carrinho está vazio</p>
                <a href="menu.html" class="btn">Ver Menu</a>
            </div>
        `;
        subtotalElement.textContent = '$0.00';
        totalElement.textContent = '$3.50';
        return;
    }
    
    let itemsHTML = '';
    let subtotal = 0;
    
    cart.forEach((product, index) => {
        subtotal += parseFloat(product.price);
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${product.item}</h4>
                </div>
                <div class="cart-item-price">$${product.price}</div>
                <span class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-times"></i>
                </span>
            </div>
        `;
    });
    
    const deliveryFee = 3.50;
    const total = subtotal + deliveryFee;
    
    cartItemsContainer.innerHTML = itemsHTML;
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Event listeners para botões "Adicionar ao carrinho"
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    renderCartItems();
    initTabs();
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.getAttribute('data-item');
            const price = this.getAttribute('data-price');
            addToCart(item, price);
            
            // Feedback visual
            this.textContent = 'Adicionado!';
            this.style.backgroundColor = '#2ecc71';
            setTimeout(() => {
                this.textContent = 'Adicionar';
                this.style.backgroundColor = '#e74c3c';
            }, 1000);
        });
    });
    
    // Botão de continuar para pagamento
    const continueToPayment = document.getElementById('continue-to-payment');
    if (continueToPayment) {
        continueToPayment.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Seu carrinho está vazio. Adicione itens antes de continuar.');
                return;
            }
            
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            
            if (!name || !address || !phone) {
                alert('Por favor, preencha todas as informações de entrega.');
                return;
            }
            
            // Aqui você normalmente enviaria os dados para o servidor
            // Neste exemplo, apenas redirecionamos para a página de entrega
            window.location.href = 'delivery.html';
        });
    }
});