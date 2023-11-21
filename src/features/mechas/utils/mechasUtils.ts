import { type MechaApiStructure, type MechaStructure } from "../types";

export const mechaApiToMecha = ({
  _id: id,
  characteristics: { speed, strength },
  ...mechaBasic
}: MechaApiStructure): MechaStructure => ({
  id,
  ...mechaBasic,
  characteristics: { speed: +speed, strength: +strength },
});

export const mechaWithOutId = ({ id, ...mechabase }: MechaStructure) =>
  mechabase;

export const mechasWithOutId = (mechas: MechaStructure[]) =>
  mechas.map((mecha) => mechaWithOutId(mecha));
