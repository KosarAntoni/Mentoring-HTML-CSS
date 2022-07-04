import { graph, vertex } from "./models";

let id: number = 0;
const verticesNames: vertex = {};
const graph: graph = [];
const verteciesCoordinates: string[][] = [];

export const addVertex = (name: string) => {
  verticesNames[name] = id;
  graph.forEach((value: number[]) => value.push(0));
  graph.push(new Array(id + 1).fill(0));
  id++;
};

export const addEdge = (from: string, to: string, weight: number) => {
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

addVertex("A");
addVertex("B");
addVertex("C");
addVertex("D");
addVertex("E");
addVertex("F");
addVertex("G");
addVertex("H");

addEdge("A", "B", 2);
addEdge("B", "F", 1);
addEdge("A", "C", 1);
addEdge("C", "D", 10);
addEdge("D", "F", 6);
addEdge("C", "E", 8);
addEdge("E", "F", 2);
addEdge("F", "G", 4);

console.log(toString());
console.log(dijkstra("A"));
console.log(getShortest("A", "C"));
console.log(getShortest("A", "D"));
console.log(getShortest("A", "H"));

//render vertices
const verteciesContainer = document.createElementNS(svgNS, "g");
Object.keys(verticesNames).forEach((vertex: string, index: number) => {
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
  circleNode.setAttribute("id", verticesNames[vertex].toString());
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
  verteciesContainer?.appendChild(groupeNode);
});

// render paths
graph.forEach((row, rowIndex) => {
  row.forEach((cell, cellIndex) => {
    if (cell !== 0) {
      const lineNode = document.createElementNS(svgNS, "line");
      const [x1, y1] = verteciesCoordinates[rowIndex];
      const [x2, y2] = verteciesCoordinates[cellIndex];

      lineNode.setAttribute("x1", x1);
      lineNode.setAttribute("y1", y1);

      lineNode.setAttribute("x2", x2);
      lineNode.setAttribute("y2", y2);

      lineNode.setAttribute("stroke", "black");
      lineNode.setAttribute("stroke-width", "2");

      svgNode?.appendChild(lineNode);
    }
  });
});

svgNode.appendChild(verteciesContainer);
