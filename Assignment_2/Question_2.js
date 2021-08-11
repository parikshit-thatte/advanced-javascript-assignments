class QueenAttack {
    constructor (posX1, posY1, posX2, posY2) {
        this.posX1 = posX1;
        this.posY1 = posY1;
        this.posX2 = posX2;
        this.posY2 = posY2
    }

    canAttack() {
        // If queen1 and the queen2 are in the same row
        if (this.posX1 == this.posX2)
        return "Yes, both the queens can attack each other.";

        // If queen1 and the queen2 are in the same column
        if (this.posY1 == this.posY2)
            return "Yes, both the queens can attack each other.";

        // If queens can attack diagonally
        if (Math.abs(this.posX1 - this.posX2) == Math.abs(this.posY1 - this.posY2))
            return "Yes, both the queens can attack each other.";

        // queens cannot attack
        return "No, none of the queens can attack each other";
    }
}

let obj1 = new QueenAttack(0, 0, 7, 7);
let obj2 = new QueenAttack(4, 5, 6, 7);
let obj3 = new QueenAttack(1, 1, 3, 2);

console.log(obj1.canAttack());
console.log(obj2.canAttack());
console.log(obj3.canAttack());