// Load on page start
document.addEventListener('DOMContentLoaded', () => {
    populateCategoryDropdown();
    buildTable();
});

// Data Storage Functions
function getCategories() {
    return JSON.parse(localStorage.getItem('expenseCategories') || '[]');
}

function saveCategories(categories) {
     if (confirm('Are you sure you want to Save data?')) {
    	localStorage.setItem('expenseCategories', JSON.stringify(categories));
     }
}

function getExpenses() {
    return JSON.parse(localStorage.getItem('expenses') || '[]');
}

function saveExpenses(expenses) {
     if (confirm('Are you sure you want to Save data?')) {
	localStorage.setItem('expenses', JSON.stringify(expenses));
     }
}

function getNextId() {
    let nextId = parseInt(localStorage.getItem('nextExpenseId') || '0');
    localStorage.setItem('nextExpenseId', nextId + 1);
    return nextId;
}

// Category Management
document.getElementById('addCategoryBtn').addEventListener('click', () => {
    const input = document.getElementById('categoryInput');
    const newCategory = input.value.trim();
    if (newCategory && newCategory !== 'Other' && !getCategories().includes(newCategory)) {
        const categories = getCategories();
        categories.push(newCategory);
        saveCategories(categories);
        populateCategoryDropdown();
        buildTable();
        input.value = '';
    } else if (newCategory === 'Other') {
        alert('"Other" is a reserved category.');
    } else {
        alert('Category already exists or is invalid.');
    }
});

function populateCategoryDropdown() {
    const categories = getCategories();
    const select = document.getElementById('category');
    select.innerHTML = '';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
    const otherOption = document.createElement('option');
    otherOption.value = 'Other';
    otherOption.textContent = 'Other';
    select.appendChild(otherOption);
}

// Form Handling
document.getElementById('expenseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const remark = document.getElementById('remark').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (date && category && amount > 0) {
        const expense = {
            id: getNextId(),
            date,
            category,
            amount,
            remark
        };
        const expenses = getExpenses();
        expenses.push(expense);
        saveExpenses(expenses);
        buildTable();
        e.target.reset();
    }
});

// Table Building
function buildTable() {
    const expenses = getExpenses();
    const dates = [...new Set(expenses.map(exp => exp.date))].sort();
    const categories = Array.from(document.getElementById('category').options).map(opt => opt.value);
    const table = document.getElementById('expenseTable');

    // Headers
    let thead = '<tr><th>Date</th>';
    categories.forEach(cat => thead += `<th>${cat}</th>`);
    thead += '<th>Total</th><th>Actions</th></tr>';
    table.querySelector('thead').innerHTML = thead;

    // Body
    let tbody = '';
const categoryTotals = {};
categories.forEach(cat => categoryTotals[cat] = 0);
let grandTotal = 0;

dates.forEach(date => {
    const dateExpenses = expenses.filter(exp => exp.date === date);
    let dailyTotal = 0;
    tbody += `<tr data-date="${date}"><td>${date}</td>`; // Add data-date attribute for easier filtering
    categories.forEach(cat => {
        const catExpenses = dateExpenses.filter(exp => exp.category === cat);
        const amounts = catExpenses.map(exp => 
            `<span class="amount" data-id="${exp.id}">${exp.amount.toFixed(2)}</span>`
        ).join(', ');
        const catSum = catExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        categoryTotals[cat] += catSum;
        dailyTotal += catSum;
        tbody += `<td>${amounts || ''}</td>`;
    });
    tbody += `<td>${dailyTotal.toFixed(2)}</td>`;
    tbody += `<td><button class="btn btn-danger btn-sm delete-btn" data-date="${date}">Delete</button></td>`;
    tbody += `</tr>`;
    grandTotal += dailyTotal;
});
    table.querySelector('tbody').innerHTML = tbody;

    // Footer with Totals
    let tfoot = '<tr><td>Total</td>';
    categories.forEach(cat => tfoot += `<td>${categoryTotals[cat].toFixed(2)}</td>`);
    tfoot += `<td>${grandTotal.toFixed(2)}</td>`;
    tfoot += `<td><button class="btn btn-danger btn-sm" id="deleteAllBtn">Delete All</button></td>`;
    tfoot += `</tr>`;
    table.querySelector('tfoot').innerHTML = tfoot;

  table.querySelector('tbody').innerHTML = tbody; // Update the DOM first
table.querySelector('tfoot').innerHTML = tfoot; // Update footer totals too

if ($.fn.DataTable.isDataTable('#expenseTable')) {
    let table = $('#expenseTable').DataTable();
    table.clear(); // Clear DataTables' internal data
    table.rows.add($('#expenseTable tbody tr')); // Add all rows from the updated tbody
    table.draw(); // Redraw the table with new data
} else {
    $('#expenseTable').DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        order: [[0, 'desc']] // Sort by Date descending
    });
}
}

