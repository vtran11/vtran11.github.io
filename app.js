// Listen for Submit
document.getElementById('loan_form').addEventListener('submit', function (e) {

  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Show loading
  document.getElementById('before').style.display = 'none';
  document.getElementById('after').style.display = 'block';
  document.getElementById('loan_form').classList = 'ui loading form';

  setTimeout(calculateResult, 1000);
  e.preventDefault();
});

function calculateResult() {

  // UI Vars
  const amount = document.getElementById('amount'),
    interest = document.getElementById('interest'),
    years = document.getElementById('years'),
    monthly_payment = document.getElementById('monthly_payment'),
    interest_paid = document.getElementById('interest_paid'),
    total_amount = document.getElementById('total_amount_paid');

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly) && (amount.value != null || interest.value != null || years.value != null)) {
    monthly_payment.value = monthly.toFixed(2);
    interest_paid.value = (monthly * calculatedPayments - principle).toFixed(2);
    total_amount.value = (monthly * calculatedPayments).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide Loader
    document.getElementById('before').style.display = 'block';
    document.getElementById('after').style.display = 'none';
    document.getElementById('loan_form').classList = 'ui form';
  } else {
    showError();
  }
}

// Show Error
function showError(error) {
  // Show results
  document.getElementById('results').style.display = 'none';

  // Hide Loader
  document.getElementById('before').style.display = 'block';
  document.getElementById('after').style.display = 'none';
  document.getElementById('loan_form').classList = 'ui form';

  // Show Error
  document.getElementById('error').style.display = 'block';

  // Clear error after 2 sec
  setTimeout(clearError, 2000);
}

// Clear Error
function clearError() {
  document.getElementById('error').remove();
}