"use client";

import React, { useState } from 'react';
import { useOrderStore } from '../../stores/orderStore';
import { Button, TextInput } from 'flowbite-react';

interface OrderItem {
  food_id: number;
  quantity: number;
}

const OrderForm: React.FC = () => {
  const [items, setItems] = useState<OrderItem[]>([{ food_id: 0, quantity: 1 }]);
  const { placeOrder } = useOrderStore();

  const handleInputChange = (index: number, field: keyof OrderItem, value: number) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { food_id: 0, quantity: 1 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await placeOrder(items);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">Place an Order</h1>
      {items.map((item, index) => (
        <div key={index} className="flex space-x-4">
          <TextInput
            type="number"
            value={item.food_id}
            onChange={(e) => handleInputChange(index, 'food_id', Number(e.target.value))}
            placeholder="Food ID"
          />
          <TextInput
            type="number"
            value={item.quantity}
            onChange={(e) => handleInputChange(index, 'quantity', Number(e.target.value))}
            placeholder="Quantity"
          />
        </div>
      ))}
      <Button type="button" onClick={addItem} color="gray">
        Add Item
      </Button>
      <Button type="submit" color="blue">
        Place Order
      </Button>
    </form>
  );
};

export default OrderForm;