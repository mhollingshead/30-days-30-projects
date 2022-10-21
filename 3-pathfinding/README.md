<h1 align="center">Pathfinding Visualization</h1>

*A simple BFS pathfinding visualization.*

<img src="assets/img/sample.png" style="width: 100%; border-radius: 4px;" />

### [Try it out here!](https://mhollingshead.github.io/30-days-30-projects/3-pathfinding/)

### Tech Stack

* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="16" height="16" /> JavaScript
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="16" height="16" /> HTML
* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="16" height="16" /> CSS

### Implementation

This app is fairly simple functionality-wise. We simply generate a grid, and execute a breadth-first search in order to find the shortest path from the 'start' cell to the 'end' cell. In order to spice up the grid, I used grass, path, and obstacle tiles rather than solid background colors.

Once we generate a grid, we populate it with cells based on the grid's dimensions. Each cell has a `status` property. On grid initialization, we randomly assign one cell to be the `start` cell and one cell to be the `end` cell, all other cells have a status of `valid`.

Users can click on any valid cell to toggle blockers, which have a status of `blocked`. Only cells with a status of `valid` can be traversed by our pathfinding algorithm.

We simulate a Queue using an `Array` and the `Array.shift` method. We start at the `start` location and an empty path. We check each adjacent cell, creating a new location for each one, making a note of the path and the cell's status. If the cell status is `end`, we've found our target cell, if the cell status is `valid`, we push the location to the queue. We continue until there are no more locations in the queue to check. The first path that leads to the `end` cell is our shortest path.