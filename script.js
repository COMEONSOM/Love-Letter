document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const container = document.querySelector('.container');
  const buttonsContainer = document.querySelector('.buttons');
  const messageBox = document.getElementById('messageBox');
  const nextSection = document.getElementById('nextSection');
  const loveSound = document.getElementById('loveSound');
  const muteButton = document.getElementById("muteButton");
  const heartBg = document.querySelector('.heart-bg');
  const timeline = document.querySelector('.timeline');

  // Array of messages for "No" interactions
  const messages = [
    "ফাজলামি মারছো? 🤨",
    "তুমি কি আমায় ভালোবাসো না? 🥺💔",
    "ভেবে দেখো কিন্তু! 🤔",
    "আমার কিন্তু মাথা খারাপ হয়ে যাচ্ছে এবার 😤",
    "পাগল হয়ে যাচ্ছি 😵‍💫",
    "এটাই কিন্তু শেষ সুযোগ! 🚨",
    "আবার না বললে মাথায় হাঁড়ি ভাঙবো! 🤯",
    "তোমাকে হ্যাঁ বলতেই হবে! 💞",
    "বল সালা! 😡💥"
  ];
  let clickCount = 0;

  // **Heart Rain Animation**
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-rain');
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * 100}%`;
    // Falling duration between 4 and 7 seconds
    heart.style.animationDuration = `${4 + Math.random() * 3}s`;

    // Remove heart after its animation ends
    heart.addEventListener('animationend', () => {
      heart.remove();
    });

    // Burst effect on hover/touch/click
    const triggerBurst = () => {
      heart.style.animation = 'heartBoom 0.5s ease-out forwards';
      setTimeout(() => heart.remove(), 500);
    };

    heart.addEventListener('mouseover', triggerBurst);
    heart.addEventListener('touchstart', triggerBurst);
    heart.addEventListener('click', triggerBurst);

    heartBg.appendChild(heart);
  }
  setInterval(createHeart, 300);

  // **Position Buttons Function**
  function positionButtons() {
    yesBtn.style.position = 'relative';
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    noBtn.style.zIndex = '10';
    yesBtn.classList.remove('full-width');
    buttonsContainer.classList.remove('no-btn-hidden');
    container.style.opacity = '1';
    nextSection.style.display = 'none';
    nextSection.style.opacity = '0';
  }
  function animateFootprintPath() {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    if (timelinePoints.length < 2) return;
  
    const footprintPath = document.createElement('div');
    footprintPath.classList.add('footprint-path');
    timeline.appendChild(footprintPath);
  
    let leftFoot = true;
  
    timelinePoints.forEach((point, index) => {
      if (index > 0) {
        setTimeout(() => {
          const footprint = document.createElement('div');
          footprint.classList.add('footprint');
          footprint.style.left = `${point.offsetLeft}px`;
          footprint.style.top = `${point.offsetTop}px`;
          footprint.style.transform = `rotate(${leftFoot ? -20 : 20}deg)`;
  
          leftFoot = !leftFoot;
  
          // Create Heel
          const heel = document.createElement('div');
          heel.classList.add('heel');
  
          // Create Toes
          for (let i = 0; i < 5; i++) {
            const toe = document.createElement('div');
            toe.classList.add('toe');
            toe.style.left = `${i * 5}px`; // Spread toes naturally
            toe.style.top = `${-10 - i * 3}px`; // Adjust height
            footprint.appendChild(toe);
          }
  
          footprint.appendChild(heel);
          footprintPath.appendChild(footprint);
        }, index * 500); // Delay for walking effect
      }
    });
  }
  
  // **Move "No" Button Function**
  function moveButton() {
    const maxX = container.clientWidth - noBtn.offsetWidth;
    const maxY = container.clientHeight - noBtn.offsetHeight;
    if (maxX <= 0 || maxY <= 0) return;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    messageBox.innerText = messages[Math.min(clickCount, messages.length - 1)];
    messageBox.style.opacity = '1';
    clickCount++;
    if (clickCount >= messages.length) {
      noBtn.style.display = 'none';
      buttonsContainer.classList.add('no-btn-hidden');
      yesBtn.classList.add('full-width');
    }
  }

  // **Event Listeners for Desktop**
  noBtn.addEventListener('mouseover', moveButton);
  noBtn.addEventListener('click', moveButton);

  // **Event Listener for Mobile "Hover" Simulation**
  let canMove = true;
  document.addEventListener('touchmove', (e) => {
    if (!canMove) return;
    const touch = e.touches[0];
    const rect = noBtn.getBoundingClientRect();
    const proximityThreshold = 50;
    if (
      touch.clientX > rect.left - proximityThreshold &&
      touch.clientX < rect.right + proximityThreshold &&
      touch.clientY > rect.top - proximityThreshold &&
      touch.clientY < rect.bottom + proximityThreshold
    ) {
      canMove = false;
      moveButton();
      setTimeout(() => (canMove = true), 500);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const container = document.querySelector('.container');
    const buttonsContainer = document.querySelector('.buttons');
    const messageBox = document.getElementById('messageBox');
    const nextSection = document.getElementById('nextSection');
    const loveSound = document.getElementById('loveSound');
    const muteButton = document.getElementById("muteButton");
    const heartBg = document.querySelector('.heart-bg');
    const timeline = document.querySelector('.timeline');
  
    // **Footprint Animation on Timeline**
    function animateFootprintPath() {
      const timelinePoints = document.querySelectorAll('.timeline-point');
      if (timelinePoints.length < 2) return;
  
      const footprintPath = document.createElement('div');
      footprintPath.classList.add('footprint-path');
      timeline.appendChild(footprintPath);
  
      let pathHTML = '';
      timelinePoints.forEach((point, index) => {
        if (index > 0) {
          pathHTML += `<div class='footprint' style='left: ${point.offsetLeft}px; top: ${point.offsetTop}px'></div>`;
        }
      });
      footprintPath.innerHTML = pathHTML;
    }
  
    // **Yes Button Listener**
    yesBtn.addEventListener('click', () => {
      container.style.opacity = '0';
      setTimeout(() => {
        container.style.display = 'none';
        nextSection.style.display = 'grid';
        nextSection.style.opacity = '1';
        loveSound.play().catch((err) => console.error('Error playing sound:', err));
        setTimeout(animateFootprintPath, 1000);
      }, 500);
    });
  
    // Mute Button Functionality
    muteButton.addEventListener("click", function () {
      loveSound.muted = !loveSound.muted;
      muteButton.textContent = loveSound.muted ? "🔇 Unmute" : "🔊 Mute";
    });
  });
  
  // **Yes Button Listener**
  yesBtn.addEventListener('click', () => {
    container.style.opacity = '0';
    setTimeout(() => {
      container.style.display = 'none';
      nextSection.style.display = 'grid';
      nextSection.style.opacity = '1';
      loveSound.play().catch((err) => console.error('Error playing sound:', err));
      // Animate timeline connectors after gallery appears
      animateTimelineConnectors();
      // Animate the journey ball along the timeline after connectors animate
      setTimeout(animateTimelineJourney, 1000);
    }, 500);
  });

  // Initial setup
  positionButtons();
  window.addEventListener('resize', positionButtons);
});
muteButton.addEventListener("click", function () {
  if (loveSound.muted) {
    loveSound.muted = false;
    muteButton.textContent = "🔊 Mute";
  } else {
    loveSound.muted = true;
    muteButton.textContent = "🔇 Unmute";
  }
});
