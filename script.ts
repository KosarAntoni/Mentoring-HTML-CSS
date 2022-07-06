import { graph, vertex } from "./models";

let id: number = 0;
const verticesNames: vertex = {};
const graph: graph = [];
let verteciesCoordinates: string[][] = [];
let verteciesChain: number[] = [];

export const addVertex = (name: string) => {
  verticesNames[name] = id;
  graph.forEach((value: number[]) => value.push(0));
  graph.push(new Array(id + 1).fill(0));
  id++;
};

export const addPath = (from: string, to: string, weight: number) => {
  if (!(from in verticesNames)) {
    throw new Error(`Vertex ${from} doesn't exist`);
  }

  if (!(to in verticesNames)) {
    throw new Error(`Vertex ${to} doesn't exist`);
  }

  const fromId = verticesNames[from];
  const toId = verticesNames[to];

  graph[fromId][toId] = weight;
  graph[toId][fromId] = weight;
};

export const returnString = (): string => {
  const array = graph.map((element) => `\n${element.join(", ")}`);
  return array.join();
};

export const dijkstra = (start: string) => {
  const graphLength = graph.length;
  const startIndex = verticesNames[start];
  const distances = new Array(graphLength).fill(Infinity);
  const visitedVertecies: number[] = [];

  distances[startIndex] = 0;

  for (let vertex = 0; vertex < graphLength; vertex++) {
    const currentIndex: number = distances.findIndex(
      (index) =>
        index ===
        distances.reduce((acc, item, distanceIndex) => {
          return !visitedVertecies.includes(distanceIndex) && item < acc
            ? item
            : acc;
        }, Infinity)
    );

    graph[currentIndex].forEach((path, index) => {
      if (path !== 0) {
        if (distances[index] > path + distances[currentIndex]) {
          distances[index] = path + distances[currentIndex];
        }
      }
    });
    visitedVertecies.push(currentIndex);
  }

  verteciesChain = visitedVertecies;
  return distances;
};

export const getShortest = (from: string, to: string) => {
  const toIndex = verticesNames[to];
  const dijkstraResult = dijkstra(from);
  const shortestPath = dijkstraResult[toIndex];

  if (shortestPath === Infinity || !shortestPath) {
    return `No path from ${from} to ${to}`;
  }

  return `Shortest path from ${from} to ${to} is ${shortestPath}`;
};

addVertex("A");
addVertex("B");
addVertex("C");
addVertex("D");
addVertex("E");
addVertex("F");
addVertex("G");
addVertex("H");

addPath("A", "B", 2);
addPath("B", "F", 1);
addPath("A", "C", 1);
addPath("C", "D", 10);
addPath("D", "F", 6);
addPath("C", "E", 8);
addPath("E", "F", 2);
addPath("F", "G", 4);

console.log(toString());
console.log(dijkstra("A"));
console.log(getShortest("A", "C"));
console.log(getShortest("A", "D"));
console.log(getShortest("A", "H"));

const graphContainerHeight = 400;
const graphContainerWidth = 400;
const circleRadius = 20;

const mainNode = document.querySelector("main");

const svgNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const svgNS = svgNode.namespaceURI;
svgNode.setAttribute("width", String(graphContainerWidth));
svgNode.setAttribute("height", String(graphContainerHeight));
svgNode.setAttribute(
  "viewBox",
  `-${circleRadius} -${circleRadius} ${
    graphContainerWidth + circleRadius * 2
  } ${graphContainerHeight + circleRadius * 2}`
);
mainNode?.appendChild(svgNode);

//render vertices
const pathsContainer = document.createElementNS(svgNS, "g");
const verteciesContainer = document.createElementNS(svgNS, "g");
svgNode.appendChild(pathsContainer);
svgNode.appendChild(verteciesContainer);

const renderVertex = (vertex: string, index: number) => {
  const position = (360 / graph.length / 180) * index * Math.PI;
  const x = String(
    (graphContainerHeight + -graphContainerHeight * Math.cos(position)) / 2
  );
  const y = String(
    (graphContainerWidth + graphContainerWidth * Math.sin(position)) / 2
  );

  const groupeNode = document.createElementNS(svgNS, "g") as HTMLElement;

  const circleNode = document.createElementNS(svgNS, "circle");
  circleNode.setAttribute("id", `vertex-${verticesNames[vertex]}`);
  circleNode.setAttribute("fill", "white");
  circleNode.setAttribute("stroke", "black");
  circleNode.setAttribute("stroke-width", "2");
  circleNode.setAttribute("stroke-alignment", "inside");
  circleNode.setAttribute("r", String(circleRadius - 4));
  circleNode.setAttribute("cx", x);
  circleNode.setAttribute("cy", y);

  groupeNode.appendChild(circleNode);

  const textNode = document.createElementNS(svgNS, "text") as HTMLElement;
  textNode.innerHTML = vertex;
  textNode.setAttribute("x", String(+x - circleRadius / 4));
  textNode.setAttribute("y", String(+y + circleRadius / 4));
  textNode.setAttribute("fill", "black");
  textNode.style.userSelect = "none";
  groupeNode.appendChild(textNode);

  verteciesCoordinates.push([x, y]);
  verteciesContainer.appendChild(groupeNode);
};

