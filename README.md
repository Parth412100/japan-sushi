# Umi Sakura Sushi

Japanese sushi restaurant website with online reservation system.

## Features

- Responsive sushi restaurant landing page
- Online reservation form with API backend
- Reservation data stored in `reservations.json`
- Clean, modern Japanese aesthetic design

## Installation

```bash
git clone https://github.com/Parth412100/japan-sushi.git
cd japan-sushi
npm install
```

## Usage

```bash
npm start
```

Then open your browser to:

```
http://localhost:3000
```

## API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/reserve` | POST | Create a reservation |
| `/api/reservations` | GET | View all reservations |

### POST `/api/reserve`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "date": "2026-06-15",
  "time": "19:00",
  "guests": "4",
  "notes": "Window seat"
}
```

## Folder Structure

```
japan-sushi/
├── index.html            # Restaurant landing page
├── server.js             # Express.js backend
├── package.json          # Dependencies
├── reservations.json     # Reservation data store
└── README.md
```
