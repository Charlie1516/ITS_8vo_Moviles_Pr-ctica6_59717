// src/contexts/ItemGridNavigationContext.tsx
import React, { createContext, useState, useContext } from 'react';

type ItemGridContextType = {
  selectedIndex: number;
  setTotal: (total: number) => void;
  moveUp: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  selectItem: () => void;
  showItemDetails: boolean;
  selectedItem: number | null;
};

const ItemGridNavigationContext = createContext<ItemGridContextType>({
  selectedIndex: 0,
  setTotal: () => {},
  moveUp: () => {},
  moveDown: () => {},
  moveLeft: () => {},
  moveRight: () => {},
  selectItem: () => {},
  showItemDetails: false,
  selectedItem: null,
});

export const useItemGridNavigation = () => useContext(ItemGridNavigationContext);

export const ItemGridNavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const COLUMNS = 4;

  const setTotal = (total: number) => setTotalItems(total);

  const moveUp = () => {
    if (showItemDetails) return;
    setSelectedIndex((prev) => (prev - COLUMNS >= 0 ? prev - COLUMNS : prev));
  };

  const moveDown = () => {
    if (showItemDetails) return;
    setSelectedIndex((prev) => (prev + COLUMNS < totalItems ? prev + COLUMNS : prev));
  };

  const moveLeft = () => {
    if (showItemDetails) return;
    setSelectedIndex((prev) => (prev % COLUMNS !== 0 ? prev - 1 : prev));
  };

  const moveRight = () => {
    if (showItemDetails) return;
    setSelectedIndex((prev) => ((prev + 1) % COLUMNS !== 0 && prev + 1 < totalItems ? prev + 1 : prev));
  };

  const selectItem = () => {
    setShowItemDetails((prev) => {
      const newState = !prev;
      if (newState) {
        setSelectedItem(selectedIndex);
        console.log(`Mostrando detalles del objeto ${selectedIndex}`);
      } else {
        setSelectedItem(null);
        console.log(`Regresando a la cuadrícula de objetos`);
      }
      return newState;
    });
  };

  return (
    <ItemGridNavigationContext.Provider
      value={{
        selectedIndex,
        setTotal,
        moveUp,
        moveDown,
        moveLeft,
        moveRight,
        selectItem,
        showItemDetails,
        selectedItem,
      }}
    >
      {children}
    </ItemGridNavigationContext.Provider>
  );
};
