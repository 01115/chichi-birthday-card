// LockScreen Keypad
const CORRECT_CODE = '0804'; 
const ERROR_MSG = "oh no chichi, that's not right 😢 try again!"; 

let entered = '';

const boxes = [0, 1, 2, 3].map(i => document.getElementById('box-' + i));
const errorEl = document.getElementById('error-msg');

function updateBoxes() {
    boxes.forEach((b, i) => {
        b.textContent = entered[i] || '';
        b.classList.toggle('filled', !!entered[i]);
    });
}

function pressKey(val) {
    if (val === 'del') {
        entered = entered.slice(0, -1);
        errorEl.classList.remove('visible');
        updateBoxes();
        return;
    }
    if (val === '*' || val === '#') return;
    if (entered.length >= 4) return;

    entered += val;
    updateBoxes();

    if (entered.length === 4) {
        setTimeout(checkCode, 180);
    }
}

function checkCode() {
    if (entered === CORRECT_CODE) {
        onCorrect();
    } else {
        // Wrong — shake & show error
        boxes.forEach(b => b.classList.add('shake'));
        errorEl.textContent = ERROR_MSG;
        errorEl.classList.add('visible');
        setTimeout(() => {
            boxes.forEach(b => b.classList.remove('shake'));
            entered = '';
            updateBoxes();
        }, 600);
    }
}

function onCorrect() {
    goToStage(1);
}

// Click / tap
document.getElementById('numpad').addEventListener('click', e => {
    const key = e.target.closest('.key');
    if (!key) return;
    key.classList.add('pressed');
    setTimeout(() => key.classList.remove('pressed'), 120);
    pressKey(key.dataset.val);
});

// Physical keyboard support
document.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9') pressKey(e.key);
    else if (e.key === 'Backspace') pressKey('del');
});







// Envelope stage - letter opening logics
const envelope = document.querySelector(".envelope-wrapper");
const heart = document.querySelector(".heart");
const text = document.querySelector("#greeting-text");

heart.addEventListener("click", () => {
  envelope.classList.toggle("flap")
  text.classList.toggle("hidden")
})



function goToStage(n) {
  document.querySelectorAll('.stage').forEach(s => {
    s.classList.remove('active');
  });
  document.getElementById('lock-screen').classList.remove('active');

  const audio = document.getElementById('myAudio');
  if (audio) audio.pause();

  const targetStage = document.getElementById('stage' + n);
  if (targetStage) {
    targetStage.classList.add('active');
  }

  if (n === 7 && audio) {
    audio.currentTime = 0;
    audio.play();
    document.getElementById('vinyl-cd').style.animationPlayState = 'running';
  }

  if (n === 8) {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.6 }
    });
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.6 } 
    });

    confetti({
        particleCount: 100,
        angle: 60,
        spread: 90,
        origin: { x: 0, y: 0.6 },
        shapes: ['star', 'heart', 'square'], 
        colors: ['#ff6b6b', '#ffd6a5', '#fff', '#ffcece', '#ffc6ff']
    });
    // right side
    confetti({
        particleCount: 100,
        angle: 120,
        spread: 90,
        origin: { x: 1, y: 0.6 },
        shapes: ['star', 'heart', 'square'], 
        colors: ['#ff6b6b', '#ffd6a5', '#fff', '#ffcece', '#ffc6ff']
    });
  }
}