const renderVertecies = () => {
  Object.keys(verticesNames).forEach((vertex: string, index: number) =>
    renderVertex(vertex, index)
  );
};

// render paths
const renderLine = (
  x1: string,
  y1: string,
  x2: string,
  y2: string,
  weight: string
) => {
  const groupeNode = document.createElementNS(svgNS, "g") as HTMLElement;

  const lineNode = document.createElementNS(svgNS, "line");

  lineNode.setAttribute("x1", x1);
  lineNode.setAttribute("y1", y1);
  lineNode.setAttribute("x2", x2);
  lineNode.setAttribute("y2", y2);
  lineNode.setAttribute("stroke", "black");
  lineNode.setAttribute("stroke-width", "2");
  groupeNode.appendChild(lineNode);

  const textX = (+x1 + +x2) / 2;
  const textY = (+y1 + +y2) / 2;
  const circleNode = document.createElementNS(svgNS, "circle");
  circleNode.setAttribute("fill", "white");
  circleNode.setAttribute("r", String(circleRadius / 2));
  circleNode.setAttribute("cx", String(textX));
  circleNode.setAttribute("cy", String(textY));

  groupeNode.appendChild(circleNode);
  const textNode = document.createElementNS(svgNS, "text") as HTMLElement;
  textNode.innerHTML = weight;
  textNode.setAttribute("x", String(textX - circleRadius / 4));
  textNode.setAttribute("y", String(textY + circleRadius / 4));
  textNode.setAttribute("fill", "black");
  textNode.style.userSelect = "none";
  groupeNode.appendChild(textNode);

  pathsContainer.appendChild(groupeNode);
};

const renderPaths = () => {
  graph.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell !== 0) {
        const [x1, y1] = verteciesCoordinates[rowIndex];
        const [x2, y2] = verteciesCoordinates[cellIndex];

        renderLine(x1, y1, x2, y2, String(cell));
      }
    });
  });
};

const reRenderSvg = () => {
  verteciesContainer.innerHTML = "";
  pathsContainer.innerHTML = "";
  verteciesCoordinates = [];
  renderVertecies();
  renderPaths();
};

const renderInput = (id: string, label?: string, value?: string) => {
  const wrapperNode = document.createElement("span");

  if (label) {
    const labelNode = document.createElement("label");
    labelNode.setAttribute("for", id);
    labelNode.innerText = label;
    wrapperNode.appendChild(labelNode);
  }

  const inputNode = document.createElement("input");
  inputNode.setAttribute("type", "text");
  inputNode.setAttribute("id", id);
  inputNode.setAttribute("maxlength", "1");
  if (value) inputNode.value = value.toString();
  wrapperNode.appendChild(inputNode);

  return wrapperNode;
};

const renderField = (name: string, label: string) => {
  const fieldsetNode = document.createElement("fieldset");

  const legendNode = document.createElement("legend");
  legendNode.innerText = name;
  fieldsetNode.appendChild(legendNode);

  const id = name.toLowerCase();
  const inputNode = renderInput(id, label);
  fieldsetNode.appendChild(inputNode);

  return fieldsetNode;
};

const renderAddVertexForm = () => {
  let value = "";
  const name = "Add vertex";
  const label = "Vertex name: ";
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (verticesNames[value]) {
      alert("Vertex already exist");
      return;
    }
    if (!value) {
      alert("Name shoudn't be emthy");
      return;
    }
    addVertex(value);
    reRenderSvg();
    value = "";
    fieldsetInputNode!.value = value;
  };

  const formNode = document.createElement("form");
  formNode.addEventListener("submit", onSubmit);

  const fieldsetNode = renderField(name, label);
  const fieldsetInputNode = fieldsetNode.querySelector("input");
  fieldsetInputNode!.value = value;
  fieldsetInputNode?.addEventListener("change", (e) => {
    const target = e.target! as HTMLInputElement;
    value = target.value;
  });
  formNode.appendChild(fieldsetNode);

  const buttonNode = document.createElement("button");
  buttonNode.innerText = "add";
  buttonNode.setAttribute("type", "submit");
  fieldsetNode.appendChild(buttonNode);

  mainNode?.append(formNode);
};

