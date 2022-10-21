const state = {
    code: 0
};

const options = {
    width: 16,
    height: 8
};

const tiles = {
    start: () => `url(./assets/tiles/start.png), url(./assets/tiles/grass.png)`,
    end: () => `url(./assets/tiles/end.png), url(./assets/tiles/grass.png)`,
    valid: () => `url(./assets/tiles/grass.png)`,
    visited: () => `url(./assets/tiles/grass.png)`,
    path: () => `url(./assets/tiles/path.png)`,
    blocked: seed => `url(./assets/tiles/obstacle-${seed}.png), url(./assets/tiles/grass.png)`
}

const getRandomNumber = max => Math.floor(Math.random() * max);
const pause = ms => new Promise(res => setTimeout(res, ms));

class Cell {
    constructor(status, width) {
        // Create the element
        this.element = document.createElement('td');
        // Dynamic element styling
        this.element.style.width = `${width}px`;
        this.element.style.height = `${width}px`;
        // Generate a random seed for tile variance
        this.seed = getRandomNumber(10);
        // Set the initial status of the cell
        this.setStatus(status);

        if (status === 'valid') {
            // Toggle whether the cell is blocked or valid on keypress
            this.element.addEventListener('mousedown', e => {
                if (state.code !== 0) return;
                this.setStatus(e.target.className === 'valid' ? 'blocked' : 'valid');
            });
        }
    }

    setStatus = (status) => {
        this.status = status;
        // Update element class and tile
        this.element.classList = status;
        this.element.style.backgroundImage = tiles[status](this.seed);

        if (status === 'visited') {
            // If the cell has been visited, add a path overlay
            this.element.innerHTML += '<div class="explored"></div>';
        } else if (status === 'valid') {
            // If the cell is valid, clear any path overlays
            this.element.innerHTML = '';
        }
    }
}

class Grid {
    constructor() {
        state.code = 0;
        this.root = document.querySelector('.grid');
        // Clear the current grid, if there is one
        this.root.innerHTML = '';
        // Get the total width of the grid element
        this.width = this.root.offsetWidth;
        // Generate random start and end locations
        this.start = [getRandomNumber(options.height), getRandomNumber(options.width)];
        this.end = [getRandomNumber(options.height), getRandomNumber(options.width)];
        // The cells of the grid are represented by a two-dimensional array
        this.cells = new Array(options.height);
        // Populate the grid with cells
        for (let i = 0; i < options.height; i++) {
            this.cells[i] = new Array(options.width);
            const row = document.createElement('tr');
            for (let j = 0; j < options.width; j++) {
                let status;
                // Check if the cell is the start or end cell, otherwise it's valid
                if (i === this.start[0] && j === this.start[1]) {
                    status = 'start';
                } else if (i === this.end[0] && j === this.end[1]) {
                    status = 'end';
                } else {
                    status = 'valid';
                }
                this.cells[i][j] = new Cell(status, this.width / options.width);
                row.appendChild(this.cells[i][j].element);
            }
            this.root.appendChild(row);
        }
    }

    reset() {
        state.code = 0;
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                // Reset any visited cells to valid cells
                if (this.cells[i][j].status === 'visited') {
                    this.cells[i][j].setStatus('valid');
                }
            }
        }
    }

    clear() {
        this.reset();
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                // Reset any blocked cells to valid cells
                if (this.cells[i][j].status === 'blocked') {
                    this.cells[i][j].setStatus('valid');
                }
            }
        }
    }

    getCellStatus(i, j) {
        if (i < 0 || i >= this.cells.length) return 'invalid';
        if (j < 0 || j >= this.cells[i].length) return 'invalid';
        return this.cells[i][j].status;
    }

    checkDirection(current, direction) {
        // Update the current path with the new directionn
        const path = current.path.slice();
        path.push(direction);
        // Adjust the current coordinates depending on the direction
        let [i, j] = current.coordinates;
        if (direction === 'n') i--;
        else if (direction === 's') i++;
        else if (direction === 'e') j++;
        else if (direction === 'w') j--;
        // Generate a new location using the new coordinates, path, and status
        const location = { 
            coordinates: [i, j], 
            status: this.getCellStatus(i, j),
            path
        };
        // If the new location is valid, or has already been visited, mark it as visited
        if (location.status === 'valid' || location.status === 'visited') {
            this.cells[i][j].setStatus('visited');
        }
        // Return the new location
        return location;
    }

    drawPath(path) {
        // Paths start at the 'start' cell
        let [i, j] = this.start;
        // Follow each step of the path and draw a path on any cells traveled
        path.forEach(direction => {
            // Move in the specified direction
            if (direction === 'n') i--;
            else if (direction === 's') i++;
            else if (direction === 'e') j++;
            else if (direction === 'w') j--;
            // Draw a path on the cell
            this.cells[i][j].element.innerHTML = '<div class="path"></div>';
        });
    }

    async findPath() {
        state.code = 1;
        // We begin with the 'start' cell
        const location = {
            coordinates: this.start,
            path: [],
            status: 'start'
        };
        // We'll mimic a queue using an Array, and Array.shift
        const queue = [location];
        // While there are still locations in the queue, search all adjacent cells
        while (queue.length > 0) {
            // Check the first location in the queue
            const current = queue.shift();
            // Check all adjacent cells for 'end' or 'valid' statuses
            const directions = ['n', 's', 'e', 'w'];
            for (let i = 0; i < directions.length; i++) {
                await pause(2);
                const newLocation = this.checkDirection(current, directions[i]);
                // If we've reached the 'end' cell, we've found the shortest path
                if (newLocation.status === 'end') {
                    state.code = 2;
                    // Draw the path and return
                    this.drawPath(newLocation.path.slice(0, -1));
                    return newLocation.path;
                } else if (newLocation.status === 'valid') {
                    // If the new location is valid, add it to the queue
                    queue.push(newLocation);
                }
            }
        }
        // If no path was found, return an empty array
        return [];
    }
}