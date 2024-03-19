const pokeapiURL = new URL(
  "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
);

const getPokemon = async nameOrID => {
  try {
    const data = await fetch(`${pokeapiURL.href}/${nameOrID}`);
    if (data.ok) {
      const pokemon = await data.json();
      const types = pokemon.types.map(({ type }) => type.name);
      const stats = new Map(
        pokemon.stats.map(({ base_stat, stat }) => [stat.name, base_stat])
      );

      return {
        imgSrc: pokemon.sprites.front_default,
        name: pokemon.name,
        id: pokemon.id,
        height: pokemon.height,
        weight: pokemon.weight,
        attack: stats.get("attack"),
        defense: stats.get("defense"),
        hp: stats.get("hp"),
        specialAttack: stats.get("special-attack"),
        specialDefense: stats.get("special-defense"),
        speed: stats.get("speed"),
        types,
      };
    }

    alert("Pokémon not found");
    throw new Error("Pokémon not found...");
  } catch (e) {
    console.log({ e });
  }
};

const pokemonTypeColors = [
  { type: "bug", bgColor: "#44ff2f", textColor: "#000" },
  { type: "dark", bgColor: "#483d8b", textColor: "#fff" },
  { type: "dragon", bgColor: "#008700", textColor: "#fff" },
  { type: "electric", bgColor: "#ffff00", textColor: "#000" },
  { type: "fairy", bgColor: "#ff69b4", textColor: "#000" },
  { type: "fighting", bgColor: "#525252", textColor: "#fff" },
  { type: "fire", bgColor: "#dc143c", textColor: "#fff" },
  { type: "flying", bgColor: "#c3c2c2", textColor: "#000" },
  { type: "ghost", bgColor: "#f8f8ff", textColor: "#000" },
  { type: "grass", bgColor: "#105110", textColor: "#fff" },
  { type: "ground", bgColor: "#5b2d0e", textColor: "#fff" },
  { type: "ice", bgColor: "#4bffff", textColor: "#000" },
  { type: "normal", bgColor: "#808080", textColor: "#000" },
  { type: "poison", bgColor: "#9932cc", textColor: "#fff" },
  { type: "psychic", bgColor: "#8b008b", textColor: "#fff" },
  { type: "rock", bgColor: "#696969", textColor: "#fff" },
  { type: "steel", bgColor: "#353b40", textColor: "#fff" },
  { type: "water", bgColor: "#00bbbb", textColor: "#000" },
];

const newTypeBadge = pokemonType => {
  const typeValueSpan = document.createElement("span");
  const typeValue = document.createTextNode(pokemonType.toUpperCase());
  const { bgColor, textColor } = pokemonTypeColors.find(
    ({ type }) => type === pokemonType
  );
  typeValueSpan.className = "badge shadow";
  typeValueSpan.style.backgroundColor = bgColor;
  typeValueSpan.style.color = textColor;
  typeValueSpan.appendChild(typeValue);

  return typeValueSpan;
};

const capitalizeFirstLetter = str => {
  const split = str.split(" ");
  split.forEach((char, idx) => {
    char = char[0].toUpperCase() + char.slice(1);
    split[idx] = char;
  });

  return split.join(" ");
};

window.addEventListener("load", async () => {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-button");
  const pokemonSprite = document.getElementById("sprite");
  const pokemonName = document.getElementById("pokemon-name");
  const pokemonId = document.getElementById("pokemon-id");
  const pokemonHeight = document.getElementById("height");
  const pokemonWeight = document.getElementById("weight");
  const pokemonTypes = document.getElementById("types");
  const pokemonHP = document.getElementById("hp");
  const pokemonAttack = document.getElementById("attack");
  const pokemonDefense = document.getElementById("defense");
  const pokemonSpecialAttack = document.getElementById("special-attack");
  const pokemonSpecialDefense = document.getElementById("special-defense");
  const pokemonSpeed = document.getElementById("speed");

  const displayPokemon = async input => {
    getPokemon(input).then(pokemon => {
      if (!pokemon) {
        return;
      }
      const {
        attack,
        defense,
        height,
        hp,
        id,
        imgSrc,
        name,
        specialAttack,
        specialDefense,
        speed,
        types,
        weight,
      } = pokemon;

      pokemonSprite.setAttribute("src", imgSrc);
      pokemonName.innerText = capitalizeFirstLetter(name);
      pokemonId.innerText = `#${id}`;
      pokemonHeight.innerText = height;
      pokemonWeight.innerText = weight;
      pokemonTypes.innerHTML = "";
      types.forEach(type => pokemonTypes.appendChild(newTypeBadge(type)));
      pokemonHP.innerText = hp;
      pokemonAttack.innerText = attack;
      pokemonDefense.innerText = defense;
      pokemonSpecialAttack.innerText = specialAttack;
      pokemonSpecialDefense.innerText = specialDefense;
      pokemonSpeed.innerText = speed;
    });
  };

  searchBtn.addEventListener("click", async e => {
    e.preventDefault();
    displayPokemon(searchInput.value.toLowerCase());
  });

  displayPokemon(Math.floor(Math.random() * 1000));
});
