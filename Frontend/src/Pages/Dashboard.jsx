import { Navigation } from "../Components/Navigation";
import Sidebar from "../Components/Sidebar";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";


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
  PlusCircle,
  Edit,
  Trash,
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
          const monthsOrder = [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
          ];
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

  // Función para obtener las recomendaciones del asistente
  const [data, setData] = useState({
    current_balance: null,
    total_assets: null,
    assistant_suggestion: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llamada a la API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/get-recommendations/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  const { current_balance, total_assets, assistant_suggestion } = data;

  // Analisis de Riesgo
  const [data_analisis, setDataAnalisis] = useState({
    assistant_suggestion_anal: "",
  });
  const [errors, setErrors] = useState(null);
  const [loadings, setLoadings] = useState(true);
  useEffect(() => {
    // Llamada a la API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/get-analitics/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }

        const result = await response.json();
        setDataAnalisis(result);
      } catch (err) {
        setErrors(err.message);
      } finally {
        setLoading_(false);
      }
    };

    fetchData();
  }, []);

  if (errors) {
    return <p>Error: {errors}</p>;
  }

  const { assistant_suggestion_anal } = data_analisis;

  // Pago de deuda
  const [data_deuda, setDataDeuda] = useState({
    assistant_suggestion_debt: "",
  });
  const [error_, setError_] = useState(null);
  const [loading_, setLoading_] = useState(true);
  useEffect(() => {
    // Llamada a la API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/get-debt-payment/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }

        const result = await response.json();
        setDataDeuda(result);
      } catch (err) {
        setError_(err.message);
      } finally {
        setLoading_(false);
      }
    };

    fetchData();
  }, []);

  if (error_) {
    return <p>Error: {error_}</p>;
  }

  const { assistant_suggestion_debt } = data_deuda;

  // CRUD para activos ------------------------------------------------------------------------------------
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { handleSubmit, register, reset } = useForm(); // Incluye `register` para manejar inputs

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    value: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Obtén el token desde el almacenamiento local

    try {
      const response = await fetch("http://localhost:8000/save-financial-asset/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el activo");
      }

      const result = await response.json();
      console.log("Activo guardado:", result);
      toggleForm(); // Cierra el formulario tras guardar
    } catch (error) {
      console.error("Error al enviar el formulario:", error.message);
    }
  };

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
                    <div className="flex justify-between mb-3">
                      <CardTitle>Cuentas y Activos</CardTitle>
                      <button 
                      onClick={toggleForm}
                      className="flex items-end justify-center mr-20 p-1 hover:bg-gray-200 rounded-full cursor-pointer ">
                        <PlusCircle className="inline mr-2" /> Añadir
                      </button>
                    </div>
                    {isFormOpen && (
                      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-lg font-semibold mb-4">Añadir nuevo activo</h2>
                        <form onSubmit={onSubmit}>
                          {/* Campo Nombre */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Nombre del activo
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={onChange}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Ejemplo: Casa, Vehículo"
                              required
                            />
                          </div>
                
                          {/* Campo Tipo */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Tipo de activo
                            </label>
                            <select
                              name="type"
                              value={formData.type}
                              onChange={onChange}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            >
                              <option value="">Selecciona un tipo</option>
                              <option value="Cuenta Bancaria">Cuenta Bancaria</option>
                              <option value="Inversión">Inversión</option>
                              <option value="Activo Fijo">Activo Fijo</option>
                              <option value="Otro">Otro</option>
                            </select>
                          </div>
                
                          {/* Campo Valor */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Valor del activo
                            </label>
                            <input
                              type="number"
                              name="value"
                              value={formData.value}
                              onChange={onChange}
                              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Ejemplo: 100000"
                              step="0.01"
                              required
                            />
                          </div>
                
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={toggleForm}
                              className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                              Guardar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead className={"flex justify-center"}>
                            Acción
                          </TableHead>
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
                              <TableCell
                                className={"flex flex-col justify-center"}
                              >
                                <div className="flex justify-center mb-2 gap-x-2">
                                  <button className="flex items-center justify-center">
                                    <Edit className="inline hover:bg-gray-300 rounded-md cursor-pointer" />
                                  </button>
                                  <button className="flex items-center justify-center">
                                    <Trash className="inline hover:bg-gray-300 rounded-md cursor-pointer" />
                                  </button>
                                </div>
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
                    <div className="flex justify-between mb-3">
                      <CardTitle>Deudas y Pasivos</CardTitle>
                      <button className="flex items-end justify-center mr-20 p-1 hover:bg-gray-200 rounded-full cursor-pointer">
                        <PlusCircle className="inline mr-2" />
                        Añadir
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Monto</TableHead>
                          <TableHead className={"flex justify-center mr-1"}>
                            Acción
                          </TableHead>
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
                              <TableCell
                                className={"flex flex-col justify-center"}
                              >
                                <div className="flex justify-center mb-2 gap-x-2 mr-1">
                                  <button className="flex items-center justify-center">
                                    <Edit className="inline hover:bg-gray-300 rounded-md cursor-pointer" />
                                  </button>
                                  <button className="flex items-center justify-center">
                                    <Trash className="inline hover:bg-gray-300 rounded-md cursor-pointer" />
                                  </button>
                                </div>
                              </TableCell>
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
                        <Progress value={100} className="w-full" />
                        <p className="mt-2">
                          Tu saldo actual es de <b>${current_balance}</b> y el
                          total de tus activos es <b>${total_assets}</b>.
                        </p>
                        <p style={{ whiteSpace: "pre-line" }}>
                          {assistant_suggestion_anal}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <TrendingUp className="mr-2" /> Recomendaciones de
                          Inversión
                        </h3>
                        <p style={{ whiteSpace: "pre-line" }}>
                          {assistant_suggestion}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                          <ArrowDownRight className="mr-2" /> Plan de Pago de
                          Deudas
                        </h3>
                        <p style={{ whiteSpace: "preserve-breaks" }}>
                          {assistant_suggestion_debt}
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
