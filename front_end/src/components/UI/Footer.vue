<template>
    <footer class="perfume-footer">
      <div class="footer-container">
        <!-- About Section -->
        <div class="footer-section">
          <h3 class="footer-heading">About Our Perfumes</h3>
          <p class="footer-text">Discover exquisite fragrances crafted with the finest ingredients from around the world.</p>
          <div class="social-icons">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" class="social-link">
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div class="footer-section">
          <h3 class="footer-heading">Quick Links</h3>
          <ul class="footer-links">
            <li v-for="link in quickLinks" :key="link.text">
              <router-link :to="link.path" class="footer-link">{{ link.text }}</router-link>
            </li>
          </ul>
        </div>
        
        <!-- Customer Service -->
        <div class="footer-section">
          <h3 class="footer-heading">Customer Service</h3>
          <ul class="footer-links">
            <li v-for="service in customerServices" :key="service.text">
              <router-link :to="service.path" class="footer-link">{{ service.text }}</router-link>
            </li>
          </ul>
        </div>
        
        <!-- Newsletter -->
        <div class="footer-section">
          <h3 class="footer-heading">Newsletter</h3>
          <p class="footer-text">Subscribe to get updates on new arrivals and special offers.</p>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <input 
              v-model="email" 
              type="email" 
              placeholder="Your email address" 
              required 
              class="newsletter-input"
            >
            <button type="submit" class="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="copyright">
        <p>&copy; {{ currentYear }} Your Perfume Brand. All rights reserved.</p>
        <div class="payment-methods">
          <img 
            v-for="method in paymentMethods" 
            :key="method" 
            :src="`/images/payment/${method}.png`" 
            :alt="`${method} payment`"
            class="payment-icon"
          >
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const email = ref('');
  
  // Current year for copyright
  const currentYear = computed(() => new Date().getFullYear());
  
  // Social media links
  const socialLinks = [
    { name: 'facebook', url: '#', icon: 'fab fa-facebook-f' },
    { name: 'instagram', url: '#', icon: 'fab fa-instagram' },
    { name: 'twitter', url: '#', icon: 'fab fa-twitter' },
    { name: 'pinterest', url: '#', icon: 'fab fa-pinterest-p' },
  ];
  
  // Quick navigation links
  const quickLinks = [
    { text: 'Home', path: '/' },
    { text: 'Shop', path: '/shop' },
    { text: 'Collections', path: '/collections' },
    { text: 'Best Sellers', path: '/best-sellers' },
    { text: 'New Arrivals', path: '/new-arrivals' },
  ];
  
  // Customer service links
  const customerServices = [
    { text: 'Contact Us', path: '/contact' },
    { text: 'FAQs', path: '/faqs' },
    { text: 'Shipping Policy', path: '/shipping' },
    { text: 'Returns & Exchanges', path: '/returns' },
    { text: 'Privacy Policy', path: '/privacy' },
  ];
  
  // Payment methods accepted
  const paymentMethods = ['visa', 'mastercard', 'paypal', 'amex', 'discover'];
  
  // Newsletter subscription function
  const subscribeNewsletter = () => {
    // Implement your newsletter subscription logic here
    console.log('Subscribed with email:', email.value);
    alert('Thank you for subscribing!');
    email.value = '';
  };
  </script>
  
  <style scoped>
  .perfume-footer {
    background-color: #2a2a2a;
    color: #e0e0e0;
    padding: 2rem 0 0;
    font-family: 'Montserrat', sans-serif;
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    padding: 0 1rem;
  }
  
  .footer-section {
    margin-bottom: 1.5rem;
  }
  
  .footer-heading {
    color: #ffffff;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .footer-text {
    margin-bottom: 1rem;
    line-height: 1.5;
    font-size: 0.9rem;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
  }
  
  .footer-links li {
    margin-bottom: 0.5rem;
  }
  
  .footer-link {
    color: #e0e0e0;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s;
  }
  
  .footer-link:hover {
    color: #ffffff;
  }
  
  .social-icons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .social-link {
    color: #e0e0e0;
    font-size: 1.2rem;
    transition: color 0.3s;
  }
  
  .social-link:hover {
    color: #ffffff;
  }
  
  .newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .newsletter-input {
    padding: 0.5rem;
    border: 1px solid #444;
    background-color: #333;
    color: #fff;
    border-radius: 4px;
  }
  
  .newsletter-btn {
    padding: 0.5rem;
    background-color: #8e6c88;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .newsletter-btn:hover {
    background-color: #7a5a74;
  }
  
  .copyright {
    border-top: 1px solid #444;
    padding: 1rem;
    text-align: center;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .payment-methods {
    display: flex;
    gap: 0.5rem;
  }
  
  .payment-icon {
    height: 24px;
    filter: grayscale(100%) brightness(1.5);
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    .footer-container {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .footer-container {
      grid-template-columns: 1fr;
    }
  }
  </style>