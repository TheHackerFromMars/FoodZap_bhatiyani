import React, { useEffect, useState } from "react";

const MenuItems: React.FC = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/menu-items")
      .then((res) => res.json())
      .then(setItems);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Restaurant ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item.id}>
              <td className="py-2 px-4">{item.id}</td>
              <td className="py-2 px-4">{item.restaurant_id}</td>
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.category}</td>
              <td className="py-2 px-4">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuItems;