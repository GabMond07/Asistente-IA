import { Navigation } from "../Components/Navigation";
import Sidebar from "../Components/Sidebar";

import { useState } from "react";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { Button } from "../Components/Plans/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/Plans/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/Plans/Dialog";
import { Input } from "../Components/Plans/Input";
import { Label } from "../Components/Plans/Label";
import { Textarea } from "../Components/Plans/Textarea";

// Componente para el formulario de plan financiero
const PlanFinancieroForm = ({ plan, onSubmit, onCancel }) => {
  const [nombre, setNombre] = useState(plan?.nombre || "");
  const [descripcion, setDescripcion] = useState(plan?.descripcion || "");
  const [contenido, setContenido] = useState(plan?.contenido || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, descripcion, contenido });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="descripcion">Descripción</Label>
        <Input
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="contenido">Contenido</Label>
        <Textarea
          id="contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
};

const Plans = () => {
  const [planes, setPlanes] = useState([
    {
      id: 1,
      nombre: "Plan Básico",
      descripcion: "Para principiantes",
      contenido: "Detalles del plan básico...",
    },
    {
      id: 2,
      nombre: "Plan Avanzado",
      descripcion: "Para expertos",
      contenido: "Detalles del plan avanzado...",
    },
  ]);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);

  const crearPlan = (nuevoPlan) => {
    const id = planes.length > 0 ? Math.max(...planes.map((p) => p.id)) + 1 : 1;
    setPlanes([...planes, { ...nuevoPlan, id }]);
    setModalCrearAbierto(false);
  };

  const editarPlan = (planEditado) => {
    if (planSeleccionado) {
      setPlanes(
        planes.map((p) =>
          p.id === planSeleccionado.id
            ? { ...planEditado, id: planSeleccionado.id }
            : p
        )
      );
      setModalEditarAbierto(false);
      setPlanSeleccionado(null);
    }
  };

  const eliminarPlan = () => {
    if (planSeleccionado) {
      setPlanes(planes.filter((p) => p.id !== planSeleccionado.id));
      setModalEliminarAbierto(false);
      setPlanSeleccionado(null);
    }
  };

  return (
    <>
      <div className="ml-24 h-screen w-full ">
        <Navigation />
        <Sidebar className="fixed left-0 top-0 h-full" />
        <div className="flex-1 p-20 ml-12 flex flex-col "> 
          <div className="container mx-auto p-4 space-y-4 ">
            <div className={`bg-white shadow rounded-lg p-4"}`}>
              <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Planes Financieros</h1>
                <Button
                  onClick={() => setModalCrearAbierto(true)}
                  className="flex items-center justify-center mr-20 mb-5 hover:bg-blue-500 rounded-full cursor-pointer"
                >
                  <CirclePlus className="inline mr-2" /> Crear Plan
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {planes.map((plan) => (
                    <Card key={plan.id}>
                      <CardHeader>
                        <CardTitle>{plan.nombre}</CardTitle>
                        <CardDescription>{plan.descripcion}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{plan.contenido}</p>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setPlanSeleccionado(plan);
                              setModalEditarAbierto(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              setPlanSeleccionado(plan);
                              setModalEliminarAbierto(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Modal para crear plan */}
                <Dialog
                  open={modalCrearAbierto}
                  onOpenChange={setModalCrearAbierto}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear Nuevo Plan</DialogTitle>
                      <DialogDescription>
                        Ingrese los detalles del nuevo plan financiero.
                      </DialogDescription>
                    </DialogHeader>
                    <PlanFinancieroForm
                      onSubmit={crearPlan}
                      onCancel={() => setModalCrearAbierto(false)}
                    />
                  </DialogContent>
                </Dialog>

                {/* Modal para editar plan */}
                <Dialog
                  open={modalEditarAbierto}
                  onOpenChange={setModalEditarAbierto}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Plan</DialogTitle>
                      <DialogDescription>
                        Modifique los detalles del plan financiero.
                      </DialogDescription>
                    </DialogHeader>
                    {planSeleccionado && (
                      <PlanFinancieroForm
                        plan={planSeleccionado}
                        onSubmit={editarPlan}
                        onCancel={() => setModalEditarAbierto(false)}
                      />
                    )}
                  </DialogContent>
                </Dialog>

                {/* Modal para confirmar eliminación */}
                <Dialog
                  open={modalEliminarAbierto}
                  onOpenChange={setModalEliminarAbierto}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmar Eliminación</DialogTitle>
                      <DialogDescription>
                        ¿Está seguro de que desea eliminar este plan financiero?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setModalEliminarAbierto(false)}
                      >
                        Cancelar
                      </Button>
                      <Button variant="destructive" onClick={eliminarPlan}>
                        Eliminar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="p-44">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