const renderAddPathForm = () => {
  let fromValue = "";
  let toValue = "";
  let weightValue = "";
  const name = "Add path";

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // if (!verticesNames[value1]) {
    //   alert(`Vertexv ${value1} doesn't exist`);
    //   return;
    // }
    // if (!value1) {
    //   alert("Name shoudn't be emthy");
    //   return;
    // }
    addPath(fromValue, toValue, Number(weightValue));
    const [x1, y1] = verteciesCoordinates[verticesNames[fromValue]];
    const [x2, y2] = verteciesCoordinates[verticesNames[toValue]];

    renderLine(x1, y1, x2, y2, weightValue);

    fromValue = "";
    toValue = "";
    weightValue = "";
    fromInputNode!.value = fromValue;
    toInputNode!.value = toValue;
    weightInputNode!.value = weightValue;
  };

  const formNode = document.createElement("form");
  formNode.addEventListener("submit", onSubmit);

  const fieldsetNode = document.createElement("fieldset");
  formNode.appendChild(fieldsetNode);

  const legendNode = document.createElement("legend");
  legendNode.innerText = name;
  fieldsetNode.appendChild(legendNode);

  const fromNode = renderInput("from", "From: ");
  const fromInputNode = fromNode.querySelector("input");
  fromInputNode!.value = fromValue;
  fromInputNode?.addEventListener("change", (e) => {
    const target = e.target! as HTMLInputElement;
    fromValue = target.value;
  });
  fieldsetNode.appendChild(fromNode);

  const toNode = renderInput("to", " to: ");
  const toInputNode = toNode.querySelector("input");
  toInputNode!.value = toValue;
  toInputNode?.addEventListener("change", (e) => {
    const target = e.target! as HTMLInputElement;
    toValue = target.value;
  });
  fieldsetNode.appendChild(toNode);

  const weightNode = renderInput("weight", " weight: ");
  const weightInputNode = weightNode.querySelector("input");
  weightInputNode!.value = weightValue;
  weightInputNode?.addEventListener("change", (e) => {
    const target = e.target! as HTMLInputElement;
    weightValue = target.value;
  });
  fieldsetNode.appendChild(weightNode);

  const buttonNode = document.createElement("button");
  buttonNode.innerText = "add";
  buttonNode.setAttribute("type", "submit");
  fieldsetNode.appendChild(buttonNode);

  mainNode?.append(formNode);
};

const showPath = (path: number[]) => {
  console.log(path);
  path.forEach((value, index) => {
    const circleNode = verteciesContainer.querySelector(`#vertex-${value}`);
    setTimeout(() => {
      circleNode!.setAttribute("fill", "red");
    }, 300 * index);
  });
};

const renderGetShortestForm = () => {
  let fromValue = "";
  let toValue = "";
  let resultValue = "";

  const name = "Get shortest path";

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    resultInputNode!.value = getShortest(fromValue, toValue);
    const shortestPath = verteciesChain.slice(0, verticesNames[toValue]);
    showPath(shortestPath);
    fromValue = "";
    toValue = "";
    fromInputNode!.value = fromValue;
    toInputNode!.value = toValue;
  };

  const formNode = document.createElement("form");
  formNode.addEventListener("submit", onSubmit);

  const fieldsetNode = document.createElement("fieldset");
  formNode.appendChild(fieldsetNode);

  const legendNode = document.createElement("legend");
  legendNode.innerText = name;
  fieldsetNode.appendChild(legendNode);

  const fromNode = renderInput("from", "From: ");
  const fromInputNode = fromNode.querySelector("input");
  fromInputNode!.value = fromValue;
  fromInputNode?.addEventListener("change", (e) => {
    const target = e.target! as HTMLInputElement;
    fromValue = target.value;
  });
  fieldsetNode.appendChild(fromNode);

  const toNode = renderInput("to", " to: ");
  const toInputNode = toNode.querySelector("input");
  toInputNode!.value = toValue;
  toInputNode?.addEventListener("change", (e) => {
    const target = e.target! as HTMLInputElement;
    toValue = target.value;
  });
  fieldsetNode.appendChild(toNode);

  const buttonNode = document.createElement("button");
  buttonNode.innerText = "get";
  buttonNode.setAttribute("type", "submit");
  fieldsetNode.appendChild(buttonNode);

  const resultNode = renderInput("result", " result: ", resultValue);
  const resultInputNode = resultNode.querySelector("input");
  resultInputNode?.setAttribute("disabled", "true");
  resultInputNode?.setAttribute("size", "50");
  resultInputNode?.addEventListener("change", (e) => {
    const target = e.target! as HTMLInputElement;
    resultValue = target.value;
  });
  fieldsetNode.appendChild(resultNode);

  mainNode?.append(formNode);
};

renderAddVertexForm();
renderAddPathForm();
renderGetShortestForm();
renderVertecies();
renderPaths();
