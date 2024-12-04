// Header 로드 및 초기화
fetch('/include/header.html')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    const headerContainer = document.querySelector('.header-include');
    headerContainer.innerHTML = data;
    console.log("Header included");

    // Header 관련 초기화 함수 실행
    initMegaNavigation();
    loginModal();
    initHeaderUIAfterLogin();
    startCountdown(7);
  })
  .catch(error => console.error("Error fetching header:", error));

// Footer 로드 및 초기화
fetch('/include/footer.html')
  .then(response => response.text())
  .then(data => {
    const footerContainer = document.querySelector('.footer-include');
    footerContainer.innerHTML = data;
    console.log("Footer included");

    // Footer 관련 초기화 함수 실행
    initFooterLNB();
    initCompanyInfoToggle();
  })
  .catch(error => console.error("Error fetching footer:", error));

// 메가 네비게이션 초기화
function initMegaNavigation() {
  console.log("initMegaNavigation called");
  const triggers = document.querySelectorAll('.trigger');
  const megaNavi = document.querySelector('.mega-navi');
  const btnMegaClose = document.querySelector('.btn-mega-navi-close');

  function toggleMegaNav() {
    megaNavi.style.display = megaNavi.style.display === 'block' ? 'none' : 'block';
  }

  triggers.forEach(trigger => trigger.addEventListener('click', toggleMegaNav));
  if (btnMegaClose) {
    btnMegaClose.addEventListener('click', () => (megaNavi.style.display = 'none'));
  }
}

// 로그인 모달 초기화
function loginModal() {
  console.log("loginModal called");
  const loginOverlay = document.querySelector('.member-login-overlay');
  const loginButtons = document.querySelectorAll('.btn-login');
  const modalClose = document.querySelector('.btn-modal-close');

  if (!loginOverlay || loginButtons.length === 0 || !modalClose) {
    console.error("Login modal elements not found");
    return;
  }

  const toggleModal = (isOpen) => {
    loginOverlay.style.display = isOpen ? 'block' : 'none';
    document.body.classList.toggle('active', isOpen);
  };

  loginButtons.forEach(btn => btn.addEventListener('click', () => toggleModal(true)));
  modalClose.addEventListener('click', () => toggleModal(false));
}

// 로그인 후 헤더 UI 변경
function initHeaderUIAfterLogin() {
  console.log("initHeaderUIAfterLogin called");
  const loginButton = document.querySelector('.btn-member-primary');
  if (!loginButton) {
    console.error("Login button not found");
    return;
  }

  loginButton.addEventListener('click', () => {
    const loginOverlay = document.querySelector('.member-login-overlay');
    const userAlarm = document.querySelector('.user-alarm');
    const loginRegisterButtons = document.querySelector('.login-register-buttons');

    if (loginOverlay) loginOverlay.style.display = "none";
    if (userAlarm) userAlarm.style.display = "block";
    if (loginRegisterButtons) loginRegisterButtons.style.display = "none";

    console.log("Header UI updated after login");
  });
}

// 푸터 LNB 슬라이드 토글
function initFooterLNB() {
  console.log("initFooterLNB called");
  const linkTitles = document.querySelectorAll('.link-item-title');
  if (linkTitles.length === 0) {
    console.error("Footer LNB titles not found");
    return;
  }

  linkTitles.forEach(title => {
    title.addEventListener('click', function () {
      const nextElement = this.nextElementSibling;
      if (nextElement) {
        nextElement.style.display = nextElement.style.display === 'block' ? 'none' : 'block';
      }
      this.classList.toggle('active');
    });
  });
}

// 회사 정보 표시/숨기기
function initCompanyInfoToggle() {
  console.log("initCompanyInfoToggle called");
  const companyInfoTrigger = document.querySelector('.company-info-trigger');
  const address = document.querySelector('address');
  if (!companyInfoTrigger || !address) {
    console.error("Company info toggle elements not found");
    return;
  }

  companyInfoTrigger.addEventListener('click', function () {
    address.style.display = address.style.display === "none" || !address.style.display ? "block" : "none";
  });
}

// 7시간 카운트다운 시작 함수
function startCountdown(hours) {
  console.log(`Countdown started for ${hours} hours`);
  const endTime = new Date().getTime() + hours * 3600 * 1000;

  function updateDisplay() {
    const now = new Date().getTime();
    const remainingTime = Math.max(0, endTime - now);

    if (remainingTime <= 0) {
      clearInterval(interval);
      return;
    }

    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60).toString().padStart(2, "0");
    const seconds = Math.floor((remainingTime / 1000) % 60).toString().padStart(2, "0");

    document.getElementById("hour1").textContent = hours[0];
    document.getElementById("hour2").textContent = hours[1];
    document.getElementById("minute1").textContent = minutes[0];
    document.getElementById("minute2").textContent = minutes[1];
    document.getElementById("second1").textContent = seconds[0];
    document.getElementById("second2").textContent = seconds[1];
  }

  const interval = setInterval(updateDisplay, 1000);
  updateDisplay();
}

// DOMContentLoaded에서 초기화
document.addEventListener('DOMContentLoaded', function () {
  console.log("Initializing all features...");

  initAccordion();
  initCartFeatures();
});


document.addEventListener('DOMContentLoaded', function () {
  console.log("Initializing all features...");
  
  // 다른 초기화 함수들
  initAccordion();
  initCartFeatures();
  initFooterLNB();
  initCompanyInfoToggle();
  initMegaNavigation();
  initPasswordToggle();
  loginModal();
  initHeaderUIAfterLogin();
  initMegaNaviItems();

  // 타이머 초기화는 가장 마지막에 실행
  startCountdown(7);
});

console.log(document.querySelectorAll('.trigger')); // NodeList가 비어 있으면 문제
console.log(document.querySelector('.mega-navi')); // null이면 문제
console.log(document.querySelectorAll('section')); // NodeList가 비어 있으면 문제
console.log(document.querySelector('.btn-mega-navi-close')); // null이면 문제