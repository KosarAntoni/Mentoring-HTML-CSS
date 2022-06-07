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

  const handleCellClick = (e) => {
    if (!e.target.classList.contains("selected")) {
      e.target.classList.add("selected");
    }
  };

  const generateTable = () => {
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

  const handleCellClick = (e) => {
    if (
      e.target.nodeName === "TD" &&
      !e.target.classList.contains("selected")
    ) {
      e.target.classList.add("selected");
    }
  };

  const generateTable = () => {
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

// drag&drop
(() => {
  const table = document.getElementById("table-3");

  let dragElement;

  const handleDragStart = (e) => {
    e.target.classList.add("dnd-table__td--drag-start");

    dragElement = e.target;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.innerHTML);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (dragElement !== e.target) {
      dragElement.innerHTML = e.target.innerHTML;
      e.target.innerHTML = e.dataTransfer.getData("text/html");
      e.target.classList = "dnd-table__td";
    }

    return false;
  };

  const handleDragEnd = (e) => {
    e.target.classList = "dnd-table__td";
  };

  const handleDragEnter = (e) => {
    e.target.classList.add("dnd-table__td--drag-over");
  };

  const handleDragLeave = (e) => {
    e.target.classList.remove("dnd-table__td--drag-over");
  };

  const generateTable = () => {
    for (let r = 0; r < 10; r++) {
      const tableRow = document.createElement("tr");

      for (let c = 0; c < 10; c++) {
        const tableCell = document.createElement("td");
        tableCell.innerText = `${r}:${c}`;
        tableCell.className = "dnd-table__td";

        tableCell.setAttribute("draggable", "true");
        tableCell.addEventListener("dragstart", handleDragStart, false);
        tableCell.addEventListener("dragover", handleDragOver, false);
        tableCell.addEventListener("drop", handleDrop, false);
        tableCell.addEventListener("dragenter", handleDragEnter, false);
        tableCell.addEventListener("dragleave", handleDragLeave, false);
        tableCell.addEventListener("dragend", handleDragEnd, false);

        tableRow.appendChild(tableCell);
      }

      table.appendChild(tableRow);
    }
  };

  performanceCheck(table, generateTable);
})();
