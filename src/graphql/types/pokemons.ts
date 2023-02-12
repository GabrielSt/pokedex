export interface AttackInfo {
  name: string;
  damage: number;
  type: string;
}

interface MessureInfo {
  minimum: string;
  maximum: string;
}

export interface Attacks {
  special: AttackInfo[];
  fast: AttackInfo[];
}

export interface Pokemon {
  id: string;
  name: string;
  number: string;
  classification: string;
  types: string[];
  image: string;
  maxHP: number;
  maxCP: number;
  weight: MessureInfo;
  height: MessureInfo;
  attacks: Attacks;
  selectedFastAttack?: AttackInfo;
  selectedSpecialAttack?: AttackInfo;
}
