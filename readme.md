# EUCLID-X: Algorithmic Rhythm Generator

EUCLID-X is a generative sequencer built with **JavaScript** that utilizes the Euclidean Algorithm to distribute musical events as evenly as possible over a set period of time. It demonstrates how simple mathematical constraints can generate complex, syncopated, and "musical" rhythms found in Techno, Afro-Cuban, and Jazz music.

## 🛠 Algorithmic Logic

- **Bjorklund’s Algorithm:** Implements the recursive logic used to calculate the Greatest Common Divisor (GCD). In a musical context, it solves the problem: _"How do I fit $k$ beats into $n$ steps as evenly as possible?"_
- **Circular Data Structures:** Rhythms are treated as cyclical arrays. Visualized as a circle (clock-face), where the sequence wraps around seamlessly.
- **Bitwise/Array Manipulation:** The core engine recursively folds binary arrays (1s and 0s) to determine the optimal spacing between active steps.

## 🚀 Key Features

- **Real-Time Generative parameters:**
  - **Steps ($n$):** The length of the loop (e.g., 16 steps).
  - **Pulses ($k$):** The number of active hits.
  - **Rotation:** Offsetting the start point to create syncopated variations.
- **Polyrhythmic Capabilities:** Run multiple Euclidean sequencers of different lengths (e.g., 4 against 5) to create evolving "Phase Music."
- **Visual Sequencer Interface:** A dynamic SVG/Canvas-based radial visualization that lights up active nodes in real-time.

## 🧠 Concepts Explored

- Generative Music & Algorithmic Composition
- Greatest Common Divisor (GCD) Logic
- Array Recursion & Sorting
- Scheduler & Lookahead Timing (Web Audio API)

![preview img](/TRI-COMP-Multi-Band-Mastering.png)
