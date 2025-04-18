// Ensure all code executes after the DOM is fully loaded
// and prevent multiple conflicting DOMContentLoaded listeners

document.addEventListener("DOMContentLoaded", function () {
  // ===== CART FUNCTIONALITY =====
  //CAMILA PÉREZ
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addToCart(name, price) {
    cart.push({ name, price: parseFloat(price) });
    saveCart();
    alert(`${name} added to cart!`);
  }

  function displayCartItems() {
    const container = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');
    if (!container) return;

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        ${item.name} - €${item.price.toFixed(2)}
        <button onclick="removeItem(${index})">Remove</button>
      `;
      container.appendChild(div);
      total += item.price;
    });

    totalDisplay.innerText = `Total: €${total.toFixed(2)}`;
  }

  function displayCheckout() {
    const container = document.getElementById('checkout-items');
    const totalDisplay = document.getElementById('checkout-total');
    if (!container) return;

    container.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'checkout-item';
      div.innerText = `${item.name} - €${item.price.toFixed(2)}`;
      container.appendChild(div);
      total += item.price;
    });

    totalDisplay.innerText = `Total: €${total.toFixed(2)}`;
  }

  window.removeItem = function (index) {
    cart.splice(index, 1);
    saveCart();
    displayCartItems();
  };

  window.placeOrder = function () {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    alert("Thank you for your order!");
    localStorage.removeItem('cart');
    window.location.href = "ProductsPage.html";
  };

  window.clearCart = function () {
    localStorage.removeItem('cart');
    window.location.reload();
  };

  const addButtons = document.querySelectorAll('.add-to-cart-btn');
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = button.getAttribute('data-price');
      addToCart(name, price);
    });
  });

  displayCartItems();
  displayCheckout();

  // ===== FLOWER FACTS ON CLICK =====
  //LUZ RECALDE
  if (window.location.pathname.includes("ProductsPage.html")) {
    const images = document.querySelectorAll(".clickable-image");
    images.forEach(image => {
      image.addEventListener("click", function (event) {
        event.preventDefault();
        const fact = this.getAttribute("data-fact") || "This flower is blooming with beauty!";
        alert(fact);
      });
    });
  }

  // ===== CONTACT FORM =====
  //VICTORIA CIFUENTES
  const sendButton = document.getElementById("sendMessageBtn");
  if (sendButton) {
    sendButton.addEventListener("click", function () {
      const firstName = document.getElementById("form_name").value;
      const lastName = document.getElementById("form_lastname").value;
      const email = document.getElementById("form_email").value;
      const need = document.getElementById("form_need").value;
      const message = document.getElementById("form_message").value;

      if (firstName && lastName && email && need && message) {
        alert("Thank you for your message! We'll get back to you soon.");
      } else {
        alert("Please fill out all fields before submitting.");
      }
    });
  }
});

// ===== MINI GAME (NOT INSIDE DOMContentLoaded TO PREVENT DOUBLE BINDING) =====
//VICTORIA CIFUENTES:
(function () {
  const puzzleElement = document.getElementById("puzzle");
  const result = document.getElementById("result");

  if (!puzzleElement || !result) return;

  let flower1 = Math.floor(Math.random() * 31) + 10;
  let flower2Root = Math.floor(Math.random() * 4) + 6;
  let flower2 = flower2Root;
  let flower2Squared = flower2 * flower2;
  let flower3 = flower1 + 5;

  let clue1 = flower1 * 2;
  let clue2 = flower2Squared;
  let clue3 = flower3 - flower1;
  let finalAnswer = flower3 + (flower2 * flower1);

  puzzleElement.innerHTML = `
    🌸 + 🌸 = ${clue1} <br>
    🌼 × 🌼 = ${clue2} <br>
    🌻 - 🌸 = ${clue3} <br><br>
    What is 🌻 + (🌼 × 🌸) ? 🤔
  `;

  window.checkAnswer = function () {
    const userAnswer = Number(document.getElementById("userAnswer").value);

    if (isNaN(userAnswer) || document.getElementById("userAnswer").value.trim() === "") {
      result.innerHTML = `❌ Please enter a number before clicking \"LET'S GO!\"`;
      return;
    }

    if (userAnswer === finalAnswer) {
      result.innerHTML = `🎉 Correct! Well done! 🌸=${flower1}, 🌼=${flower2}, 🌻=${flower3} → 🌻 + (🌼 × 🌸) = ${finalAnswer}`;
    } else {
      result.innerHTML = `❌ Oops! Try again! The correct answer was ${finalAnswer}. 🌸=${flower1}, 🌼=${flower2}, 🌻=${flower3}`;
    }
  };
})();

// ===== VIEW BUTTON REDIRECT =====
//LUZ RECALDE
window.onload = function () {
  const buttons = document.getElementsByClassName("view-button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function (e) {
      e.preventDefault();
      buttons[i].textContent = "Opening...";
      setTimeout(function () {
        window.location.href = buttons[i].href;
      }, 1000);
    };
  }
};

// ===== JQUERY FORM VALIDATION =====
//CAMILA PÉREZ
$(document).ready(function() {
  $("#checkout-form").submit(function(event) {
    var nameRegex = /^[a-zA-Z\s]+$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var cardRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    var cvvRegex = /^\d{3}$/;
    var yearRegex = /^\d{4}$/;

    var fname = $("#fname").val();
    var email = $("#email").val();
    var cardName = $("#cname").val();
    var cardNum = $("#ccnum").val();
    var expYear = $("#expyear").val();
    var cvv = $("#cvv").val();

    if (!nameRegex.test(fname)) {
      alert("Please enter a valid full name (letters and spaces only).");
      event.preventDefault();
    } else if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      event.preventDefault();
    } else if (!nameRegex.test(cardName)) {
      alert("Please enter a valid name on card (letters and spaces only).");
      event.preventDefault();
    } else if (!cardRegex.test(cardNum)) {
      alert("Please enter a valid credit card number (format: 1111-2222-3333-4444).");
      event.preventDefault();
    } else if (!yearRegex.test(expYear) || expYear < new Date().getFullYear()) {
      alert("Please enter a valid expiration year.");
      event.preventDefault();
    } else if (!cvvRegex.test(cvv)) {
      alert("Please enter a valid 3-digit CVV.");
      event.preventDefault();
    }
  });
});
