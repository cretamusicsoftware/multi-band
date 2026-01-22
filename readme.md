# TRI-COMP: Multi-Band Mastering Compressor

TRI-COMP is a professional-grade dynamics processor built with the **Web Audio API**. It splits the audio signal into three discrete frequency bands (Low, Mid, High) and applies independent compression to each. This topology allows for transparent mastering and precise control over the tonal balance of a mix.

## 🛠 DSP Architecture
- **3-Way Crossover Network:** Utilizes parallel `BiquadFilterNode` instances to isolate frequency ranges:
    - **Low:** < 200Hz (Lowpass)
    - **Mid:** 200Hz - 2.5kHz (Bandpass/Wide Q)
    - **High:** > 2.5kHz (Highpass)
- **Discrete Compression Engines:** Each frequency band is routed to a dedicated `DynamicsCompressorNode` with independent Threshold and Ratio controls.
- **Gain Reduction Metering:** Real-time visualization of compression intensity using the `compressor.reduction` float property, animated via `requestAnimationFrame`.

## 🚀 Key Features
- **Targeted Dynamics Control:** "Squash" the kick drum without affecting the vocals, or tame harsh cymbals without losing bass energy.
- **Visual Feedback:** Individual gain reduction meters for each band provide immediate visual confirmation of signal processing.
- **Latency-Free Operation:** Zero-latency parallel routing suitable for real-time mastering applications.

## 🧠 Concepts Explored
- Parallel Signal Processing
- Crossover Filtering
- Dynamic Range Compression
- Audio Metering Logic

![preview img](/TRI-COMP-Multi-Band-Mastering.png)
