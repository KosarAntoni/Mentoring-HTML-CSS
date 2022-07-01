type vertex = {
  [key: string]: number;
};

type graph = Array<Array<number>>;

class Graph {
  id: number;
  verticesNames: { [key: string]: number };
  graph: graph;

  constructor() {
    this.graph = [];
    this.verticesNames = {};
    this.id = 0;
  }

  addVertex(name: string) {
    this.verticesNames[name] = this.id;
    this.graph.forEach((value) => value.push(0));
    this.graph.push(new Array(this.id + 1).fill(0));
    this.id++;
  }

  addEdge(from: string, to: string, weight: number) {
    const formatedFrom = from.toUpperCase();
    const formatedTo = to.toUpperCase();

    if (!(from in this.verticesNames)) {
      throw new Error(`Vertex ${from} doesn't exist`);
    }

    if (!(to in this.verticesNames)) {
      throw new Error(`Vertex ${to} doesn't exist`);
    }

    const fromId = this.verticesNames[from];
    const toId = this.verticesNames[to];

    this.graph[fromId][toId] = weight;
    this.graph[toId][fromId] = weight;
  }

  toString(): string {
    const array = this.graph.map((element) => `\n${element.join(", ")}`);
    return array.join();
  }

  dijkstra(start: string) {
    const startIndex = this.verticesNames[start];
    const graphLength = this.graph.length;

    const distance = new Array(graphLength).fill(Infinity);
    distance[startIndex] = 0;

    this.graph.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell !== 0 && cell + distance[rowIndex] < distance[cellIndex]) {
          distance[cellIndex] = cell + distance[rowIndex];
        }
      });
    });
    return distance;
  }

  getShortest(from: string, to: string) {
    const toIndex = this.verticesNames[to];
    const dijkstraResult = this.dijkstra(from);
    const shortestPath = dijkstraResult[toIndex];

    if (shortestPath === Infinity) {
      return `No path from ${from} to ${to}`;
    }

    return `Shortest path from ${from} to ${to} is ${shortestPath}`;
  }
}

let graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
graph.addVertex("H");

graph.addEdge("A", "B", 2);
graph.addEdge("B", "F", 1);
graph.addEdge("A", "C", 1);
graph.addEdge("C", "D", 10);
graph.addEdge("D", "F", 6);
graph.addEdge("C", "E", 8);
graph.addEdge("E", "F", 2);
graph.addEdge("F", "G", 4);

console.log(graph.toString());
console.log(graph.dijkstra("A"));
console.log(graph.getShortest("A", "C"));
console.log(graph.getShortest("A", "D"));
console.log(graph.getShortest("A", "H"));
