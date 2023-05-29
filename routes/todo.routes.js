const express = require("express");
const dataSource = require("../config/db");
const router = express.Router();

router.get("/", async (req, res) => {
  const todoRepository = dataSource.getRepository("Todos");

  try {
    const todos = await todoRepository.find();
    res.json(todos);
  } catch (error) {
    res.status(500).send("Error Occurred");
  }
});


router.get("/:id", async (req, res) => {
    const todoRepository = dataSource.getRepository("Todos");
  
    try {
      const todoId = req.params.id;
      const todo = await todoRepository.findOne({ where: { id: todoId } });
  
      if (!todo) {
        res.status(404).send("Todo not found");
      } else {
        res.json(todo);
      }
    } catch (error) {
      res.status(500).send("Error occurred");
    }
  });


  router.post("/", async(req, res)=>{
    const todoRepository = dataSource.getRepository("Todos");

    const todos = {
        title: req.body.title
    }

    const todoSaved = await todoRepository.save(todos) ;
    res.json({message: "New Data has been saved", todoSaved});
  })

  router.patch("/:id", async (req, res) => {
    const todoRepository = dataSource.getRepository("Todos");
  
        try {
        const todoId = req.params.id;
        const { title } = req.body;
        const todo = await todoRepository.findOne({ where: { id: todoId } });
    
        if(!todo){
            res.status(404).send("Todo not found");
        }else {
            todo.title = title || todo.title;
            await todoRepository.save(todo);
            res.json({message: "Data has been updated", todo});
        }
        }catch(error){
            res.status(500).send("Error occurred");
        }
  });

  router.delete("/:id", async (req, res) => {
    const todoRepository = dataSource.getRepository("Todos");
  
    try {
      const todoId = req.params.id;
      const todo = await todoRepository.findOne({ where: { id: todoId } });
  
      if(!todo){
            res.status(404).json({ message: "Todo not found" });
        }else{
                await todoRepository.remove(todo);
                res.status(200).json({ message: "Data has been deleted" });
            }
        }catch(error){
            res.status(500).json({ message: "Error occurred" });
        }
  });

module.exports = router;
