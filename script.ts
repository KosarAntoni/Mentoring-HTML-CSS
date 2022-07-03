type vertex = {
  [key: string]: number;
};

type graph = Array<Array<number>>;

let id: number = 0;
const verticesNames: { [key: string]: number } = {};
const graph: graph = [];

const addVertex = (name: string) => {
  verticesNames[name] = id;
  graph.forEach((value) => value.push(0));
  graph.push(new Array(id + 1).fill(0));
  id++;
};

const addEdge = (from: string, to: string, weight: number) => {
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

const returnString = (): string => {
  const array = graph.map((element) => `\n${element.join(", ")}`);
  return array.join();
};

const dijkstra = (start: string) => {
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

const getShortest = (from: string, to: string) => {
  const toIndex = verticesNames[to];
  const dijkstraResult = dijkstra(from);
  const shortestPath = dijkstraResult[toIndex];

  if (shortestPath === Infinity || !shortestPath) {
    return `No path from ${from} to ${to}`;
  }

  return `Shortest path from ${from} to ${to} is ${shortestPath}`;
};

// let graph = new Graph();
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("E");
// graph.addVertex("F");
// graph.addVertex("G");
// graph.addVertex("H");

// graph.addEdge("A", "B", 2);
// graph.addEdge("B", "F", 1);
// graph.addEdge("A", "C", 1);
// graph.addEdge("C", "D", 10);
// graph.addEdge("D", "F", 6);
// graph.addEdge("C", "E", 8);
// graph.addEdge("E", "F", 2);
// graph.addEdge("F", "G", 4);

// console.log(graph.toString());
// console.log(graph.dijkstra("A"));
// console.log(graph.getShortest("A", "C"));
// console.log(graph.getShortest("A", "D"));
// console.log(graph.getShortest("A", "H"));
