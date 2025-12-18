<script setup>
import Footer from "@/components/footer.vue";
import { onMounted, ref } from "vue";

const videoRef = ref(null);

onMounted(() => {
  const video = videoRef.value;
  if (video) {
    video.addEventListener("timeupdate", () => {
      if (video.currentTime >= 10) {
        video.currentTime = 0; // restart video at 0
        video.play(); // continue playing
      }
    });
  }
});
</script>

<template>
  <div class="about-page">
    <!-- Intro Section -->
    <section class="intro-container">
      <div class="intro-video">
        <video ref="videoRef" autoplay muted playsinline>
          <source src="/src/assets/aboutv.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="intro-text">
        <h1>About MyWatch</h1>
        <p>
          Welcome to MyWatch We are committed to providing the best Watch shopping experience with
          a wide range of products at unbeatable prices. Our mission is to make shopping convenient,
          fast, and enjoyable for everyone. We carefully select high-quality products to meet your needs.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.intro-container {
  display: flex;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.intro-video {
  flex: 1;
  min-width: 300px;
}

.intro-video video {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.intro-text {
  flex: 1;
  min-width: 300px;
}

.intro-text h1 {
  font-size: 36px;
  margin-bottom: 20px;
  color: #1e90ff;
}

.intro-text p {
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  text-align: justify;
}

/* Responsive */
@media (max-width: 768px) {
  .intro-container {
    flex-direction: column;
    align-items: center;
  }
  .intro-video video {
    max-width: 80%;
  }
  .intro-text {
    text-align: center;
  }
}
</style>
