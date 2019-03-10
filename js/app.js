new Vue({
    el: '#app',
    data: {
        playerHP: 100,
        monsterHP: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHP = 100;
            this.monsterHP = 100;
            this.turns = [];
        },
        attack() {
            const damage = this.calculateDamage(3, 10);
            this.monsterHP -= damage
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits Monster for ${damage}`
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },
        specialAttack() {
            const damage = this.calculateDamage(10, 20);
            this.monsterHP -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits Monster for ${damage}`
            });
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },
        heal() {
            if (this.playerHP <= 90) {
                this.playerHP += 10;
            } else {
                this.playerHP = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: `Player heals Monster for 10`
            });

            this.monsterAttack();
        },
        giveUp() {
            this.gameIsRunning = false;
        },
        monsterAttack() {
            const damage = this.calculateDamage(5, 12);
            this.playerHP -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: `Monster hits player for ${damage}`
            });
        },
        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin() {
            if (this.monsterHP <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHP <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }

            return false;
        }
    }
});