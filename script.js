const rowsCount = 100;
const colsCount = 100;

const performanceCheck = (elementId, callback) => {
  const timeBegin = new Date();

  callback();

  const timeEnd = new Date();
  const time = document.createElement("h2");
  time.innerText = timeEnd - timeBegin;
  elementId.appendChild(time);
};

// each cell
(() => {
  const table = document.getElementById("table-1");

  const generateTable = () => {
    const handleCellClick = (e) => {
      if (!e.target.classList.contains("selected")) {
        e.target.classList.add("selected");
      }
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
  };

  performanceCheck(table, generateTable);
})();

// whole table
(() => {
  const table = document.getElementById("table-2");

  const generateTable = () => {
    const handleCellClick = (e) => {
      if (
        e.target.nodeName === "TD" &&
        !e.target.classList.contains("selected")
      ) {
        e.target.classList.add("selected");
      }
    };

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
  };

  performanceCheck(table, generateTable);
})();
