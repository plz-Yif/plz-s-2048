class Game2048 {
    constructor() {
        this.gridSize = 4;
        this.grid = [];
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('bestScore') || '0');
        this.gameOver = false;
        this.gameWon = false;
        this.setupEventListeners();
        this.setupTouchListeners();
        this.init();
    }

    init() {
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(0));
        this.score = 0;
        this.gameOver = false;
        this.gameWon = false;
        this.addRandomTile();
        this.addRandomTile();
        this.updateUI();
    }

    addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({ i, j });
                }
            }
        }

        if (emptyCells.length > 0) {
            const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[i][j] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    updateUI() {
        // 更新分数
        document.getElementById('score').textContent = this.score;
        document.getElementById('best-score').textContent = this.bestScore;

        // 清除所有方块
        const tileContainer = document.getElementById('tile-container');
        tileContainer.innerHTML = '';

        // 生成新方块
        const gridContainer = document.querySelector('.grid-container');
        const computedStyle = window.getComputedStyle(gridContainer);
        const gap = parseFloat(computedStyle.gap);
        const padding = parseFloat(computedStyle.paddingTop);
        const containerWidth = gridContainer.offsetWidth;
        
        const gapPercent = gap / containerWidth * 100;
        const paddingPercent = padding / containerWidth * 100;
        const tileSizePercent = (100 - 2 * paddingPercent - (this.gridSize - 1) * gapPercent) / this.gridSize;
        
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const value = this.grid[i][j];
                if (value !== 0) {
                    const tile = document.createElement('div');
                    tile.className = `tile tile-${value}`;
                    tile.style.width = `${tileSizePercent}%`;
                    tile.style.height = `${tileSizePercent}%`;
                    tile.style.top = `${paddingPercent + i * (tileSizePercent + gapPercent)}%`;
                    tile.style.left = `${paddingPercent + j * (tileSizePercent + gapPercent)}%`;
                    tile.textContent = value;
                    tileContainer.appendChild(tile);
                }
            }
        }

        // 更新游戏状态
        const gameMessage = document.getElementById('game-message');
        if (this.gameWon) {
            gameMessage.querySelector('p').textContent = '你赢了！';
            gameMessage.className = 'game-message game-won';
        } else if (this.gameOver) {
            gameMessage.querySelector('p').textContent = '游戏结束！';
            gameMessage.className = 'game-message game-over';
        } else {
            gameMessage.className = 'game-message';
        }
    }

    move(direction) {
        if (this.gameOver || this.gameWon) return;

        let moved = false;

        switch (direction) {
            case 'up':
                moved = this.moveUp();
                break;
            case 'down':
                moved = this.moveDown();
                break;
            case 'left':
                moved = this.moveLeft();
                break;
            case 'right':
                moved = this.moveRight();
                break;
        }

        if (moved) {
            this.addRandomTile();
            this.checkGameOver();
            this.checkGameWon();
            this.updateUI();
        }
    }

    moveLeft() {
        let moved = false;

        for (let i = 0; i < this.gridSize; i++) {
            const row = this.grid[i].filter(val => val !== 0);
            const merged = [];

            for (let j = 0; j < row.length; j++) {
                if (row[j] === row[j + 1]) {
                    const mergedValue = row[j] * 2;
                    merged.push(mergedValue);
                    this.score += mergedValue;
                    if (this.score > this.bestScore) {
                        this.bestScore = this.score;
                        localStorage.setItem('bestScore', this.bestScore.toString());
                    }
                    j++;
                    moved = true;
                } else {
                    merged.push(row[j]);
                }
            }

            while (merged.length < this.gridSize) {
                merged.push(0);
            }

            if (!this.arraysEqual(this.grid[i], merged)) {
                moved = true;
                this.grid[i] = merged;
            }
        }

        return moved;
    }

    moveRight() {
        let moved = false;

        for (let i = 0; i < this.gridSize; i++) {
            const row = this.grid[i].filter(val => val !== 0);
            const merged = [];

            for (let j = row.length - 1; j >= 0; j--) {
                if (row[j] === row[j - 1]) {
                    const mergedValue = row[j] * 2;
                    merged.unshift(mergedValue);
                    this.score += mergedValue;
                    if (this.score > this.bestScore) {
                        this.bestScore = this.score;
                        localStorage.setItem('bestScore', this.bestScore.toString());
                    }
                    j--;
                    moved = true;
                } else {
                    merged.unshift(row[j]);
                }
            }

            while (merged.length < this.gridSize) {
                merged.unshift(0);
            }

            if (!this.arraysEqual(this.grid[i], merged)) {
                moved = true;
                this.grid[i] = merged;
            }
        }

        return moved;
    }

    moveUp() {
        let moved = false;

        for (let j = 0; j < this.gridSize; j++) {
            const column = [];
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][j] !== 0) {
                    column.push(this.grid[i][j]);
                }
            }

            const merged = [];
            for (let i = 0; i < column.length; i++) {
                if (column[i] === column[i + 1]) {
                    const mergedValue = column[i] * 2;
                    merged.push(mergedValue);
                    this.score += mergedValue;
                    if (this.score > this.bestScore) {
                        this.bestScore = this.score;
                        localStorage.setItem('bestScore', this.bestScore.toString());
                    }
                    i++;
                    moved = true;
                } else {
                    merged.push(column[i]);
                }
            }

            while (merged.length < this.gridSize) {
                merged.push(0);
            }

            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][j] !== merged[i]) {
                    moved = true;
                    this.grid[i][j] = merged[i];
                }
            }
        }

        return moved;
    }

    moveDown() {
        let moved = false;

        for (let j = 0; j < this.gridSize; j++) {
            const column = [];
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][j] !== 0) {
                    column.push(this.grid[i][j]);
                }
            }

            const merged = [];
            for (let i = column.length - 1; i >= 0; i--) {
                if (column[i] === column[i - 1]) {
                    const mergedValue = column[i] * 2;
                    merged.unshift(mergedValue);
                    this.score += mergedValue;
                    if (this.score > this.bestScore) {
                        this.bestScore = this.score;
                        localStorage.setItem('bestScore', this.bestScore.toString());
                    }
                    i--;
                    moved = true;
                } else {
                    merged.unshift(column[i]);
                }
            }

            while (merged.length < this.gridSize) {
                merged.unshift(0);
            }

            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][j] !== merged[i]) {
                    moved = true;
                    this.grid[i][j] = merged[i];
                }
            }
        }

        return moved;
    }

    checkGameOver() {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 0) {
                    return;
                }

                if (i < this.gridSize - 1 && this.grid[i][j] === this.grid[i + 1][j]) {
                    return;
                }

                if (j < this.gridSize - 1 && this.grid[i][j] === this.grid[i][j + 1]) {
                    return;
                }
            }
        }

        this.gameOver = true;
    }

    checkGameWon() {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 2048) {
                    this.gameWon = true;
                    return;
                }
            }
        }
    }

    arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    this.move('up');
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    this.move('down');
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    this.move('left');
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.move('right');
                    break;
            }
        });

        document.getElementById('restart-button').addEventListener('click', () => {
            this.init();
        });

        document.getElementById('try-again-button').addEventListener('click', () => {
            this.init();
        });
    }

    setupTouchListeners() {
        let startX, startY, endX, endY;

        document.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        });

        document.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            endY = event.changedTouches[0].clientY;

            const deltaX = endX - startX;
            const deltaY = endY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > 20) {
                    this.move(deltaX > 0 ? 'right' : 'left');
                }
            } else {
                if (Math.abs(deltaY) > 20) {
                    this.move(deltaY > 0 ? 'down' : 'up');
                }
            }
        });
    }
}

// 初始化游戏
window.onload = function() {
    new Game2048();
};