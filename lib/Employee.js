// TODO: Write code to define and export the Employee class

const Employee = function(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.getName = () => this.name;
    this.getId = () => this.id;
    this.getEmail = () => this.email;
};

module.exports = Employee;