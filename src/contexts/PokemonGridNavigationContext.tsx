import React, { createContext, useState, useContext } from 'react';

type PokemonGridContextType = {
  selectedIndex: number;
  setTotal: (total: number) => void;
  moveUp: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  selectPokemon: () => void;
  showDetails: boolean;
  selectedPokemon: number | null;
};

const PokemonGridNavigationContext = createContext<PokemonGridContextType>({
  selectedIndex: 0,
  setTotal: () => {},
  moveUp: () => {},
  moveDown: () => {},
  moveLeft: () => {},
  moveRight: () => {},
  selectPokemon: () => {},
  showDetails: false,
  selectedPokemon: null,
});

export const usePokemonGridNavigation = () => useContext(PokemonGridNavigationContext);

export const PokemonGridNavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);

  const COLUMNS = 4;

  const setTotal = (total: number) => setTotalPokemon(total);

  const moveUp = () => {
    if (showDetails) return;
    setSelectedIndex((prev) => (prev - COLUMNS >= 0 ? prev - COLUMNS : prev));
  };

  const moveDown = () => {
    if (showDetails) return;
    setSelectedIndex((prev) => (prev + COLUMNS < totalPokemon ? prev + COLUMNS : prev));
  };

  const moveLeft = () => {
    if (showDetails) return;
    setSelectedIndex((prev) => (prev % COLUMNS !== 0 ? prev - 1 : prev));
  };

  const moveRight = () => {
    if (showDetails) return;
    setSelectedIndex((prev) => ((prev + 1) % COLUMNS !== 0 && prev + 1 < totalPokemon ? prev + 1 : prev));
  };

  const selectPokemon = () => {
    setShowDetails((prev) => {
      const newState = !prev;
      if (newState) {
        setSelectedPokemon(selectedIndex);
        console.log(`Mostrando detalles del Pokémon ${selectedIndex}`);
      } else {
        console.log(`Regresando a la cuadrícula`);
        setSelectedPokemon(null);
      }
      return newState;
    });
  };

  return (
    <PokemonGridNavigationContext.Provider
      value={{
        selectedIndex,
        setTotal,
        moveUp,
        moveDown,
        moveLeft,
        moveRight,
        selectPokemon,
        showDetails,
        selectedPokemon,
      }}
    >
      {children}
    </PokemonGridNavigationContext.Provider>
  );
};
