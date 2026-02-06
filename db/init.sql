CREATE TABLE Battle (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    choice TEXT[],
    checkFunction TEXT
);

-- insert a rock paper scissor
INSERT INTO Battle (name, choice, checkFunction) VALUES (
    'Rock Paper Scissors',
    ARRAY['rock', 'paper', 'scissors'],
    'function checkRPS(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return "It's a tie!";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            return "You win!";
        } else {
            return "Computer wins!";
        }
    }'
);