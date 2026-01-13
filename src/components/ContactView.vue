<template>
  <div class="contact-wrapper">
    <div class="contact-card dark-card">
      <h1>Kontakt</h1>

      <form
        action="mailto:matosnico02@gmail.com"
        method="POST"
        enctype="text/plain"
      >
        <input type="text" name="Name" placeholder="Name" required />
        <input type="email" name="Email" placeholder="E-Mail" required />
        <textarea name="Nachricht" placeholder="Nachricht" rows="5" required></textarea>

        <button type="submit">Absenden</button>
      </form>
    </div>
  </div>
</template>
<style scoped>
/* Wrapper zentriert die Card */
.contact-wrapper {
  display: flex;
  justify-content: center;
  margin: 60px 0;
}

/* Card */
.contact-card {
  background: #1e1e1e;
  padding: 32px 36px;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

/* Titel */
.contact-card h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.6rem;
}

/* Inputs & Textarea */
.contact-card input,
.contact-card textarea {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 14px;
  border-radius: 6px;
  border: 1px solid #444;
  background: #2a2a2a;
  color: #fff;
  font-size: 0.95rem;
}

.contact-card input::placeholder,
.contact-card textarea::placeholder {
  color: #aaa;
}

.contact-card input:focus,
.contact-card textarea:focus {
  outline: none;
  border-color: #0d6efd;
}

/* Button */
.contact-card button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #0d6efd;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s ease;
}

.contact-card button:hover {
  background: #0b5ed7;
}
</style>