// Modal Handling
document.getElementById('expenseTable').addEventListener('click', (e) => {
    if (e.target.classList.contains('amount')) {
        const id = e.target.dataset.id;
        const expense = getExpenses().find(exp => exp.id == id);
        if (expense) {
            document.getElementById('remarkText').value = expense.remark || 'No remark provided';
            new bootstrap.Modal(document.getElementById('remarkModal')).show();
        }
    }
});

// Delete Event Listener
document.getElementById('expenseTable').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        if (confirm('Are you sure you want to Delete this expense?')) {

	  const dateToDelete = e.target.dataset.date;
          let expenses = getExpenses();
        
          // Filter out all expenses for this date
          expenses = expenses.filter(exp => exp.date !== dateToDelete);
        
          // Save updated expenses and rebuild table
          saveExpenses(expenses);
          buildTable();
	}
    }
});

// Add this after your existing event listeners (e.g., after the delete button and modal listeners)
document.getElementById('expenseTable').addEventListener('click', (e) => {
    if (e.target.id === 'deleteAllBtn') {
        if (confirm('Are you sure you want to Delete all expenses?')) {
            saveExpenses([]); // Clear all expenses in localStorage
            buildTable(); // Rebuild the table
        }
    }
});

// Graph Section _-------------------------------------------------------------------------------------------------------


// Add this at the end of your script.js

// Toggle Function
function toggleGraphAndForm() {
    const formContainer = $("#formContainer"); // Assuming you wrap form/table in this ID
    const graphContainer = $("#graphContainer");

    if (graphContainer.is(":visible")) {
        graphContainer.hide();
        formContainer.show();
    } else {
        formContainer.hide();
        graphContainer.show();
        renderGraphs(); // Render graphs when showing graph view
    }
}

// Event Listeners for Toggle
$("#graphIcon").on("click", function() {
    toggleGraphAndForm();
});

$("#backToFormBtn").on("click", function() {
    toggleGraphAndForm();
});

// Graph Rendering Function
function renderGraphs() {
    const expenses = getExpenses();
    const categories = Array.from(document.getElementById('category').options).map(opt => opt.value);

    // Prepare data for Bar Chart (Month-wise and Day-wise)
    const dates = expenses.map(exp => exp.date);
    const uniqueMonths = [...new Set(dates.map(date => date.slice(0, 7)))]; // e.g., "2025-03"
    const barData = {
        labels: [],
        datasets: []
    };

    // Group by month and day
    const monthDayData = {};
    uniqueMonths.forEach(month => {
        const daysInMonth = [...new Set(dates.filter(date => date.startsWith(month)))];
        daysInMonth.forEach(day => {
            barData.labels.push(day);
            monthDayData[day] = {};
            categories.forEach(cat => monthDayData[day][cat] = 0);
        });
    });

    expenses.forEach(exp => {
        monthDayData[exp.date][exp.category] += exp.amount;
    });

    categories.forEach(cat => {
        const data = barData.labels.map(day => monthDayData[day][cat]);
        barData.datasets.push({
            label: cat,
            data: data,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            borderWidth: 1
        });
    });

    // Bar Chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    if (window.barChartInstance) window.barChartInstance.destroy(); // Destroy previous instance
    window.barChartInstance = new Chart(barCtx, {
        type: 'bar',
        data: barData,
        options: {
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Amount (₹)' }, beginAtZero: true }
            },
            plugins: { legend: { position: 'top' } }
        }
    });

    // Prepare data for Doughnut Chart (Category-wise)
    const categoryTotals = {};
    categories.forEach(cat => categoryTotals[cat] = 0);
    expenses.forEach(exp => categoryTotals[exp.category] += exp.amount);

    const doughnutData = {
        labels: categories,
        datasets: [{
            data: categories.map(cat => categoryTotals[cat]),
            backgroundColor: categories.map(() => getRandomColor())
        }]
    };

    // Doughnut Chart
    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    if (window.doughnutChartInstance) window.doughnutChartInstance.destroy(); // Destroy previous instance
    window.doughnutChartInstance = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: doughnutData,
        options: {
            plugins: { legend: { position: 'right' } }
        }
    });
}

