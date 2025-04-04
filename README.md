# platformer-metaidvania


# 🕹️ JavaScript Game Dev Learning Project

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![Canvas](https://img.shields.io/badge/HTML5-Canvas-orange.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

A collaborative educational project for learning game development fundamentals using vanilla JavaScript and Canvas API.

## Table of Contents
- [Project Goals](#-project-goals)
- [Team](#-team)
- [Game Features](#-game-features)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Development](#-development)
- [Resources](#-learning-resources)
- [License](#-license)

## 🎯 Project Goals

- Implement core game development concepts:
  - Game loop and rendering
  - Entity-component system
  - Collision detection
  - Simple physics
  - State management

- Learn team collaboration:
  - Git workflow
  - Code reviews
  - Task delegation

## 👥 Team

## 👥 Team Members

| Role                | Member       |
|---------------------|-------------|
| Player Developer   | [@tsotne](https://github.com/tsotne01) |
| Enemy System Dev   | [@nukri](https://github.com/nukri060) |


## 🎮 Game Features

### Current Implementation
- Player character with movement
- Basic enemy (Goblin) with patrol AI
- Simple collision detection
- Canvas rendering system

### Planned Features
- [ ] Jumping and gravity
- [ ] Health system
- [ ] Attack mechanics
- [ ] Multiple enemy types
- [ ] Game state management

## 🏗 Architecture
```
platformer-metaidvania/
├── index.html             # The main HTML file that loads the game
├── README.md              # Project description, setup instructions (optional but good)
│
├── assets/                # Contains all game assets
│   ├── images/            # Spritesheets, backgrounds, tilesets, UI elements
│   │   ├── player.png
│   │   ├── enemies/
│   │   │   ├── goblin.png
│   │   │   └── fly.png
│   │   ├── tileset.png
│   │   └── ...
│   └── audio/             # Sound effects and music (even if empty for now)
│       ├── jump.wav
│       └── ...
│
├── css/                   # Styling for index.html (e.g., centering canvas)
│   └── style.css
│
└── js/                    # All JavaScript code
    ├── main.js            # Main script: initializes game, game loop, ties everything together
    ├── constants.js       # Game-wide constants (gravity, player speed, etc. - optional)
    ├── input.js           # Handles keyboard/controller input
    ├── player.js          # Player character logic and class
    ├── enemies/           # Logic for different enemy types
    │   ├── goblin.js
    │   ├── fly.js
    │   ├── mushroom.js
    │   ├── slime.js
    │   └── worm.js
    ├── level.js           # Logic for loading/managing level data
    ├── renderer.js        # Handles drawing to the canvas
    ├── collision.js       # Collision detection logic
    ├── animation.js       # Handles sprite animations
    └── utils.js           # Common helper functions (math, etc.)
```

## 💻 Installation

1. Clone the repository:
```bash
git clone https://github.com/tsotne01/platformer-metaidvania.git
cd platformer-metaidvania
```

# Game Development Project

## 🚀 Getting Started

### Install dependencies (if any):
```bash
npm install
```

### Start development server:
```bash
npm run dev
```

### Open in browser:
```
http://localhost:8080
```

## 🛠 Development Workflow

### Create a new branch:
```bash
git checkout -b feature/feature-name
```

### Commit changes:
```bash
git commit -m "Add: Player jump mechanic"
```

### Push and create PR:
```bash
git push origin feature/feature-name
```

## 🎯 Coding Standards

- Use ES6+ features
- Follow JavaScript Standard Style
- Document complex functions with JSDoc
- Keep components small and focused

## 📚 Learning Resources

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Game Programming Patterns](http://gameprogrammingpatterns.com/)
- [JavaScript Game Dev Newsletter](https://gamedevelopment.substack.com/)

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
