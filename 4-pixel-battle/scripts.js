const options = {
    width: 200,
    forces: 2
}

const state = {
    // Default force colors and names. These can be customized by the user
    colors: ["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00"],
    names: ["Force 1", "Force 2", "Force 3", "Force 4", "Force 5", "Force 6", "Force 7", "Force 8"]
};

const sumReducer = (acc, n) => acc + n;

const drawBoard = () => {
    // Draws each pixel on the canvas
    for (let i = 0; i < options.width; i++) {
        for (let j = 0; j < options.width; j++) {
            state.context.fillStyle = state.colors[state.board[i][j]];
            // Pixels are 3px by 3px
            state.context.fillRect(i*3, j*3, 6, 6);
        }
    }
}

const updateStats = () => {
    // Sort the pixel counts in descending order, keeping track of the force name, color, and count
    const forces = state.counts.map((count, i) => ({
        color: state.colors[i],
        name: state.names[i],
        count
    })).sort((a, b) => b.count - a.count);
    // Generate the stats section using string interpolation
    const statsBody = document.querySelector('.force-stats-body');
    statsBody.innerHTML = forces.reduce((acc, force) => {
        return acc + `
            <tr class="${force.count === 0 ? 'defeated' : force.count === 40000 ? 'winner' : ''}">
                <td>
                    <div class="align-center">
                        <div class="color-wrapper">
                            <input type="color" value="${force.color}" />
                        </div>
                        <div class="force-name">${force.name}</div>
                    </div>
                </td>
                <td>
                    <div class="align-center">
                        <span class="force-count">${force.count}</span>
                        <span class="force-percent">(${(force.count / 40000 * 100).toFixed(2)}%)</span>
                    </div>
                </td>
            </tr>
        `
    }, '');
}

const initBoard = () => {
    const canvas = document.querySelector('.battlefield');
    // The app only works in browsers where canvas is supported
    if (canvas.getContext) {
        state.context = canvas.getContext('2d');
        // The board is represented as a 2-dimensional array
        state.board = Array.from(Array(options.width), () => new Array(options.width));
        // We also keep track of the count of each force's pixel count
        state.counts = new Array(options.forces).fill(0);
    }
    // Initially, we divide the canvas vertically and fill each section with a force
    for (let i = 0; i < options.width; i++) {
        for (let j = 0; j < options.width; j++) {
            // Determine which force we're currently working with
            const force = Math.floor(i / (options.width / options.forces));
            // Update the board and the current force's pixel count
            state.board[i][j] = force;
            state.counts[force]++;
        }
    }
    // Once the board is initialized, draw the board and update the stats section
    drawBoard();
    updateStats();
}

const updateForceList = () => {
    // Reset the list of forces
    const forceList = document.querySelector('.force-list');
    forceList.innerHTML = '';
    // Generate the options section using string interpolation
    for (let i = 0; i < options.forces; i++) {
        forceList.innerHTML += `
            <li class="force">
                <div class="color-wrapper">
                    <input type="color" value="${state.colors[i]}" onchange="updateColor(this.value, ${i});" />
                </div>
                <input type="text" value="${state.names[i]}" oninput="updateName(this.value, ${i});" />
            </li>
        `;
    }
    // If we've hit the min or max forces, disable the add or remove buttons
    document.querySelector('#add-force').disabled = options.forces === 8;
    document.querySelector('#remove-force').disabled = options.forces === 2;
    // Reinitialize the board with the updated force state
    initBoard();
}

// Count the number of surrounding pixels that are controlled by each force
const getSurroundingPixels = (x, y) => {
    // Initialize an empty array representing the count of each field
    const surroundingPixels = new Array(options.forces).fill(0);
    let totalSurroundingPixels = 0;
    // Check each surrounding pixel
    for (i = x - 1; i <= x + 1; i++) {
        for (j = y - 1; j <= y + 1; j++) {
            // If the pixel is not invalid, and not the pixel we're checking for,
            if (i >= 0 && i < options.width && j >= 0 && j < options.width && !(i === x && j === y)) {
                // Increase the count of the force that the current pixel is a member of
                surroundingPixels[state.board[i][j]]++;
                // Increase the total number of valid pixels
                totalSurroundingPixels++;
            }
        }
    }
    // Return the array of surrounding force counts as well as the total number of surrounding pixels
    return { surrounding: surroundingPixels, total: totalSurroundingPixels };
}

const updateBoard = () => {
    // Loop through each pixel on the board
    for (let i = 0; i < options.width; i++) {
        for (let j = 0; j < options.width; j++) {
            // Get the count of surrounding pixels controlled by each force, 
            // and the total number of valid pixels surrounding the current pixel
            const { surrounding, total } = getSurroundingPixels(i, j);
            // Generate a random number between 0 and 1 representing the outcome of the "fight" for the current pixel
            const outcome = Math.random();
            // Loop through each force
            for (let k = 0; k < surrounding.length; k++) {
                // Calculate the odds of the current pixel [i][j] being controlled by the current force [k]
                // This is equal to the sum of all surrounding forces 0..k divided by the total number of surrounding pixels
                const outcomeOdds = surrounding.slice(0, k + 1).reduce(sumReducer, 0) / total;
                // If our random outcome falls within these odds, the current force will control the current pixel
                // E.g., assume the surrounding forces are [1, 2, 0, 5]. 
                // If the outcome falls between 0 and 0.125, force 0 will control the current pixel
                // else if the outcome falls between 0.125 and 0.125 + 0.25 (0.375), join force 1, etc...
                if (outcome < outcomeOdds) {
                    // Remove one from the original force's count
                    state.counts[state.board[i][j]]--;
                    // Set the pixel to the resulting force
                    state.board[i][j] = k;
                    // Add one to the resulting force count
                    state.counts[k]++;
                    // No need to continue, the result has been determined
                    break;
                }
            }
        }
    }
    // Once the board is updated, update the stats section and draw the updated board
    updateStats();
    drawBoard();
}

const checkWinner = () => {
    // If there is a force that controls all 40,000 of the pixels, they are our winner
    return state.counts.indexOf(state.counts.find(count => count === 40000));
}

const startBattle = () => {
    document.querySelector('.battlefield-options').classList.toggle('disabled');
    // Our simulation loop
    state.interval = setInterval(() => {
        // Update the board every 1ms.
        updateBoard();
        // If there is a winner, the simulation is over
        const winner = checkWinner();
        if (winner >= 0) {
            document.querySelector('.battlefield-options').classList.toggle('disabled');
            clearInterval(state.interval);
            window.alert(`${state.names[winner]} emerges victorious!`);
        }
    }, 1)
}

const addForce = () => {
    // Add a new force to the list of forces
    if (options.forces < 8) {
        options.forces++;
        updateForceList();
    }
}

const removeForce = () => {
    // Remove the last force from the list of forces
    if (options.forces > 2) {
        options.forces--;
        updateForceList();
    }
}

const updateName = (name, i) => {
    // Change a force's name
    state.names[i] = name;
    initBoard();
    updateStats();
}

const updateColor = (color, i) => {
    // Change a force's color
    state.colors[i] = color;
    initBoard();
    updateStats();
}

// On load, render the force list
// Rendering the force list also initializes the board, which renders the stats section
updateForceList();

document.querySelector('#add-force').addEventListener('click', addForce);
document.querySelector('#remove-force').addEventListener('click', removeForce);
document.querySelector('#start-battle').addEventListener('click', startBattle);