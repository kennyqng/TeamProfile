// TODO: Write code to define and export the Employee class
class Employee {
    constructor (name, id, email) {
        this.name = name || "no name";
        this.id = id  || 0;
        this.email = email || "no email";
    }

    getName(){
        return this.name
    }
    getId(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    getRole(){
        return "Employee"
    }

}
// var newBoss = new Employee ("Rick", 1, "rick@mail.com", );
// if (newBoss.getRole() == "Employee"){
//     console.log("yep");
// }
// else console.log("nope");
module.exports = Employee;