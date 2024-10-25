// script.js
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const monthlyBudgetInput = document.getElementById('monthly-budget');
    const avgCpcInput = document.getElementById('avg-cpc');
    const conversionRateInput = document.getElementById('conversion-rate');
    
    const monthlyClicksDisplay = document.getElementById('monthly-clicks');
    const monthlyConversionsDisplay = document.getElementById('monthly-conversions');
    const budgetStatusDisplay = document.getElementById('budget-status');

    calculateBtn.addEventListener('click', calculateMetrics);

    function calculateMetrics() {
        // Get input values
        const monthlyBudget = parseFloat(monthlyBudgetInput.value);
        const avgCpc = parseFloat(avgCpcInput.value);
        const conversionRate = parseFloat(conversionRateInput.value) / 100;

        // Validate inputs
        if (!monthlyBudget || !avgCpc || !conversionRate) {
            alert('Please fill in all fields with valid numbers');
            return;
        }

        // Calculate metrics
        const monthlyClicks = Math.floor(monthlyBudget / avgCpc);
        const monthlyConversions = Math.floor(monthlyClicks * conversionRate);

        // Update displays
        monthlyClicksDisplay.textContent = monthlyClicks.toLocaleString();
        monthlyConversionsDisplay.textContent = monthlyConversions.toLocaleString();

        // Update budget status
        if (monthlyConversions >= 50) {
            budgetStatusDisplay.textContent = '✅ Budget meets 50 conversion goal';
            budgetStatusDisplay.style.color = '#34a853';
        } else {
            const requiredBudget = Math.ceil((50 / conversionRate) * avgCpc);
            budgetStatusDisplay.textContent = `❌ Need ${requiredBudget.toLocaleString()} for 50 conversions`;
            budgetStatusDisplay.style.color = '#ea4335';
        }
    }

    // Add input validation
    const inputs = [monthlyBudgetInput, avgCpcInput, conversionRateInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value < 0) input.value = 0;
        });
    });
});
