const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Obtiene una lista de Pokémon con un límite y desplazamiento opcionales.
 */
export const getAllPokemon = async (limit = 151, offset = 0) => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error('Error al obtener la lista de Pokémon');
  const data = await response.json();
  return data.results; // [{ name, url }]
};

/**
 * Obtiene los detalles completos de un Pokémon por su nombre o ID.
 */
export const getPokemonByNameOrId = async (identifier: string | number) => {
  const response = await fetch(`${BASE_URL}/pokemon/${identifier}`);
  if (!response.ok) throw new Error('Error al obtener los datos del Pokémon');
  const data = await response.json();
  return data;
};

/**
 * Obtiene una lista de objetos (ítems) del juego.
 */
//export const getAllItems = async (limit = 100, offset = 0) => {
  //const response = await fetch(`${BASE_URL}/item?limit=${limit}&offset=${offset}`);
 // if (!response.ok) throw new Error('Error al obtener los ítems');
 // const data = await response.json();
 // return data.results; // [{ name, url }]
//};

export const getAllItems = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/item?limit=50');
  if (!response.ok) throw new Error('Error fetching items');
  return response.json();
};


/**
 * Obtiene los detalles de un ítem específico por nombre o ID.
 */
export const getItemByNameOrId = async (identifier: string | number) => {
  const response = await fetch(`${BASE_URL}/item/${identifier}`);
  if (!response.ok) throw new Error('Error al obtener los detalles del ítem');
  const data = await response.json();
  return data;
};

export const getPokemonDetails = async (name: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error(`Error al obtener detalles de ${name}`);
    return res.json();
  };
  
  export const getPokemonSpecies = async (name: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    if (!res.ok) throw new Error(`Error al obtener especie de ${name}`);
    return res.json();
  };

export const getItemDetails = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/item/${name}`);
  if (!response.ok) throw new Error(`Error fetching item ${name}`);
  return response.json();
};