import { useContext } from 'react';
import { EPokedexScreen, MenuPokedexContext } from '../../contexts/MenuPokedexContext';
import { usePokemonGridNavigation } from '../../contexts/PokemonGridNavigationContext';
import { useItemGridNavigation } from '../../contexts/ItemGridNavigationContext';

export const Cross = () => {
  const { screen, menuOption, setMenuOption } = useContext(MenuPokedexContext);

  const pokemonNav = usePokemonGridNavigation();
  const itemNav = useItemGridNavigation();

  const isPokedexScreen = screen === EPokedexScreen.POKEDEX;
  const isPackScreen = screen === EPokedexScreen.PACK;

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    console.log(`Presionaste la dirección: ${direction.toUpperCase()}`);

    if (isPokedexScreen) {
      switch (direction) {
        case 'up': pokemonNav.moveUp(); break;
        case 'down': pokemonNav.moveDown(); break;
        case 'left': pokemonNav.moveLeft(); break;
        case 'right': pokemonNav.moveRight(); break;
      }
    } else if (isPackScreen) {
      switch (direction) {
        case 'up': itemNav.moveUp(); break;
        case 'down': itemNav.moveDown(); break;
        case 'left': itemNav.moveLeft(); break;
        case 'right': itemNav.moveRight(); break;
      }
    }
  };

  return (
    <div id="cross">
      <div
        id="leftcross"
        className="gameboy-button"
        onClick={() => screen === EPokedexScreen.MENU
          ? setMenuOption(menuOption - 1 < 1 ? 3 : menuOption - 1)
          : handleMove('left')}
      >
        <div id="leftT"></div>
      </div>

      <div
        id="topcross"
        className="gameboy-button"
        onClick={() => screen === EPokedexScreen.MENU
          ? setMenuOption(menuOption - 1 < 1 ? 3 : menuOption - 1)
          : handleMove('up')}
      >
        <div id="upT"></div>
      </div>

      <div
        id="rightcross"
        className="gameboy-button"
        onClick={() => screen === EPokedexScreen.MENU
          ? setMenuOption(menuOption + 1 > 3 ? 1 : menuOption + 1)
          : handleMove('right')}
      >
        <div id="rightT"></div>
      </div>

      <div id="midcross" className="gameboy-button">
        <div id="midCircle"></div>
      </div>

      <div
        id="botcross"
        className="gameboy-button"
        onClick={() => screen === EPokedexScreen.MENU
          ? setMenuOption(menuOption + 1 > 3 ? 1 : menuOption + 1)
          : handleMove('down')}
      >
        <div id="downT"></div>
      </div>
    </div>
  );
};
