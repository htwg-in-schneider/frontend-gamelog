<script setup>
</script>

<template>
  <div class="impressum-wrapper">
    <div class="impressum-card">
      <h1>Impressum</h1>

      <section>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>Gamelog</strong><br />
          (Studien- & Demoprojekt)<br />
          Musterstraße 12<br />
          78462 Konstanz<br />
          Deutschland
        </p>
      </section>

      <section>
        <h2>Vertreten durch</h2>
        <p>Nico Matos</p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail:
          <a href="mailto:nico.matos@example.com">
            nico.matos@example.com
          </a>
        </p>
      </section>

      <section>
        <h2>Haftungsausschluss</h2>
        <p>
          Dies ist ein nicht-kommerzielles Demo- und Studienprojekt.
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
          Haftung für die Inhalte externer Links. Für den Inhalt der
          verlinkten Seiten sind ausschließlich deren Betreiber
          verantwortlich.
        </p>
      </section>

      <section>
        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
          diesen Seiten unterliegen dem deutschen Urheberrecht.
          Beiträge Dritter sind als solche gekennzeichnet.
        </p>
      </section>

      <section class="disclaimer">
        <p>
          <em>
            Hinweis: Diese Webseite ist ein studentisches Projekt und dient
            ausschließlich Demonstrationszwecken.
          </em>
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* 🌑 Seitenhintergrund & Zentrierung */
.impressum-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #121212;
  padding: 40px 0;
  overflow-y: auto;
}

/* 📄 Content-Card */
.impressum-card {
  width: 80%;
  max-width: 900px;
  background-color: #1e1e1e;
  color: #e0e0e0;
  padding: 40px 48px;
  border-radius: 12px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.4);
}

/* 🧾 Typografie */
h1 {
  text-align: center;
  margin-bottom: 32px;
  font-size: 2.2rem;
}

h2 {
  margin-top: 28px;
  margin-bottom: 8px;
  font-size: 1.2rem;
  color: #ffffff;
}

p {
  line-height: 1.7;
  margin-bottom: 8px;
}

/* 🔗 Links */
a {
  color: #4cafef;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* ⚠️ Hinweis */
.disclaimer {
  margin-top: 32px;
  font-size: 0.95rem;
  opacity: 0.7;
  text-align: center;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .impressum-card {
    width: 90%;
    padding: 28px 24px;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>
