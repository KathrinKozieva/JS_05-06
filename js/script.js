function Stopwatch(elem) {
	var time = 0;
	var interval;
	var offset;

	function update() {
		if (this.isOn) {
			time += delta();
		}
		var formattedTime = timeFormatter(time);
		elem.textContent = formattedTime;
	};

	function delta() {
		var now = Date.now();
		var timePassed = now - offset;
		offset = now;
		return timePassed;
	};

	function timeFormatter(timeInMillisecinds) {
		var time = new Date(timeInMillisecinds);
		var hours = time.getUTCHours().toString();
		var minutes = time.getUTCMinutes().toString();
		var seconds = time.getUTCSeconds().toString();
		var milliseconds = time.getUTCMilliseconds().toString();

		if (hours < 2) {
			hours = "0" + hours;
		}

		if (minutes.length < 2) {
			minutes = "0" + minutes;
		}

		if (seconds.length < 2) {
			seconds = "0" + seconds;
		}

		while (milliseconds.length < 3) {
			milliseconds = "0" + milliseconds;
		}

		return hours + " : " + minutes + " : " + seconds + " . " + milliseconds;
	};

	this.isOn = false;

	this.start = function() {
		if (!this.isOn) {
			interval = setInterval(update.bind(this), 10);
			offset = Date.now();
			this.isOn = true;
		}
	};

	this.stop = function() {
		if (this.isOn) {
			clearInterval(interval);
			interval = null;
			this.isOn = false;
		}
	};

	this.reset = function() {
		time = 0;
		update();
	};

}

var timer = document.getElementById("timer");
var startBtn = document.getElementById("start");
var resetBtn = document.getElementById("reset");

var watch = new Stopwatch(timer);

startBtn.addEventListener('click', function() {
	if (watch.isOn) {
		watch.stop();
		startBtn.innerHTML = "Continue";
		startBtn.classList = "btn btn-success btn-lg";

	} else {
		watch.start();
		startBtn.innerHTML = "Pause";
		startBtn.classList.add('btn-info');
	}
});

resetBtn.addEventListener('click', function() {
	watch.reset();
})