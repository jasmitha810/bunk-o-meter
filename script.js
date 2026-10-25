// 1. Find the button and result text on our HTML page
const calcBtn = document.getElementById("calc-btn");
const resultText = document.getElementById("result");

// 2. Tell the button what to do when clicked
calcBtn.addEventListener("click", function () {
  // Grab the numbers typed by the user
  let attended = Number(document.getElementById("attended").value);
  let total = Number(document.getElementById("total").value);

  // Safety check: Did they leave a box blank or enter invalid numbers?
  if (total === 0 || isNaN(attended) || isNaN(total)) {
    resultText.innerText = "Please enter valid numbers!";
    return;
  }

  // Safety check: Attended cannot be more than total
  if (attended > total) {
    resultText.innerText = "Attended classes cannot be greater than total classes!";
    return;
  }

  // Calculate current percentage
  let currentPercentage = (attended / total) * 100;

  // We set our target here!
  let target = 80;

  // SCENARIO A: Already safe (80% or higher)
  if (currentPercentage >= target) {
    let safeBunks = 0;
    let tempTotal = total;

    // Test skipping 1 class, then 2, then 3...
    while ((attended / (tempTotal + 1)) * 100 >= target) {
      safeBunks++;
      tempTotal++;
    }

    if (safeBunks === 0) {
      resultText.innerText = `Current: ${currentPercentage.toFixed(1)}%. You are right on the border! You cannot miss any classes.`;
    } else {
      resultText.innerText = `Current: ${currentPercentage.toFixed(1)}%. You can safely bunk ${safeBunks} more classes!`;
    }
  } 
  // SCENARIO B: Danger zone (below 80%)
  else {
    let classesToAttend = 0;
    let tempAttended = attended;
    let tempTotal = total;

    // Test attending consecutive classes until hitting 80%
    while ((tempAttended / tempTotal) * 100 < target) {
      classesToAttend++;
      tempAttended++;
      tempTotal++;
    }

    resultText.innerText = `Current: ${currentPercentage.toFixed(1)}%. Danger! You need to attend the next ${classesToAttend} consecutive classes to reach 80%!`;
  }
});
