window.onload = function() {
  // Get scores from local storage
  var scores = JSON.parse(localStorage.getItem('scores')) || [];

  // Sort scores in descending order by score
  scores.sort(function(a, b) {
    return b.score - a.score;
  });

  // Get scores table body element
  var scoresBody = document.getElementById('scores-body');

  // Add rows for each score
  for (var i = 0; i < scores.length; i++) {
    // Create table row element
    var row = document.createElement('tr');

    // Create table cell elements for initials and score
    var initialsCell = document.createElement('td');
    initialsCell.textContent = scores[i].initials;
    var scoreCell = document.createElement('td');
    scoreCell.textContent = scores[i].score;

    // Append cells to row and row to table body
    row.appendChild(initialsCell);
    row.appendChild(scoreCell);
    scoresBody.appendChild(row);
  }

  // Clear button click event listener
  document.getElementById('clear-button').addEventListener('click', function() {
    // Clear scores from local storage
    localStorage.removeItem('scores');

    // Clear scores table
    scoresBody.innerHTML = '';
  });
};