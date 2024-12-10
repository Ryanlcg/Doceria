const products = [
    { id: 1, name: 'Brigadeiro Gourmet', price: 2.5, image: 'imagens/brigadeiro.jpg' },
    { id: 2, name: 'Beijinho', price: 2.0, image: 'imagens/beijinho.jpg' },
    { id: 3, name: 'Casadinho', price: 2.2, image: 'imagens/casadinho.webp' },
    { id: 4, name: 'Trufa de Chocolate', price: 3.0, image: 'imagens/trufa.webp' },
    { id: 5, name: 'Pé de Moleque', price: 1.8, image: 'imagens/pe.jpeg' },
    { id: 6, name: 'Cajuzinho', price: 2.1, image: 'imagens/cajuzinho.jpeg' },
    { id: 7, name: 'Doce de Leite', price: 2.7, image: 'imagens/leite.jpeg' },
    { id: 8, name: 'Bolo de Pote', price: 6.0, image: 'imagens/bolo.jpeg' },
    { id: 9, name: 'Palha Italiana', price: 3.5, image: 'imagens/palha.jpeg' },
    { id: 10, name: 'Brownie', price: 4.0, image: 'imagens/brownie.jpeg' },
];

const cart = [];

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
}

function loadProducts() {
    const productList = document.getElementById('product-list');
    if (productList) { 
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>R$ ${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Adicionar</button>
            `;
            productList.appendChild(productCard);
        });
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('hidden');
    notification.classList.add('visible');

    setTimeout(() => {
        notification.classList.remove('visible');
        notification.classList.add('hidden');
    }, 3000);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    showNotification(`${product.name} foi adicionado ao carrinho!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} - R$ ${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartItems.appendChild(div);
    });
    updateTotal();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function finalizeOrder() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const orderDetails = cart
        .map(item => `${item.name} - R$ ${item.price.toFixed(2)}`)
        .join('\n');
    const whatsappMessage = encodeURIComponent(
        `Olá, gostaria de fazer um pedido:\n\n${orderDetails}\n\nTotal: R$ ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}`
    );
    window.open(`https://wa.me/5521976446705?text=${whatsappMessage}`, '_blank');
}

function toggleCart() {
    const cartDetails = document.getElementById('cart-details');
    cartDetails.style.display = cartDetails.style.display === 'block' ? 'none' : 'block';
}

function goToCart() {
    toggleCart();
}

window.onload = loadProducts;
window.addEventListener("load", function () {
    // Exibe os produtos ao carregar a página
    loadProducts();
});

window.addEventListener("load", function () {
    // Adiciona os alertas e prompts
    alert("Bem-vindo à Loja de Doces! Por favor, faça login para continuar.");
    const email = prompt("Digite seu email:");
    const senha = prompt("Digite sua senha:");

    if (email && senha) {
        alert(`Olá, ${email}! Aproveite suas compras na Loja de Doces!`);
    } else {
        alert("Você precisa fornecer um email e senha para acessar todos os recursos.");
    }
});

