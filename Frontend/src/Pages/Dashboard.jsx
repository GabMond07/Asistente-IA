import { Navigation } from "../Components/Navigation";
import Sidebar from "../Components/Sidebar";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../Components/Dialog";
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
  HandCoins,
  MoreHorizontal,
  Hand,
  FileMinus,
  AlertCircle,
  MinusCircle,
  Archive,
} from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8040"];

const Dashboard = () => {
  // -------------------------------------------------------------------------------- //
  // Estados para guardar los datos de la cuenta
  // -------------------------------------------------------------------------------- //

  const [balance, setBalance] = useState(null); // Estado para guardar el balance
  const [totalAssets, setTotalAssets] = useState(null); // Estado para guardar el total de activos
  const [percentageChange, setPercentageChange] = useState(null); // Cambio porcentual

  useEffect(() => {
    // Función para obtener datos del backend
    const fetchBalance = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/update-current-balance/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`, // Reemplaza con tu token
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Actualiza el estado con los datos del backend
          setBalance(data.current_balance);
          setTotalAssets(data.total_assets);
          setPercentageChange(data.percentage_change); // Supongamos que la API devuelve esto
        } else {
          console.error("Error al obtener el balance:", response.statusText);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchBalance(); // Llamada a la función
  }, []); // Se ejecuta una vez cuando el componente se monta

  // -------------------------------------------------------------------------------- //
  // Función para obtener el total de pasivos
  // -------------------------------------------------------------------------------- //

  const iconMap = {
    "Deuda a Corto Plazo": <FileMinus className="inline mr-2" />,
    "Deuda a Largo Plazo": <Archive className="inline mr-2" />,
    Responsibilidad: <AlertCircle className="inline mr-2" />,
    Pasivo: <MinusCircle className="inline mr-2" />,
  };

  const [liabilities, setLiabilities] = useState([]); // Estado para almacenar los pasivos

  useEffect(() => {
    // Función para obtener los pasivos
    const fetchLiabilities = async () => {
      try {
        const response = await fetch("http://localhost:8000/liabilities/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`, // Reemplaza con tu token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLiabilities(data); // Supongamos que la API devuelve un arreglo llamado `liabilities`
        } else {
          console.error("Error al obtener los pasivos:", response.statusText);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchLiabilities(); // Llama a la función
  }, []); // Ejecuta una vez al montar el componente

  // -------------------------------------------------------------------------------- //
  // Función para obtener el total de pasivos
  // -------------------------------------------------------------------------------- //

  const iconMapAsset = {
    "Cuenta Bancaria": <DollarSign className="inline mr-2" />,
    Inversión: <Briefcase className="inline mr-2" />,
    "Activo Fijo": <Diamond className="inline mr-2" />,
    Otro: <Building className="inline mr-2" />,
  };

  const [asset, setAsset] = useState([]);
  const [capitalData, setCapitalData] = useState([]);

  useEffect(() => {
    // Función para obtener los activos
    const fetchAsset = async () => {
      try {
        const response = await fetch("http://localhost:8000/list-assets/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAsset(data);

          const processedData = data.reduce((acc, asset) => {
            const month = new Date(asset.created_at).toLocaleString("default", {
              month: "short",
            }); 

            const existing = acc.find((item) => item.name === month);

            if (existing) {
              existing.valor += parseFloat(asset.value);
            } else {
              acc.push({ name: month, valor: parseFloat(asset.value) });
            }

            return acc;
          }, []);

          // Ordenar los datos por mes (opcional)
          const monthsOrder = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          processedData.sort(
            (a, b) => monthsOrder.indexOf(a.name) - monthsOrder.indexOf(b.name)
          );

          setCapitalData(processedData);
          localStorage.setItem("assets", JSON.stringify(processedData)); 

        } else {
          console.error("Error al obtener los activos:", response.statusText);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchAsset(); // Llama a la función
  }, []); // Ejecuta una vez al montar el componente

  // -------------------------------------------------------------------------------- //
  // Estados para guardar los datos de la cuenta
  // Procesar los datos para agrupar por tipo y calcular los valores totales
  const processedData = asset.reduce((acc, current) => {
    const existing = acc.find((item) => item.name === current.type);
    if (existing) {
      existing.value += parseFloat(current.value);
    } else {
      acc.push({ name: current.type, value: parseFloat(current.value) });
    }
    return acc;
  }, []);

  // Asegurarnos de que si no hay activos de un tipo, se muestre como 0
  const types = ["Cuenta Bancaria", "Inversión", "Activo Fijo", "Otro"]; 
  const finalData = types.map((type) => {
    const existingType = processedData.find((item) => item.name === type);
    return existingType ? existingType : { name: type, value: 0 };
  });
  //console.log(finalData);

  return (
    <>
      <div className="ml-24 h-screen w-full">
        <Navigation />
        <Sidebar className="fixed left-0 top-0 h-full" />
        <div className="flex-1 p-20 ml-12 flex flex-col">
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
                    <p className="text-3xl font-bold">
                      {totalAssets !== null
                        ? `$${totalAssets.toLocaleString()}` || "0"
                        : "Cargando..."}
                    </p>
                    {percentageChange !== null && (
                      <div className="flex items-center text-green-500">
                        <ArrowUpRight size={20} />
                        <span>{percentageChange} % desde el mes pasado</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Valor neto</h3>

                    <p className="text-3xl font-bold">
                      {balance !== null
                        ? `$${balance.toLocaleString()}`
                        : "Cargando..."}
                    </p>
                    <div className="flex items-center text-green-500">
                      <ArrowUpRight size={20} />
                      <span>{percentageChange} % desde el mes pasado</span>
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
                        data={finalData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {finalData.map((entry, index) => (
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
                        {asset.length > 0 ? (
                          asset.map((assets, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {iconMapAsset[assets.type] || (
                                  <CreditCard className="inline mr-2" />
                                )}
                                {assets.type} {/* Tipo de pasivo */}
                              </TableCell>
                              <TableCell>{assets.name}</TableCell>
                              {/* Descripción */}
                              <TableCell>
                                ${assets.value.toLocaleString()}
                              </TableCell>
                              {/* Monto */}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              Sin activos...
                            </TableCell>
                          </TableRow>
                        )}
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
                        {liabilities.length > 0 ? (
                          liabilities.map((liability, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {iconMap[liability.type] || (
                                  <CreditCard className="inline mr-2" />
                                )}
                                {liability.type} {/* Tipo de pasivo */}
                              </TableCell>
                              <TableCell>{liability.name}</TableCell>
                              {/* Descripción */}
                              <TableCell>
                                ${liability.amount.toLocaleString()}
                              </TableCell>{" "}
                              {/* Monto */}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} align="center">
                              Sin pasivos...
                            </TableCell>
                          </TableRow>
                        )}
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
