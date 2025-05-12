// src/pages/PackPage.tsx
import { useEffect, useRef, useState } from 'react';
import { getAllItems, getItemByNameOrId } from '../services/pokeapi';
import { useItemGridNavigation } from '../contexts/ItemGridNavigationContext';

type Item = {
  name: string;
  url: string;
};

const GRID_COLUMNS = 4;

const PackPage: React.FC = () => {
  const {
    selectedIndex,
    setTotal,
    showItemDetails,
    selectedItem,
  } = useItemGridNavigation();

  const [itemList, setItemList] = useState<Item[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Cargar lista de ítems
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        setItemList(data.results);
        setTotal(data.results.length);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  // Hacer scroll automático al ítem seleccionado
  useEffect(() => {
    const ref = itemRefs.current[selectedIndex];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedIndex]);

  // Mostrar detalles del ítem seleccionado
  useEffect(() => {
    if (!showItemDetails || selectedItem === null) return;

    const fetchDetails = async () => {
      const itemName = itemList[selectedItem]?.name;
      if (!itemName) return;

      try {
        const details = await getItemByNameOrId(itemName);
        setImageUrl(details.sprites?.default || '');
        const flavor = details.effect_entries?.find(
          (entry: { language: { name: string } }) => entry.language.name === 'en'
        );
        setDescription(flavor?.short_effect || 'No description available.');
      } catch (error) {
        console.error('Error loading item details:', error);
        setImageUrl('');
        setDescription('Error loading item info.');
      }
    };

    fetchDetails();
  }, [showItemDetails, selectedItem, itemList]);

  // Vista de detalles
  if (showItemDetails && selectedItem !== null) {
    const nameAsString = itemList[selectedItem]?.name ?? 'Unknown';

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          padding: '0.5rem',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h3 style={{ margin: '0.25rem 0', fontSize: '14px' }}>{nameAsString}</h3>
        <img
          src={imageUrl}
          alt={nameAsString}
          style={{ width: '80px', height: '80px', marginBottom: '0.25rem' }}
        />
        <p
          style={{
            fontSize: '12px',
            textAlign: 'justify',
            whiteSpace: 'pre-wrap',
            margin: 0,
            padding: '0 0.25rem',
            width: '100%',
          }}
        >
          {description}
        </p>
      </div>
    );
  }

  // Vista en cuadrícula
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
        gap: '8px',
        padding: '0.5rem',
        fontFamily: 'sans-serif',
        fontSize: '12px',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        maxWidth: '100%',
      }}
    >
      {itemList.map((item, index) => (
        <div
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          key={item.name}
          style={{
            border: index === selectedIndex ? '2px solid blue' : '1px solid #ccc',
            borderRadius: '8px',
            padding: '6px',
            textAlign: 'center',
            background: index === selectedIndex ? '#eef6ff' : 'white',
            transition: '0.2s',
          }}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
            alt={item.name}
            style={{ width: '40px', height: '40px' }}
          />
          <div style={{ marginTop: '4px' }}>{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default PackPage;
