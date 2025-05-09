// Carrinho de compras
let cart = [];

// Adicionar ao carrinho
function addToCart(item, price, description = "") {
  // Converter price para número
  const priceNum = parseFloat(price);

  // Verificar se o item já existe no carrinho
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.name === item
  );

  if (existingItemIndex >= 0) {
    // Se o item já existe, aumentar a quantidade
    cart[existingItemIndex].quantity += 1;
  } else {
    // Se o item não existe, adicionar novo item
    cart.push({
      name: item,
      price: priceNum,
      quantity: 1,
      description: description,
    });
  }

  updateCartCount();
  saveCart();
}

function initTabs() {
  const firstTab = document.querySelector(".tab-btn");
  if (firstTab) {
    firstTab.click();
  }
}

// Remover do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  saveCart();
  renderCartItems();
}

// Atualizar quantidade de um item
function updateItemQuantity(index, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(index);
  } else {
    cart[index].quantity = newQuantity;
    saveCart();
    renderCartItems();
  }
}

// Atualizar contador do carrinho
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

// Salvar carrinho no localStorage
function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cart));

  // Calcular e salvar o total do pedido
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = 3.5;
  const orderTotal = subtotal + deliveryFee;

  localStorage.setItem("orderTotal", orderTotal.toFixed(2));
}

// Carregar carrinho do localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

// Limpar carrinho
function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  renderCartItems();
}

// Inicializar abas na página de menu
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabButtons.length === 0) return;

  function showTab(tabId) {
    // Esconder todos os conteúdos de abas
    tabContents.forEach((content) => {
      content.style.display = "none";
    });

    // Remover classe ativa de todos os botões
    tabButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Mostrar a aba selecionada
    document.getElementById(tabId).style.display = "block";

    // Adicionar classe ativa ao botão clicado
    document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
  }

  // Adicionar evento de clique a cada botão de aba
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");
      showTab(tabId);
    });
  });

  // Mostrar a primeira aba por padrão
  if (tabButtons.length > 0) {
    const firstTabId = tabButtons[0].getAttribute("data-tab");
    showTab(firstTabId);
  }
}

