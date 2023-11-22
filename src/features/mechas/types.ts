interface MechaBaseStructure {
  name: string;
  image: string;
}

export interface MechaApiStructure extends MechaBaseStructure {
  _id: string;
  characteristics: {
    speed: string;
    strength: string;
  };
}

export interface MechaStructure extends MechaBaseStructure {
  id: string;
  characteristics: {
    speed: number;
    strength: number;
  };
}
