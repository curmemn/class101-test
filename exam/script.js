function startCountdown(hours) {
  const endTime = new Date().getTime() + hours * 3600 * 1000; // 현재 시간에서 7시간 후 시간 계산

  function updateDisplay() {
    const now = new Date().getTime();
    const remainingTime = Math.max(0, endTime - now); // 남은 시간 계산

    // 남은 시간을 시, 분, 초로 계산
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((remainingTime / 1000) % 60).toString().padStart(2, '0');

    // 각 자리수별로 업데이트
    document.getElementById("hour1").textContent = hours[0];
    document.getElementById("hour2").textContent = hours[1];
    document.getElementById("minute1").textContent = minutes[0];
    document.getElementById("minute2").textContent = minutes[1];
    document.getElementById("second1").textContent = seconds[0];
    document.getElementById("second2").textContent = seconds[1];

    // 타이머 종료 조건: 남은 시간이 0이면 카운트다운 중지
    if (remainingTime <= 0) {
      clearInterval(interval);
    }
  }

  // 처음 한 번 호출하여 즉시 화면에 표시
  updateDisplay();
  const interval = setInterval(updateDisplay, 1000); // 1초마다 업데이트
}

// 7시간 카운트다운 시작
startCountdown(7);
