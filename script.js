const calcBtn = document.getElementById("calc-btn");
const resultCard = document.getElementById("result-card");
const statusBadge = document.getElementById("status-badge");
const resultText = document.getElementById("result");

calcBtn.addEventListener("click", function () {
  const target = Number(document.getElementById("target").value);
  const present = Number(document.getElementById("present").value);
  const absent = Number(document.getElementById("absent").value);

  // Validation
  if (isNaN(target) || target <= 0 || target > 100) {
    showError("⚠️ Please enter a valid target percentage between 1 and 100.");
    return;
  }
  if (isNaN(present) || isNaN(absent) || present < 0 || absent < 0) {
    showError("⚠️ Please enter valid positive numbers for Present and Absent.");
    return;
  }

  const total = present + absent;
  if (total === 0) {
    showError("⚠️ Total classes conducted cannot be zero.");
    return;
  }

  const currentPercentage = (present / total) * 100;
  resultCard.classList.remove("hidden");

  // Above or equal to target
  if (currentPercentage >= target) {
    let safeBunks = 0;
    let tempTotal = total;

    while ((present / (tempTotal + 1)) * 100 >= target) {
      safeBunks++;
      tempTotal++;
    }

    statusBadge.className = "status-badge safe";
    statusBadge.innerText = `Attendance Status: ${currentPercentage.toFixed(1)}%`;

    if (safeBunks === 0) {
      resultText.innerText = `Target criteria: ${target}%\n\nYou are right on the border! You can't afford to miss any upcoming classes.`;
    } else {
      resultText.innerText = `🎉 Safe Escapacity: You can safely miss ${safeBunks} more ${safeBunks === 1 ? 'class' : 'classes'} and remain above your ${target}% requirement!`;
    }
  } 
  // Below target
  else {
    let needed = 0;
    let tempPresent = present;
    let tempTotal = total;

    while ((tempPresent / tempTotal) * 100 < target) {
      needed++;
      tempPresent++;
      tempTotal++;
    }

    statusBadge.className = "status-badge danger";
    statusBadge.innerText = `Attendance Status: ${currentPercentage.toFixed(1)}%`;
    resultText.innerText = `🚨 Deficit Alert: You need to attend the next ${needed} consecutive ${needed === 1 ? 'class' : 'classes'} to restore your criteria to ${target}%!`;
  }
});

function showError(message) {
  resultCard.classList.remove("hidden");
  statusBadge.className = "status-badge danger";
  statusBadge.innerText = "Validation Error";
  resultText.innerText = message;
}
