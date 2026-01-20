const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert("Please enter a task");

  const li = document.createElement("li");
  li.className = "task-item";
  li.innerHTML = `
    <div class="task-left">
      <input type="checkbox" class="taskCheckbox" />
      <span>${text}</span>
    </div>
    <div class="actions">
      <button class="edit">✏️</button>
      <button class="delete">🗑️</button>
    </div>
  `;

  const checkbox = li.querySelector(".taskCheckbox");
  const span = li.querySelector("span");

  // --- checkbox handling ---
  checkbox.addEventListener("change", () => {
    span.classList.toggle("completed", checkbox.checked);
    updateProgress();
  });

  // --- delete button ---
  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
    updateProgress();
  });

  // --- edit button ---
  li.querySelector(".edit").addEventListener("click", () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null) span.textContent = newText.trim();
  });

  taskList.appendChild(li);
  taskInput.value = "";

  updateProgress();
}

// --- progress updater ---
function updateProgress() {
  const boxes = document.querySelectorAll(".taskCheckbox");
  const total = boxes.length;
  const checked = [...boxes].filter(b => b.checked).length;

  console.log(`${checked}/${total}`);

  if (total && checked === total) {
    launchConfetti();
  }
}

// --- confetti celebration ---
function launchConfetti() {
  const duration = 3 * 1000; // 3 seconds
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
  }, 250);
}
