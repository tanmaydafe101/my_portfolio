/**
 * ==============================================================================
 * ⚡ INTERACTIVE SYSTEM PLAYGROUND: SPECULATIVE DECODING & LLM BENCHMARK
 * ==============================================================================
 * Live simulation demonstrating how advanced ML inference works:
 * Draft model (Fast, 4-bit) proposes tokens; Target model (70B) verifies in parallel.
 * Shows real-time tokens/sec, acceptance rate, and latency savings!
 * ==============================================================================
 */

import { sound } from './sound.js';

export function initInferenceSimulator() {
  const container = document.getElementById('playground');
  if (!container) return;

  const runBtn = document.getElementById('simRunBtn');
  const resetBtn = document.getElementById('simResetBtn');
  const modeStandard = document.getElementById('simModeStandard');
  const modeSpeculative = document.getElementById('simModeSpeculative');
  const tokenStream = document.getElementById('simTokenStream');
  const speedGauge = document.getElementById('simTokensPerSec');
  const ttftGauge = document.getElementById('simTtft');
  const speedupGauge = document.getElementById('simSpeedup');
  const telemetryLog = document.getElementById('simTelemetry');

  let mode = 'speculative'; // 'standard' or 'speculative'
  let isRunning = false;

  const promptText = "Explain how transformer self-attention enables parallelized sequence processing during pre-training.";
  const tokens = [
    "Transformer", "self-attention", "computes", "query-key", "dot", "products",
    "across", "all", "tokens", "simultaneously", "via", "matrix", "multiplication,",
    "eliminating", "sequential", "recurrent", "bottlenecks", "and", "enabling",
    "massive", "GPU", "tensor", "parallelism."
  ];

  const setMode = (newMode) => {
    if (isRunning) return;
    mode = newMode;
    sound.playClick();
    modeStandard.classList.toggle('is-on', mode === 'standard');
    modeSpeculative.classList.toggle('is-on', mode === 'speculative');
    logTelemetry(`Switched inference mode to: ${mode.toUpperCase()}`);
  };

  if (modeStandard) modeStandard.addEventListener('click', () => setMode('standard'));
  if (modeSpeculative) modeSpeculative.addEventListener('click', () => setMode('speculative'));

  const logTelemetry = (text) => {
    if (!telemetryLog) return;
    const time = new Date().toLocaleTimeString();
    telemetryLog.innerHTML += `<div class="tel-entry"><span class="tel-time">[${time}]</span> ${text}</div>`;
    telemetryLog.scrollTop = telemetryLog.scrollHeight;
  };

  const runSimulation = () => {
    if (isRunning) return;
    isRunning = true;
    sound.playChime();
    runBtn.disabled = true;
    tokenStream.innerHTML = '';
    telemetryLog.innerHTML = '';

    logTelemetry(`Starting inference benchmark on prompt: "${promptText}"`);
    logTelemetry(`Target Model: Llama-3.3-70B-Instruct (FP16)`);
    if (mode === 'speculative') {
      logTelemetry(`Draft Model: Llama-3.2-1B-Instruct (AWQ 4-Bit)`);
    }

    let tokenIdx = 0;
    const startTime = performance.now();
    const tokenInterval = mode === 'speculative' ? 42 : 115;

    ttftGauge.textContent = mode === 'speculative' ? '18ms' : '64ms';

    const loop = setInterval(() => {
      if (tokenIdx < tokens.length) {
        const word = tokens[tokenIdx];
        const isDraft = mode === 'speculative' && Math.random() > 0.18;

        const tokenBadge = document.createElement('span');
        tokenBadge.className = `sim-token ${isDraft ? 'draft-accepted' : 'target-verified'}`;
        tokenBadge.textContent = word;
        tokenStream.appendChild(tokenBadge);

        sound.playHover();

        const elapsed = (performance.now() - startTime) / 1000;
        const tps = Math.round((tokenIdx + 1) / elapsed);
        speedGauge.textContent = `${tps} t/s`;
        speedupGauge.textContent = mode === 'speculative' ? '2.8x' : '1.0x';

        tokenIdx++;
      } else {
        clearInterval(loop);
        isRunning = false;
        runBtn.disabled = false;
        sound.playChime();
        logTelemetry(`Inference completed! Generated ${tokens.length} tokens.`);
        if (mode === 'speculative') {
          logTelemetry(`Speculative Acceptance Rate: 88.4% · Latency saved: ~64%`);
        }
      }
    }, tokenInterval);
  };

  if (runBtn) runBtn.addEventListener('click', runSimulation);
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (isRunning) return;
      tokenStream.innerHTML = '<span class="muted font-mono">Click "Run Inference Benchmark" to execute...</span>';
      speedGauge.textContent = '0 t/s';
      ttftGauge.textContent = '-- ms';
      speedupGauge.textContent = '1.0x';
      telemetryLog.innerHTML = '<div class="tel-entry text-muted">Awaiting engine execution...</div>';
      sound.playClick();
    });
  }
}
