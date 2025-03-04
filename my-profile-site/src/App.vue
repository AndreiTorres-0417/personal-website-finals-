<script setup>
import { ref, onMounted, computed } from 'vue'
import { createClient } from '@supabase/supabase-js'
import AccordionComponent from '@/components/ui/AccordionComponent.vue'

const supabase = createClient(
  'https://eifcmrdauutokwrgrrdf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZmNtcmRhdXV0b2t3cmdycmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MzM2MzksImV4cCI6MjA1NjQwOTYzOX0.peMKLD0LK8jYJtatqnZcozUTokfWus4ez03W254LzZ8'
)

// Tabs
const activeTab = ref('about')

// Comments
const newName = ref('')
const newMessage = ref('')
const comments = ref([])

// Image Gallery
const images = ref([
  'https://raw.githubusercontent.com/AndreiTorres-0417/personal-website-finals-/main/Images/Al%20being%20cute.jpg',
  'https://raw.githubusercontent.com/AndreiTorres-0417/personal-website-finals-/main/Images/Feeding%20Al.jpg',
  'https://raw.githubusercontent.com/AndreiTorres-0417/personal-website-finals-/main/Images/With%20Dex.jpg',
  'https://raw.githubusercontent.com/AndreiTorres-0417/personal-website-finals-/main/Images/With%20the%20Boyz.jpg',
  'https://raw.githubusercontent.com/AndreiTorres-0417/personal-website-finals-/main/Images/CT%20Winner.jpg',
  'https://raw.githubusercontent.com/AndreiTorres-0417/personal-website-finals-/main/Images/Cosplay%20Hanako%20Kun.JPG',
  'https://raw.githubusercontent.com/AndreiTorres-0417/personal-website-finals-/main/Images/Jump%20Date.jpg',
  'https://raw.githubusercontent.com/AndreiTorres-0417/personal-website-finals-/main/Images/Senior%20High%20Graduation%20Picture.jpg',
  'https://raw.githubusercontent.com/AndreiTorres-0417/personal-website-finals-/main/Images/Funny%20Skull.jpg'
])

onMounted(fetchComments)

async function fetchComments () {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false })

  if (!error) {
    comments.value = data
  }
}

async function addComment () {
  if (!newName.value || !newMessage.value) return

  const { error } = await supabase.from('comments').insert([
    { name: newName.value, message: newMessage.value }
  ])

  if (!error) {
    fetchComments()
    newName.value = ''
    newMessage.value = ''
  }
}

// Gallery Logic
const imagesPerPage = 4
const currentIndex = ref(0)

const totalPages = computed(() => Math.ceil(images.value.length / imagesPerPage))

const scrollLeft = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const scrollRight = () => {
  if (currentIndex.value < totalPages.value - 1) {
    currentIndex.value++
  }
}

const getVisibleImages = computed(() => {
  const start = currentIndex.value * imagesPerPage
  const end = start + imagesPerPage
  const visible = images.value.slice(start, end)

  while (visible.length < imagesPerPage) {
    visible.push(null)
  }

  return visible
})
</script>

<template>
  <div class="container">
    <header class="header">
      <nav>
        <div class="logo">My Personal Website</div> <!-- ✅ Added this -->
        <ul>
          <li><a href="#about">About Me</a></li>
          <li><a href="#fun-facts">Facts About Me</a></li>
          <li><a href="#gallery">Picture Gallery</a></li>
          <li><a href="#comments">Comments</a></li>
        </ul>
      </nav>
    </header>

    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <p class="hero-intro">Hi There!</p>
          <h1>I am Andrei Luis Torres</h1>
          <h2>CS Student</h2>
          <p> I am no web designer, but I really tried my hardest creating this website.</p>
        </div>
        <div class="hero-image-container">
          <img class="hero-image" src="https://raw.githubusercontent.com/AndreiTorres-0417/personal-website-finals-/main/Images/SelfPhoto.png" alt="Andrei Luis Torres">
        </div>
      </div>
    </section>

<section id="about" class="bio">
  <div class="bio-content">
    <!-- Left Side (Image) -->
    <div class="bio-image">
      <img src="https://raw.githubusercontent.com/AndreiTorres-0417/personal-website-finals-/main/Images/Capybara%20visit.jpg" alt="Andrei Luis Torres">
    </div>

    <!-- Right Side (Tabs & Text) -->
    <div class="bio-text">
      <div class="tabs">
        <button @click="activeTab = 'about'" :class="{ active: activeTab === 'about' }">About Me</button>
        <button @click="activeTab = 'skills'" :class="{ active: activeTab === 'skills' }">Skills</button>
        <button @click="activeTab = 'experience'" :class="{ active: activeTab === 'experience' }">Experience</button>
      </div>

      <div class="bio-description">
        <div v-if="activeTab === 'about'">
          <h2>My Story</h2>
          <p>Hi! I’m Andrei Luis Torres, a Computer Science student at Asia Pacific College, specializing in System Software. My passion for coding started with video games, which sparked my curiosity about how software works.

Over the years, I’ve honed my skills in programming, problem-solving, and system software development. I aspire to become a software developer, building efficient, scalable, and innovative solutions. I’m always eager to learn, create, and push my skills further, transforming ideas into reality through code.</p>
        </div>

        <div v-if="activeTab === 'skills'">
          <h2>Skills</h2>
          <ul>
            <li>Programming Languages: Python, C#</li>
            <li>Web Development: HTML, CSS, Vue.js</li>
            <li>App building: Unity</li>
            <li>Database: SQL</li>
          </ul>
        </div>

        <div v-if="activeTab === 'experience'">
          <h2>Experience</h2>
          <p><strong>Student</strong> - 2023 - Present</p>
          <p>I've coded in Python and C#, with experience in Unity. I also have some web development experience, including building this very website!</p>
        </div>
      </div>
    </div>
  </div>
</section>

    <section id="fun-facts" class="faq-section">
      <h2>Fun facts about me</h2>
      <AccordionComponent />
    </section>

    <section id="gallery" class="image-gallery">
      <h2 class="gallery-title">Picture Gallery</h2>
      <div class="gallery-wrapper">
        <button @click="scrollLeft" class="gallery-nav left" :disabled="currentIndex === 0">❮</button>
        <div class="gallery-container">
          <div class="gallery-track">
            <div v-for="(image, index) in getVisibleImages" :key="index" class="gallery-item">
              <img v-if="image" :src="image" alt="Gallery Image">
            </div>
          </div>
        </div>
        <button @click="scrollRight" class="gallery-nav right" :disabled="currentIndex === totalPages - 1">❯</button>
      </div>
    </section>

    <section id="comments" class="comment-section">
      <h2>Leave a comment!</h2>
      <form @submit.prevent="addComment">
        <input v-model="newName" type="text" placeholder="Your Name" required />
        <textarea v-model="newMessage" placeholder="Your Comment" required></textarea>
        <button type="submit">Submit</button>
      </form>
      <div class="comments">
        <h3>Previous Comments</h3>
        <ul>
          <li v-for="comment in comments" :key="comment.id">
            <strong>{{ comment.name }}:</strong> {{ comment.message }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
