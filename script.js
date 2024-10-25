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
        if (isNaN(number) || number === 0) return '-';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }

    function formatNumber(number) {
        if (isNaN(number) || number === 0) return '-';
        return new Intl.NumberFormat('en-US').format(number);
    }

    function calculateMetrics() {
        // Get input values and convert to numbers
        const monthlyBudget = parseFloat(monthlyBudgetInput.value) || 0;
        const avgCpc = parseFloat(avgCpcInput.value) || 0;
        const conversionRate = parseFloat(conversionRateInput.value) || 0;

        console.log('Calculating with:', { monthlyBudget, avgCpc, conversionRate }); // Debug log

        if (avgCpc > 0 && conversionRate > 0) {
            // Calculate current metrics
            const monthlyClicks = Math.floor(monthlyBudget / avgCpc);
            const estimatedConversions = Math.floor(monthlyClicks * (conversionRate / 100));
            
            // Calculate required budget for 50 conversions
            const requiredClicks = Math.ceil(TARGET_CONVERSIONS / (conversionRate / 100));
            const requiredBudget = requiredClicks * avgCpc;

            console.log('Results:', { // Debug log
                monthlyClicks,
                estimatedConversions,
                requiredBudget
            });

            // Update displays
            monthlyClicksDisplay.textContent = formatNumber(monthlyClicks);
            estimatedConversionsDisplay.textContent = formatNumber(estimatedConversions);
            requiredBudgetDisplay.textContent = formatCurrency(requiredBudget);

            // Visual feedback for conversion goal
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
            estimatedConversionsDisplay.style.color = 'var(--text-color)';
        }
    }

    // Function to handle input changes
    function handleInput(e) {
        const input = e.target;
        let value = input.value.replace(/[^\d.]/g, '');
        
        // Ensure only one decimal point
        const decimalPoints = value.match(/\./g);
        if (decimalPoints && decimalPoints.length > 1) {
            value = value.replace(/\.(?=.*\.)/g, '');
        }

        // For conversion rate, ensure it's not above 100
        if (input === conversionRateInput && parseFloat(value) > 100) {
            value = '100';
        }

        // Update input value
        input.value = value;

        // Calculate metrics
        calculateMetrics();
    }

    // Add event listeners to inputs
    monthlyBudgetInput.addEventListener('input', handleInput);
    avgCpcInput.addEventListener('input', handleInput);
    conversionRateInput.addEventListener('input', handleInput);

    // Add blur event listeners to format numbers nicely when leaving the input
    [monthlyBudgetInput, avgCpcInput].forEach(input => {
        input.addEventListener('blur', (e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value)) {
                e.target.value = value.toFixed(2);
            }
        });
    });

    conversionRateInput.addEventListener('blur', (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            e.target.value = value.toFixed(2);
        }
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
