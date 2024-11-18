import React from "react";

export const Table = ({ children, className }) => (
  <table className={`min-w-full border-collapse ${className}`}>
    {children}
  </table>
);

export const TableHeader = ({ children, className }) => (
  <thead className={`bg-gray-100 border-b ${className}`}>{children}</thead>
);

export const TableRow = ({ children, className }) => (
  <tr className={`border-b hover:bg-gray-50 ${className}`}>{children}</tr>
);

export const TableHead = ({ children, className }) => (
  <th
    className={`text-left px-4 py-2 text-sm font-semibold text-gray-700 ${className}`}
  >
    {children}
  </th>
);

export const TableBody = ({ children, className }) => (
  <tbody className={`${className}`}>{children}</tbody>
);

export const TableCell = ({ children, className }) => (
  <td
    className={`px-4 py-2 text-sm text-gray-600 border-t ${className}`}
  >
    {children}
  </td>
);
