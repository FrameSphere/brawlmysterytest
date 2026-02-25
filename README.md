# 🎮 Brawl Stars Guess

Ein tägliches Rate-Spiel für Brawl Stars Fans! Errate den täglichen Brawler in 4 verschiedenen Spielmodi.

## 🌟 Features

### 4 Spielmodi
- **🎯 Klassisch:** Errate den Brawler anhand eines verschwommenen Bildes
- **🖼️ Pixel:** Das Bild wird mit jedem Versuch weniger pixelig
- **😊 Emoji:** Rate anhand von Emojis
- **📝 Beschreibung:** Eine Beschreibung wird Wort für Wort enthüllt

### Funktionen
- ✅ Täglicher Brawler (ändert sich jeden Tag)
- 📊 Statistiken & Streak-Tracking
- 🌍 5 Sprachen (Deutsch, Englisch, Spanisch, Französisch, Italienisch)
- 🌓 Dark/Light Mode
- 📱 Vollständig responsive
- 💾 Fortschritt wird lokal gespeichert
- 📢 Vorbereitet für Google AdSense

## 🚀 Installation

### 1. Repository klonen oder downloaden

```bash
git clone <dein-repository-url>
cd "brawlstars guess"
```

### 2. Brawler-Bilder hinzufügen

Siehe `BILDER_SETUP.md` für Details. Du benötigst:
- PNG/JPG Bilder der Brawler
- Mindestens 400x400px
- Im Ordner `images/brawlers/`

### 3. Lokal testen

Öffne einfach die `index.html` in deinem Browser oder nutze einen lokalen Server:

```bash
# Mit Python
python -m http.server 8000

# Mit Node.js (http-server)
npx http-server

# Mit PHP
php -S localhost:8000
```

## 📦 Deployment auf Cloudflare Pages

### Methode 1: GitHub Integration (empfohlen)

1. Erstelle ein GitHub Repository
2. Pushe den Code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <dein-repo-url>
   git push -u origin main
   ```
3. Gehe zu [Cloudflare Pages](https://pages.cloudflare.com/)
4. Klicke "Create a project"
5. Verbinde dein GitHub Repository
6. Build settings:
   - Build command: (leer lassen)
   - Build output directory: `/`
7. Klicke "Save and Deploy"

### Methode 2: Direct Upload

1. Gehe zu [Cloudflare Pages](https://pages.cloudflare.com/)
2. Klicke "Create a project" → "Direct Upload"
3. Zippe alle Dateien (NICHT den Ordner, sondern die Dateien darin)
4. Lade die ZIP-Datei hoch

## 🎨 Anpassungen

### Mehr Brawler hinzufügen

Bearbeite `js/brawlers.js` und füge neue Einträge hinzu:

```javascript
{
    id: 21,
    name: 'Brawler Name',
    rarity: 'Legendary',
    role: 'Fighter',
    image: 'images/brawlers/brawler-name.png',
    emoji: '🎯✨',
    description: {
        de: 'Deutsche Beschreibung',
        en: 'English description',
        // ... weitere Sprachen
    }
}
```

### Sprachen anpassen

Bearbeite `js/translations.js` um Übersetzungen zu ändern oder neue Sprachen hinzuzufügen.

### Styles ändern

Alle Styles sind in `css/style.css`. CSS-Variablen am Anfang der Datei kontrollieren Farben und Themes.

## 💰 Google AdSense Integration

Siehe `ADSENSE_ANLEITUNG.md` für eine vollständige Anleitung zur AdSense-Integration.

**Wichtig:** Füge AdSense erst hinzu, wenn:
- Die Seite live ist
- Du regelmäßigen Traffic hast
- Dein AdSense-Account genehmigt wurde

## 📁 Projektstruktur

```
brawlstars guess/
├── index.html              # Hauptseite
├── impressum.html          # Impressum
├── datenschutz.html        # Datenschutzerklärung
├── css/
│   └── style.css          # Alle Styles
├── js/
│   ├── main.js            # Haupt-Logik
│   ├── game.js            # Spiel-Logik
│   ├── brawlers.js        # Brawler-Daten
│   └── translations.js    # Übersetzungen
├── images/
│   └── brawlers/          # Brawler-Bilder hier einfügen
├── BILDER_SETUP.md        # Anleitung für Bilder
├── ADSENSE_ANLEITUNG.md   # AdSense Integration
└── README.md              # Diese Datei
```

## 🛠️ Technologien

- **HTML5**
- **CSS3** (CSS Grid, Flexbox, CSS Variables)
- **Vanilla JavaScript** (ES6+)
- **localStorage** für Datenspeicherung
- Keine externen Dependencies!

## 📱 Browser-Unterstützung

- ✅ Chrome/Edge (letzte 2 Versionen)
- ✅ Firefox (letzte 2 Versionen)
- ✅ Safari (letzte 2 Versionen)
- ✅ Mobile Browser (iOS Safari, Chrome Mobile)

## 🔒 Datenschutz

- Keine Cookies
- Keine Server-seitige Datenspeicherung
- Alle Daten bleiben im Browser (localStorage)
- DSGVO-konform

## 📝 Lizenz

Dieses Projekt ist für private und kommerzielle Nutzung frei.

**Wichtig:** Achte auf die Copyright-Rechte der Brawl Stars Bilder!
- Brawl Stars ist ein Trademark von Supercell
- Verwende nur Bilder, für die du Rechte hast

## 🤝 Contributing

Verbesserungsvorschläge sind willkommen!

## 📞 Support

Bei Fragen oder Problemen:
- Email: kpaschek@gmx.de
- Erstelle ein Issue im Repository

## ✅ To-Do vor Go-Live

- [ ] Alle Brawler-Bilder hinzufügen
- [ ] Bilder komprimieren (für schnellere Ladezeit)
- [ ] SEO: Meta-Tags überprüfen
- [ ] Open Graph Tags hinzufügen (für Social Media)
- [ ] robots.txt erstellen
- [ ] sitemap.xml erstellen
- [ ] Auf verschiedenen Geräten testen
- [ ] Performance mit Lighthouse testen
- [ ] Rechtschreibung prüfen

## 🎯 Roadmap

Mögliche zukünftige Features:
- [ ] Multiplayer-Modus
- [ ] Leaderboard
- [ ] Share-Funktion (Ergebnisse teilen)
- [ ] Mehr Spielmodi
- [ ] Sound-Effekte
- [ ] Animationen
- [ ] PWA (Progressive Web App)

---

**Viel Erfolg mit deinem Projekt! 🚀**

Made with ❤️ by FrameSphere
