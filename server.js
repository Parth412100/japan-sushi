const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const DATA_FILE = path.join(__dirname, 'reservations.json');

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

app.post('/api/reserve', (req, res) => {
  const { name, email, phone, date, time, guests, notes } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ error: 'Name, email, date, and time are required.' });
  }

  const reservation = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name,
    email,
    phone: phone || '',
    date,
    time,
    guests: guests || '2',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  const reservations = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  reservations.push(reservation);
  fs.writeFileSync(DATA_FILE, JSON.stringify(reservations, null, 2), 'utf-8');

  console.log(`\n  New reservation:`);
  console.log(`  ─────────────────────────────`);
  console.log(`  ID:    ${reservation.id}`);
  console.log(`  Name:  ${reservation.name}`);
  console.log(`  Email: ${reservation.email}`);
  console.log(`  Phone: ${reservation.phone}`);
  console.log(`  Date:  ${reservation.date}`);
  console.log(`  Time:  ${reservation.time}`);
  console.log(`  Guests: ${reservation.guests}`);
  if (reservation.notes) console.log(`  Notes: ${reservation.notes}`);
  console.log(`  ─────────────────────────────\n`);

  res.status(201).json({ success: true, id: reservation.id });
});

app.get('/api/reservations', (req, res) => {
  const reservations = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  res.json(reservations);
});

app.listen(PORT, () => {
  console.log(`\n  Umi Sakura server running at:`);
  console.log(`  → http://localhost:${PORT}`);
  console.log(`  → API: http://localhost:${PORT}/api/reserve\n`);
});
