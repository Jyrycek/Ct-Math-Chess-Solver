# ChatTriggers Modules

This is a **module for the ChatTriggers mod** for Minecraft.

It automatically detects and solves **QUICK MATHS** and **QUICK CHESS** events in Minecraft chat.

---

## Features

### Quick Maths Solver
- Detects chat messages like:  
  `"QUICK MATHS! Solve: 7 x (4 + 3)"`
- Instantly sends the result back to the chat.

### Chess Puzzle Solver
- Detects chat-based chess puzzles.
- Uses a Node.js backend (with [chess.js](https://github.com/jhlywa/chess.js)) to find **checkmate-in-1** solutions.
- Sends the correct move in chat automatically.

---

## Installation

### 1. Requirements

- Minecraft with the [ChatTriggers](https://chattriggers.com/) mod installed
- [Node.js](https://nodejs.org/) installed on your system (for the chess solver)

### 2. Steps

1. Place this module in your ChatTriggers modules folder:
```bash
%APPDATA%.minecraft\config\ChatTriggers\modules\
```

2. Open a terminal and install the Node.js dependency:

**Windows:**
```bash
cd %APPDATA%\.minecraft\config\ChatTriggers\modules\tools\chess-solver
npm install
```

3. Launch Minecraft or run /ct reload.

## Troubleshooting
Make sure you have Node.js installed and available in your system's PATH.
