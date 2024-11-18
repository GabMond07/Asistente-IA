import { Navigation } from "../Components/Navigation";
import Sidebar from "../Components/Sidebar";
import Nube from "../assets/Nube.svg";
import CloudNote from "../Components/cloudNote";

import React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../Components/Dialog";
import { Button } from "../Components/ButtonAsset";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/Tabs";
import { Progress } from "../Components/Pregress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/Table";
import { ButtonDashboard } from "../Components/ButtonDashboard";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Briefcase,
  Home,
  Car,
  Diamond,
  CreditCard,
  Building,
  GraduationCap,
  AlertTriangle,
  TrendingUp,
  FileText,
  Bell,
  Plus,
} from "lucide-react";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8040"];

const capitalData = [
  { name: "Ene", valor: 100000 },
  { name: "Feb", valor: 120000 },
  { name: "Mar", valor: 115000 },
  { name: "Abr", valor: 130000 },
  { name: "May", valor: 140000 },
  { name: "Jun", valor: 55000 },
  { name: "Jul", valor: 55000 },

];

const distribucionActivos = [
  { name: "Ahorros", value: 30 },
  { name: "Inversiones", value: 40 },
  { name: "Inmuebles", value: 20 },
  { name: "Otros", value: 10 },
];

const Dashboard = () => {

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    value: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí llamas a tu API para guardar los datos
    console.log("Form data submitted:", formData);
    // Luego puedes limpiar el formulario:
    setFormData({ name: "", type: "", value: "", category: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <div className="ml-24 h-screen w-full">
        <Navigation />
        <Sidebar className="fixed left-0 top-0 h-full" />
        <div className="flex-1 p-20 ml-12 flex flex-col" >
          <div className="container mx-auto p-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Capital</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Total de activos
                    </h3>
                    <p className="text-3xl font-bold">$525,000</p>
                    <div className="flex items-center text-green-500">
                      <ArrowUpRight size={20} />
                      <span>5.2% desde el mes pasado</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Valor neto</h3>
                    <p className="text-3xl font-bold">$450,000</p>
                    <div className="flex items-center text-green-500">
                      <ArrowUpRight size={20} />
                      <span>3.8% desde el mes pasado</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Distribución de activos
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={distribucionActivos}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {distribucionActivos.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Historial de cambios
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={capitalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="valor" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="cuentas">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cuentas">Cuentas y Activos</TabsTrigger>
                <TabsTrigger value="deudas">Deudas y Pasivos</TabsTrigger>
                <TabsTrigger value="analisis">
                  Análisis y Recomendaciones
                </TabsTrigger>
              </TabsList>
              <TabsContent value="cuentas">
                <Card>
                  <CardHeader>
                    <CardTitle>Cuentas y Activos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <DollarSign className="inline mr-2" />
                            Cuenta Bancaria
                          </TableCell>
                          <TableCell>Cuenta de Ahorros</TableCell>
                          <TableCell>$50,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Briefcase className="inline mr-2" />
                            Inversión
                          </TableCell>
                          <TableCell>Acciones Tecnológicas</TableCell>
                          <TableCell>$100,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Home className="inline mr-2" />
                            Activo Fijo
                          </TableCell>
                          <TableCell>Casa</TableCell>
                          <TableCell>$300,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Car className="inline mr-2" />
                            Activo Fijo
                          </TableCell>
                          <TableCell>Automóvil</TableCell>
                          <TableCell>$25,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Diamond className="inline mr-2" />
                            Otro Activo
                          </TableCell>
                          <TableCell>Joyas</TableCell>
                          <TableCell>$50,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="deudas">
                <Card>
                  <CardHeader>
                    <CardTitle>Deudas y Pasivos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Monto</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <CreditCard className="inline mr-2" />
                            Deuda a Corto Plazo
                          </TableCell>
                          <TableCell>Tarjeta de Crédito</TableCell>
                          <TableCell>$5,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Building className="inline mr-2" />
                            Deuda a Largo Plazo
                          </TableCell>
                          <TableCell>Hipoteca</TableCell>
                          <TableCell>$200,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <GraduationCap className="inline mr-2" />
                            Deuda a Largo Plazo
                          </TableCell>
                          <TableCell>Préstamo Estudiantil</TableCell>
                          <TableCell>$20,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analisis">
                <Card>
                  <CardHeader>
                    <CardTitle>Análisis y Recomendaciones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <AlertTriangle className="mr-2" /> Análisis de Riesgo
                        </h3>
                        <Progress value={60} className="w-full" />
                        <p className="mt-2">
                          Tu perfil de riesgo es moderado. Considera
                          diversificar más tus inversiones.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <TrendingUp className="mr-2" /> Recomendaciones de
                          Inversión
                        </h3>
                        <ul className="list-disc list-inside">
                          <li>Aumenta tu inversión en fondos indexados</li>
                          <li>
                            Considera añadir bonos a tu cartera para equilibrar
                            el riesgo
                          </li>
                          <li>Explora oportunidades en mercados emergentes</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <ArrowDownRight className="mr-2" /> Plan de Pago de
                          Deudas
                        </h3>
                        <p>
                          Prioriza el pago de tu tarjeta de crédito. Considera
                          refinanciar tu hipoteca para obtener una mejor tasa de
                          interés.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ButtonDashboard
                variant="outline"
                className="flex items-center justify-center"
              >
                <FileText className="mr-2" /> Detalles de Cuenta
              </ButtonDashboard>
              <ButtonDashboard
                variant="outline"
                className="flex items-center justify-center"
              >
                <FileText className="mr-2" /> Historial de Transacciones
              </ButtonDashboard>
              <ButtonDashboard
                variant="outline"
                className="flex items-center justify-center"
              >
                <Bell className="mr-2" /> Configuración de Alertas
              </ButtonDashboard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
