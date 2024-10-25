// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const avgCpcInput = document.getElementById('avg-cpc');
    const conversionRateInput = document.getElementById('conversion-rate');
    const requiredClicksDisplay = document.getElementById('required-clicks');
    const requiredBudgetDisplay = document.getElementById('required-budget');

    function calculateMetrics() {
        const avgCpc = parseFloat(avgCpcInput.value);
        const conversionRate = parseFloat(conversionRateInput.value) / 100;

        if (avgCpc && conversionRate) {
            // Calculate required clicks for 50 conversions
            const requiredClicks = Math.ceil(50 / conversionRate);
            
            // Calculate required budget
            const requiredBudget = requiredClicks * avgCpc;

            // Update displays
            requiredClicksDisplay.textContent = requiredClicks.toLocaleString();
            requiredBudgetDisplay.textContent = `${requiredBudget.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
        } else {
            requiredClicksDisplay.textContent = '-';
            requiredBudgetDisplay.textContent = '-';
        }
    }

    // Add input event listeners
    [avgCpcInput, conversionRateInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.value < 0) input.value = 0;
            calculateMetrics();
        });
    });

    // Initialize tooltips
    let currentTooltip = null;
    
    document.querySelectorAll('.info-icon').forEach(icon => {
        icon.addEventListener('mouseover', (e) => {
            if (currentTooltip) {
                currentTooltip.remove();
            }
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('title');
            
            // Position tooltip near the icon
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = `${rect.left}px`;
            tooltip.style.top = `${rect.bottom + 5}px`;
            
            document.body.appendChild(tooltip);
            currentTooltip = tooltip;
        });

        icon.addEventListener('mouseout', () => {
            if (currentTooltip) {
                currentTooltip.remove();
                currentTooltip = null;
            }
        });
    });
});
