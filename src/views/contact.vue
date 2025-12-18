<script setup>
import Footer from "@/components/footer.vue";
</script>

<template>
  <div class="contact-page">
    <!-- Contact Section -->
    <section class="contact-container">
      <div class="contact-image">
        <img src="/src/assets/contact image2.jpeg" alt="Contact Us" />
      </div>
      <div class="contact-info">
        <h1>Contact Us</h1>
        <p>If you have any questions or need assistance, feel free to reach out to us. We're here to help!</p>

        <div class="info-block">
          <h3>Phone:</h3>
          <p>+1 (234) 567-8901</p>
        </div>
        <div class="info-block">
          <h3>Email:</h3>
          <p>support@myshop.com</p>
        </div>
        <div class="info-block">
          <h3>Address:</h3>
          <p>123 Main Street, City, Country</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<style scoped>
.contact-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* Contact Section */
.contact-container {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.contact-image {
  flex: 1;
  min-width: 300px;
}

.contact-image img {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.contact-info {
  flex: 1;
  min-width: 300px;
}

.contact-info h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #1e90ff;
}

.contact-info p {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.info-block {
  margin-bottom: 15px;
}

.info-block h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: #1e90ff;
}

.info-block p {
  font-size: 16px;
  color: #555;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .contact-image img {
    max-width: 80%;
  }
  .contact-info {
    text-align: center;
  }
}
</style>
