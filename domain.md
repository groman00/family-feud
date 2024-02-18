# Domain

## Definitions

- A **Game** has 3 **Rounds**
- Each **Round** has 1 **Survey** with 1 or many **Answers**
- Each **Answer** has an **Answer Ranking** within it's **Survey**
- A **Guess** is when a a player attempts to match a **Survey** **Answer**
- A **Good Guess** is when a **Guess** matches an **Answer** in a **Survey**
- A **Bad Guess** is when a **Guess** does not match an **Answer** in a **Survey**
- A **Team** consists of 1 or more **Players**
- A **Playing Team** is actively making **Guesses** for the current **Round**
- An **Idle Team** is not playing the current **Round**.
- A **Steal** is when the **Idle Team** makes a **Good Guess** after the **Playing Team** makes 3 **Bad Guesses**.

## Events

### Starting a Game

- A **Host** must be selected for a **Game**
- The **Host** starts a new **Game** with two **Teams** of **Players**

### Starting a Round

- A new **Round** starts with 1 **Player** from each team.
- When the **Host** reveals the Survey, the **Playing Team** is decided by **Players** **Buzzing** in to **Guess** an **Answer**.
- If a **Player** **Buzzes** in first and their **Guess** is a **Bad Guess**, the other player can **Guess**
- If a **Player** **Buzzes** in first and their **Guess** is a **Good Guess**
  with the highest **Answer Ranking**, they can choose the **Playing Team**. They can **Pass** to the other team or **Play**.
- If a **Player** **Buzzes** in first and their **Guess** matches a **Survey** **Answer**
  that is not the highest **Answer Ranking**, the other **Player** can **Guess**.
- If both **Players** make a **Bad Guess**, they will continue to **Guess** in the same order.
- The **Player** with the highest **Answer Ranking** will choose the **Playing Team**. Either **Pass** to the other team or to **Play**.

### Playing a Round

- The **Playing Team** will **Guess** the remaining answers for the **Survey**.
- **Players** will **Guess** in order, one at a time.
- If a **Player** makes a **Good Guess**, an **Answer** is revealed.
- If all **Answers** are revealed, the **Playing Team** wins the **Round**.
- If a **Bad Guess** is made, the round receives a **Strike**.
- If the **Playing Team** cause 3 **Strikes**, the **Idle Team** can **Steal** with a single **Guess**.
- If the **Idle Team** steals the game if they make a **Good Guess**, and therefore wins the **Round**
- Once the **Round** has a winner, a new **Round** starts. If this is the 3rd round, the Game is over.

## Future Definitions / Events

- If both players guess wrong during buzz in, the host should go to the players in the second position for each team.
- Points
- Fast money round
