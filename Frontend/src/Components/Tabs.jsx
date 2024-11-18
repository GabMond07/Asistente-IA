import React, { createContext, useContext, useState } from "react";

// 1. Creamos el contexto
const TabsContext = createContext();

// 2. El proveedor que maneja el estado de los tabs
export const TabsProvider = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue); // Estado de los tabs

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

// 3. Componente de Tabs, no maneja el estado directamente, solo agrupa los hijos
export const Tabs = ({ defaultValue, children }) => {
  return <TabsProvider defaultValue={defaultValue}>{children}</TabsProvider>;
};

// 4. Componente que muestra la lista de tabs
export const TabsList = ({ children, className }) => (
  <div className={`flex space-x-4 ${className}`}>{children}</div>
);

// 5. Componente para los triggers de tabs, accede al contexto para modificar el tab activo
export const TabsTrigger = ({ value, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext); // Accede al contexto

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded-md text-sm ${
        activeTab === value
          ? "bg-blue-500 text-white" // Estilo para el tab activo
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
};

// 6. Componente para el contenido de los tabs, solo muestra el contenido cuando el tab es activo
export const TabsContent = ({ value, children }) => {
  const { activeTab } = useContext(TabsContext); // Accede al contexto

  return activeTab === value ? <div>{children}</div> : null; // Muestra el contenido solo cuando el tab está activo
};
