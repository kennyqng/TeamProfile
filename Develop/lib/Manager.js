// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor (name, id, email, officeNumber) {  
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole(){
        return "Manager"
    }
}

var newBoss = new Manager("Rick", 1, "rick@mail.com", 20);
if (newBoss.getRole() == "Manager"){
    console.log("yep");
}
else console.log("nope");

module.exports = Manager;