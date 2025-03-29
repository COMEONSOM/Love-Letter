document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const container = document.querySelector('.container');
    const buttonsContainer = document.querySelector('.buttons');
    const messageBox = document.getElementById('messageBox');
    const nextSection = document.getElementById('nextSection');
    const loveSound = document.getElementById('loveSound');
    const heartBg = document.querySelector('.heart-bg');
  
    // Array of messages for "No" interactions
    const messages = [
      "Don't you love me? 😢",
      "Are you sure? 🥺",
      "Think again! 🤨",
      "Please don't break my heart 💔",
      "You're making me sad 😭",
      "You have no other option! ❤️",
      "Last chance! 💕",
      "You HAVE to say yes! 😘"
    ];
    let clickCount = 0;
  
    // **Heart Rain Animation**
    function createHeart() {
      const heart = document.createElement('div');
      heart.classList.add('heart-rain');
      heart.innerHTML = '❤️';
      heart.style.left = `${Math.random() * 100}%`; // Random position within heart-bg
      heart.style.animationDuration = `${2 + Math.random() * 3}s`; // 2-5s fall speed
  
      // Remove heart after animation ends (fall or boom)
      heart.addEventListener('animationend', () => {
        heart.remove();
      });
  
      // Boom effect on hover
      heart.addEventListener('mouseover', () => {
        heart.style.animation = 'heartBoom 0.5s ease-out forwards';
        setTimeout(() => heart.remove(), 500); // Remove after boom
      });
  
      heartBg.appendChild(heart);
    }
  
    // Generate hearts every 300ms for more visibility
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
  
    // **Event Listeners**
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', moveButton);
  
    yesBtn.addEventListener('click', () => {
      container.style.opacity = '0';
      setTimeout(() => {
        container.style.display = 'none';
        nextSection.style.display = 'grid';
        nextSection.style.opacity = '1';
        loveSound.play().catch(err => console.error('Error playing sound:', err));
      }, 500);
    });
  
    // Initial setup
    positionButtons();
    window.addEventListener('resize', positionButtons);
  });