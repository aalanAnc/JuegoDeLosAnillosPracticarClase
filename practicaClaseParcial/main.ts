import express, { Request, Response } from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

const Schema = mongoose.Schema;

type Personaje = {
  nombre: string;
  raza: string;
  descripcion: string;
  id: number;
};

//Schema de personajes

const PersonSchema = new Schema({
  nombre: { type: String, requires: true },
  raza: { type: String, requires: true },
  descripcion: { type: String, requires: true },
  id: { type: Number, requires: true },
});

const Personajes = mongoose.model<Personaje>("personaje", PersonSchema);

await mongoose.connect(
  "mongodb+srv://alan:12345@cluster0.vomootu.mongodb.net/PruebaSDLA?retryWrites=true&w=majority",
);

const app = express();

//muestra todos los personajes
app.get("/:personajes", async (req: Request, res: Response) => {
  const personajes = await Personajes.find().exec();
  res.send(JSON.stringify(personajes));
});

//mostrar por id
app.get("/:personaje_id/:id", async (req: Request, res: Response) => {
  const idsPersonaje = req.params.id;
  const a = await Personajes.find({ id: idsPersonaje }).exec();
  res.send(JSON.stringify(a));
});

//crear un personaje
app.post(
  "CrearPersonaje/:nombre/:raza/:descripcion/:id",
  async (req: Request, res: Response) => {
    const creacionPeronaje = new Personajes({
      nombre: req.params.nombre,
      raza: req.parans.raza,
      descripcion: req.params.descripcion,
      id: req.params.id,
    });
    await creacionPeronaje.save();
    res.send(JSON.stringify(creacionPeronaje));
  },
);

//actualizar los valores de un personaje por id
app.put(
  "/actualizarPorid/:id/:nombre/:raza/:descripcion/:id",
  async (req: Request, res: Response) => {
    const ids = req.params.id;

    const actu = await Personajes.findOneAndUpdate({ id: ids }, {
      nombre: req.params.nombre,
      raza: req.params.raza,
      descripcion: req.params.descripcion,
    });

    res.send(JSON.stringify(actu));
  },
);

//delete, borrar personaje por id
app.delete("/eliminarPorId/:id", async (req: Request, res: Response) => {
});

app.listen(3000, () => {
  console.log("Funciona");
});
