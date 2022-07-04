type vertex = {
  [key: string]: number;
};

type graph = Array<Array<number>>;

let id: number = 0;
const verticesNames: { [key: string]: number } = {};
const graph: graph = [];

export const addVertex = (name: string) => {
  verticesNames[name] = id;
  graph.forEach((value) => value.push(0));
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

const graphContainerHeight = 200;
const graphContainerWidth = 200;

const mainNode = document.querySelector("main");
const graphContainerNode: HTMLElement =
  document.querySelector("#graph-container")!;
graphContainerNode.style.position = "relative";
graphContainerNode.style.width = `${graphContainerHeight}px`;
graphContainerNode.style.height = `${graphContainerWidth}px`;

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

Object.keys(verticesNames).forEach((vertex: string, index: number) => {
  const buttonNode = document.createElement("button");
  buttonNode.innerText = vertex;
  buttonNode.setAttribute("id", verticesNames[vertex].toString());
  buttonNode.style.position = "absolute";
  buttonNode.style.top =
    String(
      graphContainerHeight +
        -graphContainerHeight *
          Math.cos((360 / graph.length / 180) * index * Math.PI)
    ) + "px";
  buttonNode.style.left =
    String(
      graphContainerWidth +
        graphContainerWidth *
          Math.sin((360 / graph.length / 180) * index * Math.PI)
    ) + "px";

  graphContainerNode?.appendChild(buttonNode);
});
