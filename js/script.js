// Expense Tracker
class ExpenseTracker {
    constructor() {
        this.expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        this.currentCrop = 'wheat';
        this.initialize();
    }

    initialize() {
        document.querySelector('.add-btn').addEventListener('click', () => this.addExpense());
        document.querySelector('#crop-select').addEventListener('change', (e) => {
            this.currentCrop = e.target.value;
            this.renderExpenses();
        });
        this.renderExpenses();
    }

    addExpense() {
        const item = document.getElementById('expense-item');
        const cost = document.getElementById('expense-cost');
        
        if(item.value && cost.value) {
            this.expenses.push({
                crop: this.currentCrop,
                item: item.value,
                cost: parseFloat(cost.value),
                date: new Date().toLocaleDateString()
            });
            
            localStorage.setItem('expenses', JSON.stringify(this.expenses));
            this.renderExpenses();
            item.value = '';
            cost.value = '';
        }
    }

    renderExpenses() {
        const filtered = this.expenses.filter(e => e.crop === this.currentCrop);
        const tableBody = document.querySelector('#expense-table tbody');
        const total = filtered.reduce((sum, e) => sum + e.cost, 0);
        
        tableBody.innerHTML = filtered.map(e => `
            <tr>
                <td>${e.item}</td>
                <td>₹${e.cost.toFixed(2)}</td>
                <td>${e.date}</td>
            </tr>
        `).join('');
        
        document.querySelector('.total-amount').textContent = `₹${total.toFixed(2)}`;
        document.querySelector('#selected-crop').textContent = this.currentCrop;
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.expenses-main')) {
        new ExpenseTracker();
    }
    
    // Season selection
    document.querySelectorAll('.season-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.season-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
});