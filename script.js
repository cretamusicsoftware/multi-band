let audioCtx, source;
const bands = {
  low: { filter: null, comp: null, gain: null },
  mid: { filter: null, comp: null, gain: null },
  high: { filter: null, comp: null, gain: null },
};

async function initMasteringChain(file) {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = await audioCtx.decodeAudioData(arrayBuffer);

  source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  // 1. Create the Crossover Split
  // Low Band: Lowpass at 200Hz
  bands.low.filter = audioCtx.createBiquadFilter();
  bands.low.filter.type = "lowpass";
  bands.low.filter.frequency.value = 200;

  // High Band: Highpass at 2500Hz
  bands.high.filter = audioCtx.createBiquadFilter();
  bands.high.filter.type = "highpass";
  bands.high.filter.frequency.value = 2500;

  // Mid Band: We need a Bandpass, but to be cleaner, we can chain filters
  // Or subtract low/high from original. Here we use a Bandpass for simplicity.
  bands.mid.filter = audioCtx.createBiquadFilter();
  bands.mid.filter.type = "bandpass";
  bands.mid.filter.frequency.value = 1000;
  bands.mid.filter.Q.value = 0.5; // Wide Q to cover the middle

  // 2. Create Compressors for each band
  ["low", "mid", "high"].forEach((band) => {
    const comp = audioCtx.createDynamicsCompressor();
    comp.threshold.value = -24;
    comp.ratio.value = 4;
    bands[band].comp = comp;

    // Routing: Source -> Filter -> Compressor -> Destination
    source.connect(bands[band].filter);
    bands[band].filter.connect(comp);
    comp.connect(audioCtx.destination);
  });

  source.start();
  animateMeters();
}

// 3. UI Handlers (Repeat for each band)
// LOW
document.getElementById("low-thresh").oninput = (e) =>
  (bands.low.comp.threshold.value = e.target.value);
document.getElementById("low-ratio").oninput = (e) =>
  (bands.low.comp.ratio.value = e.target.value);

// MID
document.getElementById("mid-thresh").oninput = (e) =>
  (bands.mid.comp.threshold.value = e.target.value);
document.getElementById("mid-ratio").oninput = (e) =>
  (bands.mid.comp.ratio.value = e.target.value);

// HIGH
document.getElementById("high-thresh").oninput = (e) =>
  (bands.high.comp.threshold.value = e.target.value);
document.getElementById("high-ratio").oninput = (e) =>
  (bands.high.comp.ratio.value = e.target.value);

// 4. Gain Reduction Metering
// The Web Audio API compressor has a .reduction property (float)
function animateMeters() {
  requestAnimationFrame(animateMeters);
  if (!bands.low.comp) return;

  // .reduction returns negative dB (e.g., -5.0). We map it to height.
  const mapGR = (val) => Math.min(Math.abs(val) * 4, 100);

  document.getElementById("gr-low").style.height = `${mapGR(
    bands.low.comp.reduction
  )}%`;
  document.getElementById("gr-mid").style.height = `${mapGR(
    bands.mid.comp.reduction
  )}%`;
  document.getElementById("gr-high").style.height = `${mapGR(
    bands.high.comp.reduction
  )}%`;
}

document.getElementById("audio-input").onchange = (e) => {
  if (e.target.files[0]) initMasteringChain(e.target.files[0]);
};
