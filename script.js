// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const monthlyBudgetInput = document.getElementById('monthly-budget');
    const avgCpcInput = document.getElementById('avg-cpc');
    const conversionRateInput = document.getElementById('conversion-rate');
    const monthlyClicksDisplay = document.getElementById('monthly-clicks');
    const estimatedConversionsDisplay = document.getElementById('estimated-conversions');
    const requiredBudgetDisplay = document.getElementById('required-budget');
    
    const TARGET_CONVERSIONS = 50;

    function formatCurrency(number) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }

    function formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }

    function calculateMetrics() {
        const monthlyBudget = parseFloat(monthlyBudgetInput.value) || 0;
        const avgCpc = parseFloat(avgCpcInput.value) || 0;
        const conversionRate = parseFloat(conversionRateInput.value) || 0;

        if (avgCpc > 0 && conversionRate > 0) {
            // Calculate metrics
            const monthlyClicks = Math.floor(monthlyBudget / avgCpc);
            const estimatedConversions = Math.floor(monthlyClicks * (conversionRate / 100));
            
            // Calculate required clicks and budget for 50 conversions
            const requiredClicks = Math.ceil(TARGET_CONVERSIONS / (conversionRate / 100));
            const requiredBudget = requiredClicks * avgCpc;

            // Update displays
            monthlyClicksDisplay.textContent = formatNumber(monthlyClicks);
            estimatedConversionsDisplay.textContent = formatNumber(estimatedConversions);
            requiredBudgetDisplay.textContent = formatCurrency(requiredBudget);

            // Add visual feedback
            if (estimatedConversions >= TARGET_CONVERSIONS) {
                estimatedConversionsDisplay.style.color = 'var(--success-color)';
            } else {
                estimatedConversionsDisplay.style.color = 'var(--error-color)';
            }
        } else {
            // Reset displays if inputs are invalid
            monthlyClicksDisplay.textContent = '-';
            estimatedConversionsDisplay.textContent = '-';
            requiredBudgetDisplay.textContent = '-';
        }
    }

    // Add input event listeners with validation
    [monthlyBudgetInput, avgCpcInput, conversionRateInput].forEach(input => {
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
