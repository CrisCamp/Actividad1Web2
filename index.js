const express = require('express');
const app = express();
app.use(express.json())
const port = 3010;

let animales = [
  { id: '1', nombre: 'perro' },
  { id: '2', nombre: 'gato' },
  { id: '3', nombre: 'loro' }
];

// GET: Obtener todos los animales
app.get('/animales', (req, res) => {
  res.send(animales);
});

// GET: Obtener un animal por ID
app.get('/animales/:id', (req, res) => {
    const id = req.params.id;
    const animal = animales.find(animal => animal.id === id);
  
    if (!animal) {
      res.status(404).send('Animal no encontrado');
      return;
    }
  
    res.send(animal);
});

// POST: Agregar un nuevo animal
app.post('/animales', (req, res) => {
  let nuevoAnimal = req.body;
  animales.push(nuevoAnimal);
  res.send(nuevoAnimal);
});


// PUT: Actualizar un animal por ID
app.put('/animales/:id', (req, res) => {
  const id = req.params.id;
  const animalActualizado = req.body;
  const indiceAnimal = animales.findIndex(animal => animal.id === id);
  if (indiceAnimal === -1) {
    res.status(404).send('Animal no encontrado');
    return;
  }
  animales[indiceAnimal] = animalActualizado;
  res.send(animalActualizado);
});


// PATCH: Actualizar parcialmente un animal por ID
app.patch('/animales/:id', (req, res) => {
  const id = req.params.id;
  const cambiosAnimal = req.body;
  const indiceAnimal = animales.findIndex(animal => animal.id === id);
  if (indiceAnimal === -1) {
    res.status(404).send('Animal no encontrado');
    return;
  }
  const animalActualizado = Object.assign(animales[indiceAnimal], cambiosAnimal);
  animales[indiceAnimal] = animalActualizado;
  res.send(animalActualizado);
});


// DELETE: Eliminar un animal por ID
app.delete('/animales/:id', (req, res) => {
  const id = req.params.id;
  const indiceAnimal = animales.findIndex(animal => animal.id === id);
  if (indiceAnimal === -1) {
    res.status(404).send('Animal no encontrado');
    return;
  }
  const animalEliminado = animales.splice(indiceAnimal, 1);
  res.send(animalEliminado);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});