export interface Pokemon {
  imageSrc: string;
  name: string;
  types: Types[];
}

export interface Types {
  slot: number;
  type: Type;
}

export interface Type {
  url: string;
  name: string;
}
