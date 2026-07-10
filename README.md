# 🎮 Ahorcado Latino PRO

Versión mejorada del juego del ahorcado en Español Latino, lista para publicar en GitHub Pages.

## ✅ Mejoras incluidas

- Diseño PRO adaptable a celular, tablet y computadora.
- Modo claro y modo oscuro.
- Dificultad: fácil, normal, difícil y experto.
- Categorías: finanzas, tecnología, valores, lugares/transporte, empresa/logística, comida/hogar.
- Teclado visual integrado para jugar desde celular.
- Entrada por teclado físico con tecla Enter.
- Pistas por palabra con penalización según dificultad.
- Récord de puntuación guardado en `localStorage`.
- Mejor tiempo guardado en `localStorage`.
- Ranking local de mejores partidas.
- Estadísticas: ganadas, perdidas y precisión.
- PWA instalable con `manifest.webmanifest`, `sw.js` e iconos para Android/iPhone.
- Sonidos generados con Web Audio API, sin depender de archivos externos.

## 📁 Archivos

```text
/
├── index.html
├── styles.css
├── app.js
├── manifest.webmanifest
├── sw.js
├── README.md
└── assets/
    └── icons/
        ├── icon.svg
        ├── icon-192.png
        ├── icon-512.png
        └── icon-1024.png
```

## 🚀 Publicar en GitHub Pages

1. Sube todos los archivos del ZIP a la raíz del repositorio.
2. En GitHub entra a **Settings → Pages**.
3. En **Branch** selecciona `main` y carpeta `/root`.
4. Guarda los cambios.
5. Abre la URL publicada y actualiza con Ctrl+F5 en computadora.
6. En celular, elimina accesos anteriores de la pantalla de inicio y vuelve a agregar la app.

## 🔧 Personalización rápida

- Para agregar palabras: edita `WORD_BANK` en `app.js`.
- Para cambiar colores: edita las variables `:root` en `styles.css`.
- Para cambiar nombre o iconos: edita `manifest.webmanifest` y reemplaza archivos en `assets/icons/`.
