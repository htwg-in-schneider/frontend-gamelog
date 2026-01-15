<template>
  <div class="members-wrapper">
    <div class="members-card">

      <h2 class="title">Impressum</h2>

      <section class="info-box">
        <h3>Projektinformation</h3>
        <p>
          Diese Webseite ist ein studentisches Studienprojekt und wurde im
          Rahmen eines Hochschulkurses erstellt. Sie dient ausschließlich
          Lern-, Übungs- und Demonstrationszwecken.
        </p>
      </section>

      <section>
        <h3>Nicht-kommerzieller Charakter</h3>
        <p>
          Das Projekt verfolgt keine kommerziellen Ziele. Es werden keine
          Produkte oder Dienstleistungen angeboten.
        </p>
      </section>

      <section>
        <h3>Haftung für Inhalte</h3>
        <p>
          Die Inhalte wurden mit größtmöglicher Sorgfalt erstellt. Eine
          Gewähr für Richtigkeit, Vollständigkeit oder Aktualität wird
          nicht übernommen.
        </p>
      </section>

      <section>
        <h3>Externe Links</h3>
        <p>
          Für Inhalte externer Webseiten, auf die verwiesen wird, ist stets
          der jeweilige Anbieter oder Betreiber verantwortlich.
        </p>
      </section>

      <section>
        <h3>Urheberrecht</h3>
        <p>
          Alle verwendeten Marken- oder Produktnamen dienen ausschließlich
          der inhaltlichen Darstellung und verbleiben bei den jeweiligen
          Rechteinhabern.
        </p>
      </section>

      <section class="disclaimer">
        <p>
          <em>
            Dieses Projekt stellt keine offizielle Webseite dar und besitzt
            keine rechtliche Verbindlichkeit.
          </em>
        </p>
      </section>

    </div>
  </div>
</template>

<style scoped>
.members-wrapper {
  min-height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.members-card {
  width: 80%;
  max-width: 900px;
  background-color: #1e1e1e;
  padding: 32px;
  border-radius: 12px;
  color: #e0e0e0;
}

.title {
  text-align: center;
  margin-bottom: 24px;
}

section {
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 6px;
}

p {
  line-height: 1.7;
  color: #ccc;
}

.info-box {
  background: #262626;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #0d6efd;
}

.disclaimer {
  margin-top: 30px;
  text-align: center;
  opacity: 0.7;
  font-size: 0.95rem;
}
</style>
