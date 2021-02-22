function startButton() {
  window.document.getElementById('startButton').disabled = true
  window.document.getElementById('pauseButton').disabled = false;

  window.interval = setInterval(function() {
    trade();
    if (redistribute()) {
      clearInterval(window.interval);
    }
    window.myBar.update();
  }, 300);
}
