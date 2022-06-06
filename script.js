const rowsCount = 100;
const colsCount = 100;

// each cell
(() => {
  const timeBegin = new Date();
  const table = document.getElementById("table-1");

  const handleCellClick = (e) => {
    e.target.classList.add("selected");
  };

  for (let i = 0; i < rowsCount; i++) {
    const tableRow = document.createElement("tr");

    for (let i = 0; i < colsCount; i++) {
      const tableCell = document.createElement("td");
      tableCell.innerText = i;
      tableCell.addEventListener("mousedown", handleCellClick);

      tableRow.appendChild(tableCell);
    }

    table.appendChild(tableRow);
  }

  const timeEnd = new Date();
  const time = document.createElement("h2");
  time.innerText = timeEnd - timeBegin;
  table.appendChild(time);
})();

// whole table
(() => {
  const timeBegin = new Date();

  const handleCellClick = (e) => {
    if (e.target.nodeName === "TD") {
      e.target.classList.add("selected");
    }
  };

  const table = document.getElementById("table-2");
  table.addEventListener("mousedown", handleCellClick, false);

  for (let i = 0; i < rowsCount; i++) {
    const tableRow = document.createElement("tr");

    for (let i = 0; i < colsCount; i++) {
      const tableCell = document.createElement("td");
      tableCell.innerText = i;

      tableRow.appendChild(tableCell);
    }

    table.appendChild(tableRow);
  }

  const timeEnd = new Date();
  const time = document.createElement("h2");
  time.innerText = timeEnd - timeBegin;
  table.appendChild(time);
})();
