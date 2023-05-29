const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Todos", 
    tableName: "todo", 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        title: {
            type: "varchar",
        },
    },
})