function pauseButton() {
  window.document.getElementById('pauseButton').disabled = true;
  window.document.getElementById('startButton').disabled = false;

  clearInterval(window.interval);
  window.myBar.update();
}
