
let color = Chart.helpers.color;
let barChartData = {
  labels: [],
  datasets: [{
    label: 'Number of Individuals',
    backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
    borderColor: window.chartColors.red,
    borderWidth: 1,
    data: []
  }]
};

const NUMBER_OF_TRADERS = 1000;
let traders = []
for (let i = 0; i < NUMBER_OF_TRADERS; i++) {
  traders[i] = 1;
}

barChartData.labels = [0, 1];
barChartData.datasets[0].data = [0, NUMBER_OF_TRADERS];

window.onload = function() {
  let ctx = document.getElementById('canvas').getContext('2d');
  window.myBar = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Wealth Distribution'
        }
      }
    }
  });
};

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length
    , temporaryValue
    , randomIndex
  ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function trade() {
  let tradingPartners = [];

  for (let i = 0; i < traders.length; i++) {
    tradingPartners.push(i);
  }

  shuffle(tradingPartners);

  for (let i = 0; i < traders.length; i++) {
    if (i < traders.length - 1 ? Math.random() <= 0.5 : Math.random() <= 0.51) {
      // trader[i] wins, take $1 from tradingPartner[trader[i]] and give it to trader[i]
      if (traders[tradingPartners[i]] >= 1) {
        traders[tradingPartners[i]]--;
        traders[i]++;
      }
    } else {
      // trader[tradingPartner[i]] wins, take $1 from trader[i] and give it to trader[tradingPartner[i]]
      if (traders[i] >= 1) {
        traders[i]--;
        traders[tradingPartners[i]]++;
      }
    }
  }

  let length = traders.length;
  for (let i = 0, j = 0; i < length; i++) {
    if (traders[j] === 0) {
      traders.splice(j, 1);
    } else {
      j++;
    }
  }

}

function redistribute() {
  console.log(traders.length);
  let max = Math.max(...traders);

  barChartData.datasets[0].data = []
  barChartData.labels = []
  for (let i = 0; i < max + 1; i++) {
    barChartData.labels.push(i);
    barChartData.datasets[0].data.push(0);
  }

  for (let i = 0; i < traders.length; i++) {
    if (traders[i] !== 0)
      barChartData.datasets[0].data[traders[i]]++;
  }
}

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

function stopButton() {
  window.document.getElementById('stopButton').disabled = true;
  window.document.getElementById('startButton').disabled = false;

  clearInterval(window.interval);
  window.myBar.update();
}
