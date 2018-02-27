let [a, b, c] = [1, 2, 3]

class lcz {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
    say() {
        console.log(this.name)
        console.log(a, b, c)
    }
}
var da = new lcz("1243", "23")
da.say()
console.log(2)