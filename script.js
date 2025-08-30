document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const printTimeInput = document.getElementById('printTime');
    const filamentWeightInput = document.getElementById('filamentWeight');
    const printPlatesInput = document.getElementById('printPlates');
    const complexitySelect = document.getElementById('complexity');

    // Result elements
    const laborCostPerPlate = document.getElementById('laborCostPerPlate');
    const totalLaborCost = document.getElementById('totalLaborCost');
    const machineCost = document.getElementById('machineCost');
    const filamentCost = document.getElementById('filamentCost');
    const baseCost = document.getElementById('baseCost');
    const finalPrice = document.getElementById('finalPrice');

    // Pricing constants
    const MACHINE_COST_PER_HOUR = 2;
    const FILAMENT_COST_PER_GRAM = 0.02;

    function calculatePrice() {
        // Get input values
        const printTime = parseFloat(printTimeInput.value) || 0;
        const filamentWeight = parseFloat(filamentWeightInput.value) || 0;
        const printPlates = parseInt(printPlatesInput.value) || 1;
        const selectedLaborCostPerPlate = parseFloat(complexitySelect.value) || 5;

        // Calculate costs
        const laborCostValue = printPlates * selectedLaborCostPerPlate;
        const machineCostValue = printTime * MACHINE_COST_PER_HOUR;
        const filamentCostValue = filamentWeight * FILAMENT_COST_PER_GRAM;

        // Calculate base cost
        const baseCostValue = laborCostValue + machineCostValue + filamentCostValue;

        // Final price is the same as base cost
        const finalPriceValue = baseCostValue;

        // Update display
        laborCostPerPlate.textContent = `$${selectedLaborCostPerPlate.toFixed(2)}`;
        totalLaborCost.textContent = `$${laborCostValue.toFixed(2)}`;
        machineCost.textContent = `$${machineCostValue.toFixed(2)}`;
        filamentCost.textContent = `$${filamentCostValue.toFixed(2)}`;
        baseCost.textContent = `$${baseCostValue.toFixed(2)}`;
        finalPrice.textContent = `$${finalPriceValue.toFixed(2)}`;

        // Add visual feedback
        finalPrice.style.color = '#667eea';
        finalPrice.style.fontWeight = 'bold';
    }

    // Calculate button click event
    calculateBtn.addEventListener('click', calculatePrice);

    // Real-time calculation on input change
    printTimeInput.addEventListener('input', calculatePrice);
    filamentWeightInput.addEventListener('input', calculatePrice);
    printPlatesInput.addEventListener('input', calculatePrice);
    complexitySelect.addEventListener('change', calculatePrice);

    // Add some helpful input validation and formatting
    printTimeInput.addEventListener('blur', function() {
        if (this.value && parseFloat(this.value) < 0) {
            this.value = 0;
            calculatePrice();
        }
    });

    filamentWeightInput.addEventListener('blur', function() {
        if (this.value && parseFloat(this.value) < 0) {
            this.value = 0;
            calculatePrice();
        }
    });

    printPlatesInput.addEventListener('blur', function() {
        if (this.value && parseInt(this.value) < 1) {
            this.value = 1;
            calculatePrice();
        }
    });

    // Initialize with default values
    calculatePrice();

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) {
            calculatePrice();
        }
    });

    // Add some helpful tooltips or info
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = '#e1e8ed';
            }
        });
    });
});
