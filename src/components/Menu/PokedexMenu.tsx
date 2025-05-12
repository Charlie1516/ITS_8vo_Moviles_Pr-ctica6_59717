import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { EPokedexMenuOption, MenuPokedexContext } from "../../contexts/MenuPokedexContext";

export const PokedexMenu = () => {
  const { menuOption } = useContext(MenuPokedexContext);

  const isSelected = (selectedOption: EPokedexMenuOption) => {
    return menuOption === selectedOption;
  };

  return (
    <div
      style={{
        fontFamily: 'Pokemon GB',
        fontSize: '14px',
        margin: '10px',
        padding: '10px',
        border: '3px double black',
        borderRadius: '8px',
        height: 'calc(100% - 1rem)',
      }}
    >
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {isSelected(EPokedexMenuOption.POKEDEX) && (
            <FontAwesomeIcon icon={faCaretRight} style={{ marginRight: '4px' }} />
          )}
          <span>Pokedex</span>
        </li>
        <li style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {isSelected(EPokedexMenuOption.PACK) && (
            <FontAwesomeIcon icon={faCaretRight} style={{ marginRight: '4px' }} />
          )}
          <span>Objetos</span>
        </li>
        <li style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {isSelected(EPokedexMenuOption.EXIT) && (
            <FontAwesomeIcon icon={faCaretRight} style={{ marginRight: '4px' }} />
          )}
          <span>Salir</span>
        </li>
      </ul>
    </div>
  );
};
