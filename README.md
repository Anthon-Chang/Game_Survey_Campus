# 🎮 Game Survey Campus

Aplicación móvil desarrollada en **Ionic + Angular + Firebase** para registrar encuestas de videojuegos dentro del campus universitario.

## 👥 Integrantes
- Anthon Chang

## 📱 Descripción
App que permite registrar a personas del campus y consultar su videojuego favorito, tomando evidencia fotográfica, ubicación GPS e información del juego mediante una API externa.

## ✅ Funcionalidades
- 🔐 Login y registro con Firebase Auth
- 📋 Formulario de encuesta completo
- 📍 Ubicación GPS con Capacitor Geolocation
- 📷 Cámara y galería con Capacitor Camera
- 🎮 Consulta de API de videojuegos (RAWG)
- 🗂️ Lista de encuestas con cards
- 👤 Perfil de usuario con estadísticas
- 🌐 Pantalla de bienvenida con QR de descarga

## 🛠️ Tecnologías
| Tecnología | Uso |
|-----------|-----|
| Ionic 7 + Angular 20 | Framework móvil |
| Firebase Auth | Autenticación |
| Cloud Firestore | Base de datos |
| Capacitor | Plugins nativos |
| RAWG API | Información de juegos |

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/Anthon-Chang/Game_Survey_Campus.git
cd Game_Survey_Campus

# Instalar dependencias
npm install

# Configurar Firebase en:
# src/environments/environment.ts

# Ejecutar en navegador
ionic serve

# Compilar para Android
ionic build
npx cap sync
npx cap open android
```

## 📊 Requisitos del trabajo de campo
| Requisito | Meta |
|-----------|------|
| Encuestas válidas | 50 |
| Ubicaciones distintas | 50 |
| Juegos distintos | 20 |
| Fotos subidas | 50 |
| Video en redes sociales | 1 |

## 📸 Capturas
<!-- Agrega aquí capturas de pantalla de la app -->

## 🔗 Links
- 📦 [Descargar APK](https://github.com/Anthon-Chang/Game_Survey_Campus/releases)
- 📊 [Tablero de encuestas](https://game-survey-campus.web.app)
