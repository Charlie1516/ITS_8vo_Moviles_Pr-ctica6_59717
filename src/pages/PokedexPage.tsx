import { useEffect, useRef, useState } from 'react';
import {
  getAllPokemon,
  getPokemonByNameOrId,
  getPokemonSpecies,
} from '../services/pokeapi';
import { usePokemonGridNavigation } from '../contexts/PokemonGridNavigationContext';

type Pokemon = {
  name: string;
  url: string;
};

const GRID_COLUMNS = 4;

const PokedexPage: React.FC = () => {
  const {
    selectedIndex,
    setTotal,
    showDetails,
    selectedPokemon,
  } = usePokemonGridNavigation();

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Cargar la lista de Pokémon al iniciar
  useEffect(() => {
    getAllPokemon()
      .then((data) => {
        setPokemonList(data);
        setTotal(data.length);
      })
      .catch(console.error);
  }, []);

  // Hacer scroll automático al Pokémon seleccionado
  useEffect(() => {
    const ref = itemRefs.current[selectedIndex];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedIndex]);

  // Mostrar detalles del Pokémon si showDetails es true
  useEffect(() => {
    if (!showDetails || selectedPokemon === null) return;

    const fetchDetails = async () => {
      const pokemonName = pokemonList[selectedPokemon]?.name;
      if (!pokemonName) return;

      try {
        const [details, species] = await Promise.all([
          getPokemonByNameOrId(pokemonName),
          getPokemonSpecies(pokemonName),
        ]);

        setImageUrl(details.sprites.front_default || '');
        const flavor = species.flavor_text_entries.find(
          (entry: { language: { name: string } }) => entry.language.name === 'en'
        );
        setDescription(flavor?.flavor_text || 'No description available.');
      } catch (error) {
        console.error('Error loading Pokémon details:', error);
        setImageUrl('');
        setDescription('Error loading Pokémon info.');
      }
    };

    fetchDetails();
  }, [showDetails, selectedPokemon, pokemonList]);

  // Vista de detalles
  if (showDetails && selectedPokemon !== null) {
    const nameAsString = pokemonList[selectedPokemon]?.name ?? 'Unknown';

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

  // Vista de cuadrícula
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
      {pokemonList.map((pokemon, index) => (
        <div
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          key={pokemon.name}
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
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
            alt={pokemon.name}
            style={{ width: '60px', height: '60px' }}
          />
          <div style={{ marginTop: '4px' }}>{pokemon.name}</div>
        </div>
      ))}
    </div>
  );
};

export default PokedexPage;
