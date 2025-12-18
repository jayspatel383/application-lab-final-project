<template>
  <footer class="footer">
    <div class="footer-left">
      <i><h2 class="company-name">MyShop</h2></i>
      <p class="company-desc">Providing premium watches for every style and occasion.</p>
    </div>

    <div class="footer-right">
      <div class="footer-top">
        <i><h2 class="company-name">company</h2></i>
        <div class="contact-info">
          <b><i><h3>Get in Touch</h3></i></b>
          <p>📞 +1 (234) 567-8901</p>
          <p>✉️ contact@myshop.com</p>
        </div>
      </div>

      <ul class="footer-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/products">Products</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
// No script needed
</script>
<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 60px;
  background-color: #ffffff;
  /* color: #333333; */
  /* border-top: 1px solid #e0e0e0; simple horizontal line */
  flex-wrap: wrap;
}

.footer-left, .footer-right {
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
}

/* Left Side */
.footer-left .company-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #000000;
}
.footer-left .company-desc {
  font-size: 14px;
  line-height: 1.5;
  color: #555;
}

/* Right Side */
.footer-right .footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.footer-right .company-name {
  font-size: 24px;
  font-weight: 700;
  color: #000000;
}

/* Get in Touch */
.contact-info {
  margin-left: 20px;
}

.contact-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.contact-info p {
  margin: 2px 0;
  font-size: 14px;
  color: #555;
}

/* Footer links vertical */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links li a {
  color: #000000;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.footer-links li a:hover {
  color: #ff7a00;
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 20px;
  }

  .footer-right .footer-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-info {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