// Renderizar itens do carrinho
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
         <div class="empty-cart">
             <p>Seu carrinho está vazio</p>
             <a href="menu.html" class="btn">Ver Menu</a>
         </div>
     `;
    if (subtotalElement) subtotalElement.textContent = "$0.00";
    if (totalElement) totalElement.textContent = "$3.50";
    return;
  }

  let itemsHTML = "";
  let subtotal = 0;

  cart.forEach((product, index) => {
    const itemTotal = product.price * product.quantity;
    subtotal += itemTotal;

    itemsHTML += `
         <div class="cart-item">
             <div class="cart-item-info">
                 <h4>${product.name}</h4>
                 <div class="quantity-controls">
                     <span>${product.quantity}</span>
                 </div>
             </div>
             <div class="cart-item-price">
                 <span>$${itemTotal.toFixed(2)}</span>
                 <span class="cart-item-remove" onclick="removeFromCart(${index})">
                     <i class="fas fa-times"></i>
                 </span>
             </div>
         </div>
     `;
  });

  const deliveryFee = 3.5;
  const total = subtotal + deliveryFee;

  cartItemsContainer.innerHTML = itemsHTML;

  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

// Inicializar página de checkout
// Inicializar página de checkout
function initCheckout() {
  const continueToPayment = document.getElementById("continue-to-payment");
  if (!continueToPayment) return;

  continueToPayment.addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const instructions = document.getElementById("instructions")?.value || "";

    // Verificar campos obrigatórios
    if (!name || !address || !phone || !email) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Verificar se o carrinho tem itens
    if (cart.length === 0) {
      alert("Seu carrinho está vazio. Adicione itens antes de continuar.");
      return;
    }

    // Preparar dados do cliente
    const customerData = {
      name: name,
      email: email,
      address: address,
      phone: phone,
      instructions: instructions,
    };

    // Calcular o total do pedido
    const totalPrice =
      cart.reduce((total, item) => total + item.price * item.quantity, 0) + 3.5; // Adicionando taxa de entrega

    // Preparar dados do pedido
    const orderData = {
      products: cart.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description || "",
        category: item.category || "Pizza",
        image_path: item.image_path || "",
        price: item.price,
      })),
      total_price: totalPrice,
    };

    // Dados completos para enviar ao servidor
    const data = {
      customer: customerData,
      order: orderData,
    };

    // Salvar informações do cliente no localStorage (para compatibilidade com código existente)
    localStorage.setItem("customerName", name);
    localStorage.setItem("customerEmail", email);
    localStorage.setItem("customerAddress", address);
    localStorage.setItem("customerPhone", phone);
    localStorage.setItem("deliveryInstructions", instructions);

    // Enviar dados para o servidor
    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao processar o pedido");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Resposta do servidor:", responseData);

        // Se você precisar armazenar o ID do pedido retornado pelo servidor
        if (responseData.id) {
          localStorage.setItem("orderId", responseData.id);
        }

        // Redirecionar para a página de entrega
        window.location.href = "delivery.html";
      })
      .catch((error) => {
        alert("Ocorreu um erro: " + error.message);
        console.error("Erro:", error);
      });
  });
}

// Inicializar página de confirmação
function initConfirmation() {
  const orderDetailsElement = document.getElementById("order-details");
  if (!orderDetailsElement) return;

  const customerName = localStorage.getItem("customerName");
  const customerAddress = localStorage.getItem("customerAddress");
  const customerPhone = localStorage.getItem("customerPhone");
  const paymentId = localStorage.getItem("paymentId");
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const orderTotal = localStorage.getItem("orderTotal");

  if (!customerName || !paymentId || cartItems.length === 0) {
    orderDetailsElement.innerHTML = `
         <div class="error-message">
             <p>Não foi possível carregar os detalhes do pedido.</p>
             <a href="menu.html" class="btn">Voltar ao Menu</a>
         </div>
     `;
    return;
  }

  // Gerar número de pedido aleatório
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  // Calcular tempo estimado de entrega (30-45 minutos a partir de agora)
  const now = new Date();
  const deliveryTimeMin = new Date(now.getTime() + 30 * 60000);
  const deliveryTimeMax = new Date(now.getTime() + 45 * 60000);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Construir HTML dos itens do pedido
  let itemsHTML = "";
  cartItems.forEach((item) => {
    itemsHTML += `
         <div class="order-item">
             <span>${item.quantity}x ${item.name}</span>
             <span>$${(item.price * item.quantity).toFixed(2)}</span>
         </div>
     `;
  });

  // Exibir detalhes do pedido
  orderDetailsElement.innerHTML = `
     <div class="order-confirmation">
         <div class="order-header">
             <h3>Pedido #${orderNumber} Confirmado!</h3>
             <p>Obrigado por seu pedido, ${customerName}!</p>
         </div>
         
         <div class="order-info">
             <div class="info-section">
                 <h4>Detalhes da Entrega</h4>
                 <p><strong>Endereço:</strong> ${customerAddress}</p>
                 <p><strong>Telefone:</strong> ${customerPhone}</p>
                 <p><strong>Tempo estimado:</strong> ${formatTime(
                   deliveryTimeMin
                 )} - ${formatTime(deliveryTimeMax)}</p>
             </div>
             
             <div class="info-section">
                 <h4>Resumo do Pedido</h4>
                 <div class="order-items">
                     ${itemsHTML}
                 </div>
                 <div class="order-total">
                     <span>Total</span>
                     <span>$${orderTotal}</span>
                 </div>
             </div>
             
             <div class="info-section">
                 <h4>Pagamento</h4>
                 <p><strong>Método:</strong> Cartão de Crédito</p>
                 <p><strong>ID da Transação:</strong> ${paymentId}</p>
                 <p><strong>Status:</strong> <span class="payment-status success">Aprovado</span></p>
             </div>
         </div>
         
         <div class="order-footer">
             <p>Um e-mail de confirmação foi enviado para seu endereço de e-mail.</p>
             <a href="index.html" class="btn">Voltar à Página Inicial</a>
         </div>
     </div>
 `;

  // Limpar o carrinho após confirmação bem-sucedida
  clearCart();
}

document.addEventListener("DOMContentLoaded", function () {
  loadCart();
  renderCartItems();
  initTabs();
  initCheckout();
  initConfirmation();

  // Event listeners para botões "Adicionar ao carrinho"
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const item = this.getAttribute("data-item");
      const price = this.getAttribute("data-price");
      const description = this.getAttribute("data-description") || "";

      addToCart(item, price, description);

      // Feedback visual
      const originalText = this.textContent;
      const originalBg = this.style.backgroundColor;

      this.textContent = "Adicionado!";
      this.style.backgroundColor = "#2ecc71";

      setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = originalBg || "#e74c3c";
      }, 1000);
    });
  });

  // Adicionar listener para a página de pagamento
  if (window.location.pathname.includes("payment.html")) {
    const paymentForm = document.getElementById("payment-form");
    if (paymentForm) {
      paymentForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Simulação de processamento de pagamento bem-sucedido
        const submitButton = document.getElementById("submit-payment");
        const spinner = document.getElementById("spinner");
        const buttonText = document.getElementById("button-text");

        if (submitButton && spinner && buttonText) {
          submitButton.disabled = true;
          buttonText.textContent = "Processando...";
          spinner.classList.remove("hidden");

          // Simular um atraso de processamento
          setTimeout(() => {
            // Gerar um ID de pagamento fictício
            const paymentId = "pay_" + Math.random().toString(36).substr(2, 9);
            localStorage.setItem("paymentId", paymentId);

            // Redirecionar para a página de entrega em vez de confirmação
            window.location.href = "delivery.html";
          }, 2000);
        }
      });
    }
  }
});
