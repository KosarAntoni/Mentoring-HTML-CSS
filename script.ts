import { graph, vertex } from "./models";

let id: number = 0;
const verticesNames: vertex = {};
const graph: graph = [];
let verteciesCoordinates: string[][] = [];

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

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

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
  groupeNode.style.cursor = "pointer";
  groupeNode.addEventListener("mousedown", () => console.log("click"));

  const circleNode = document.createElementNS(svgNS, "circle");
  circleNode.setAttribute("id", String(verticesNames[vertex]));
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
const renderLine = (x1: string, y1: string, x2: string, y2: string) => {
  const lineNode = document.createElementNS(svgNS, "line");

  lineNode.setAttribute("x1", x1);
  lineNode.setAttribute("y1", y1);

  lineNode.setAttribute("x2", x2);
  lineNode.setAttribute("y2", y2);

  lineNode.setAttribute("stroke", "black");
  lineNode.setAttribute("stroke-width", "2");

  pathsContainer.appendChild(lineNode);
};

const renderPaths = () => {
  graph.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell !== 0) {
        const [x1, y1] = verteciesCoordinates[rowIndex];
        const [x2, y2] = verteciesCoordinates[cellIndex];

        renderLine(x1, y1, x2, y2);
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

const renderAddVertexForm = (
  name: string,
  label: string,
  onSubmit: {
    (e: any, value: string): void;
    (arg0: SubmitEvent, arg1: string): any;
  }
) => {
  let value = "";
  const formNode = document.createElement("form");
  if (onSubmit) {
    formNode.addEventListener("submit", (e) => onSubmit(e, value));
  }

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

  return formNode;
};

const onVertexSubmit = (e: { preventDefault: () => void }, value: string) => {
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
};

const addVertexNode = renderAddVertexForm(
  "Add vertex",
  "Vertex name: ",
  onVertexSubmit
);
mainNode?.append(addVertexNode);

renderVertecies();
renderPaths();
