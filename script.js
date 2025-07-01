window.onload = function () {
  // Function to switch between form
  function showForm(formId) {
      const forms = document.querySelectorAll('.form-box');
      forms.forEach(form => form.style.display = 'none');
      const targetForm = document.getElementById(formId);
      if (targetForm) {
          targetForm.style.display = 'block';
          if (formId === 'Start-Order') {
              const startOrderForm = targetForm.querySelector('form');
              if (startOrderForm) startOrderForm.reset();
          }
          const startMsg = document.getElementById('start-order-msg');
          const closeMsg = document.getElementById('close-order-msg');
          if (formId === 'line order records') {
              if (window.lastAction === 'start') {
                  startMsg.style.display = 'block';
                  closeMsg.style.display = 'none';
              } else if (window.lastAction === 'close') {
                  startMsg.style.display = 'none';

                  closeMsg.style.display = 'block';
              }
          }
      }
  }
  // Function to handle form submission
  document.querySelector('#Start-Order form').addEventListener('submit', function (e) {
      e.preventDefault();
      const name = this.elements['Name'].value;
      const lot = this.elements['Lot Number'].value;
      const module = this.elements['Module'].value;
      const table = document.querySelector('#line\\ order\\ records table');
      const newRow = table.insertRow(-1);
      const now = new Date();
      const formattedDate = now.toLocaleString();
      newRow.innerHTML = `
      <td>${formattedDate}</td>
      <td>${lot}</td>
      <td>${module}</td>
      <td>${name}</td>
      <td class="status-cell" style="background: yellow;">PENDING</td>
      <td>
      <button class="action-btn cancel-btn" style="background: green; color: white; border: none; padding: 6px 12px; cursor: pointer;">

             CANCEL
             </button>
             </td>

      `;

      window.lastAction = 'start';
      showForm('line order records');
  });
  // Cancel button functionality

  document.querySelector('#line\\ order\\ records table').addEventListener('click', function (e) {
      if (e.target.classList.contains('cancel-btn')) {
          const row = e.target.closest('tr');
          row.remove();
      }
  });
  
  // Change status color (if dropdown is used later)
  document.querySelector('#line\\ order\\ records table').addEventListener('change', function (e) {
      if (e.target.classList.contains('status-select')) {
          const selectedStatus = e.target.value;
          e.target.style.background = selectedStatus === 'PENDING' ? 'yellow' : 'lightgreen';
      }

  });
  // Close Order Button Logic
  document.querySelector('#close-order-btn').addEventListener('click', function () {
      window.lastAction = 'close';
      openCloseOrderForm();
  });

  function openCloseOrderForm() {
      showForm('close-order-form');
      const closeOrderTable = document.querySelector('#closeOrderTable');
      closeOrderTable.innerHTML = `
      <tr>
      <th>Date</th>
      <th>Lot Number</th>
      <th>Module</th>
      <th>Order By</th>
      <th>Status</th>
      <th>Action</th>
      </tr>
      `;

      const mainTable = document.querySelector('#line\\ order\\ records table');
      Array.from(mainTable.rows).forEach((row, index) => {
          if (index === 0) return;
          const statusCell = row.cells[4];
          if (statusCell.textContent.trim() === 'PENDING') {

              const clonedRow = row.cloneNode(true);

              const actionCell = clonedRow.cells[5];

              clonedRow.setAttribute('data-row-id', index);

              actionCell.innerHTML = `<button class="close-btn">Close</button>`;

              closeOrderTable.appendChild(clonedRow);

          }

      });

  }

  // Close button turns PENDING into READY

  document.querySelector('#closeOrderTable').addEventListener('click', function (e) {

      if (e.target.classList.contains('close-btn')) {
          const clonedRow = e.target.closest('tr');
          const rowIndex = clonedRow.dataset.rowId;
          const mainTable = document.querySelector('#line\\ order\\ records table');
          const targetRow = mainTable.rows[rowIndex];
          const statusCell = targetRow.cells[4];
          const actionCell = targetRow.cells[5];
          statusCell.textContent = 'READY';
          statusCell.style.background = 'lightgreen';
          actionCell.innerHTML = `<button class="collect-btn" style="background: blue; color: white; padding: 6px;">COLLECT</button>`;
          clonedRow.remove();
      }
  });

  // Collect button removes row

  document.querySelector('#line\\ order\\ records table').addEventListener('click', function (e) {
      if (e.target.classList.contains('collect-btn')) {
          const row = e.target.closest('tr');
          row.remove();
      }
  });
const express = require('express')
const app = express()
const port = process.env.PORT || 4000 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
};
 