// Helper Function for Random Colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


// Export To Excel _--------------------------------------------------------------------------------------------


// Add this at the end of your script.js

function ExportToExcel() {
    const expenses = getExpenses();
    const categories = Array.from(document.getElementById('category').options).map(opt => opt.value);
    const dates = [...new Set(expenses.map(exp => exp.date))].sort();

    // Prepare data array for Excel
    const data = [];
    
    // Add title row (spanning all columns)
    const titleRow = ['Expense Manager Report'];
    data.push(titleRow);

    // Add an empty row for spacing
    data.push([]);

    // Header row
    const headers = ['Date', ...categories, 'Total', 'Remarks'];
    data.push(headers);

    // Data rows
    dates.forEach(date => {
        const dateExpenses = expenses.filter(exp => exp.date === date);
        let row = [date];
        let dailyTotal = 0;
        
        categories.forEach(cat => {
            const catExpenses = dateExpenses.filter(exp => exp.category === cat);
            const amounts = catExpenses.map(exp => exp.amount.toFixed(2)).join(', ');
            const catSum = catExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            row.push(amounts || '');
            dailyTotal += catSum;
        });
        
        row.push(dailyTotal.toFixed(2));
        const remarks = dateExpenses.map(exp => exp.remark || '').filter(r => r).join(', ');
        row.push(remarks || '');
        
        data.push(row);
    });

    // Footer row (totals)
    const categoryTotals = {};
    categories.forEach(cat => categoryTotals[cat] = 0);
    expenses.forEach(exp => categoryTotals[exp.category] += exp.amount);
    const grandTotal = categories.reduce((sum, cat) => sum + categoryTotals[cat], 0);
    const footerRow = ['Total', ...categories.map(cat => categoryTotals[cat].toFixed(2)), grandTotal.toFixed(2), ''];
    data.push(footerRow);

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Styling
const colCount = headers.length;
const rowCount = data.length;

// Merge title row across all columns
ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } }];

// Define border style
const borderStyle = {
    top: { style: 'thin', color: { rgb: '000000' } },
    bottom: { style: 'thin', color: { rgb: '000000' } },
    left: { style: 'thin', color: { rgb: '000000' } },
    right: { style: 'thin', color: { rgb: '000000' } }
};

// Apply styles to each cell
for (let R = 0; R < rowCount; R++) {
    for (let C = 0; C < colCount; C++) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellRef]) continue; // Skip empty cells

        // Default style with borders
        ws[cellRef].s = { border: borderStyle };

        // Specific row styles
        if (R === 0) { // Title row
            ws[cellRef].s = {
                font: { bold: true, sz: 14 },
                alignment: { horizontal: 'center' },
                fill: { patternType: 'solid', fgColor: { rgb: 'E6F0FA' } }, // Light blue
                border: borderStyle
            };
        } else if (R === 2) { // Header row
            ws[cellRef].s = {
                font: { bold: true },
                alignment: { horizontal: 'center' },
                fill: { patternType: 'solid', fgColor: { rgb: 'CCE5FF' } }, // Darker blue
                border: borderStyle
            };
        } else if (R === rowCount - 1) { // Footer row
            ws[cellRef].s = {
                font: { bold: true },
                fill: { patternType: 'solid', fgColor: { rgb: 'F2F2F2' } }, // Light gray
                border: borderStyle
            };
        }
    }
}

// Set column widths
ws['!cols'] = headers.map(() => ({ wch: 15 }));

// Create workbook and download
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Expenses');
XLSX.writeFile(wb, 'ExpenseManager.xlsx');
}

// Event Listener for Download Button
$('#downloadBtn').on('click', function() {
    ExportToExcel();
});
