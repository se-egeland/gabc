// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const avgCpcInput = document.getElementById('avg-cpc');
    const conversionRateInput = document.getElementById('conversion-rate');
    const requiredClicksDisplay = document.getElementById('required-clicks');
    const requiredBudgetDisplay = document.getElementById('required-budget');
    const targetConversions = 50; // Fixed target

    function formatCurrency(number) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }

    function calculateMetrics() {
        // Get input values
        const avgCpc = parseFloat(avgCpcInput.value) || 0;
        const conversionRate = parseFloat(conversionRateInput.value) || 0;

        if (avgCpc > 0 && conversionRate > 0) {
            // Calculate required clicks for 50 conversions
            // Formula: Required Clicks = Target Conversions / (Conversion Rate / 100)
            const requiredClicks = Math.ceil(targetConversions / (conversionRate / 100));
            
            // Calculate required budget
            // Formula: Required Budget = Required Clicks * Average CPC
            const requiredBudget = requiredClicks * avgCpc;

            // Update displays
            requiredClicksDisplay.textContent = requiredClicks.toLocaleString();
            requiredBudgetDisplay.textContent = formatCurrency(requiredBudget);
        } else {
            requiredClicksDisplay.textContent = '-';
            requiredBudgetDisplay.textContent = '-';
        }
    }

    // Add input event listeners with validation
    [avgCpcInput, conversionRateInput].forEach(input => {
        input.addEventListener('input', (e) => {
            // Remove any non-numeric characters except decimal point
            let value = e.target.value.replace(/[^\d.]/g, '');
            
            // Ensure only one decimal point
            const decimalPoints = value.match(/\./g);
            if (decimalPoints && decimalPoints.length > 1) {
                value = value.replace(/\.(?=.*\.)/g, '');
            }

            // Update input value
            e.target.value = value;

            // For conversion rate, ensure it's not above 100
            if (input === conversionRateInput && parseFloat(value) > 100) {
                e.target.value = '100';
            }

            calculateMetrics();
        });
    });

    // Initialize tooltips
    let currentTooltip = null;
    
    document.querySelectorAll('.info-icon').forEach(icon => {
        icon.addEventListener('mouseenter', (e) => {
            if (currentTooltip) {
                currentTooltip.remove();
            }
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('title');
            
            // Position tooltip near the icon
            const rect = e.target.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.left = `${rect.left}px`;
            tooltip.style.top = `${rect.bottom + 5}px`;
            
            document.body.appendChild(tooltip);
            currentTooltip = tooltip;
        });

        icon.addEventListener('mouseleave', () => {
            if (currentTooltip) {
                currentTooltip.remove();
                currentTooltip = null;
            }
        });
    });

    // Initial calculation
    calculateMetrics();
});
