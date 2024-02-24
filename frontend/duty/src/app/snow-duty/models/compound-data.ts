export class CompoundData {
  "id": number;
  "name": string;
  "version"?: number;
  "is_used": boolean;
  "stock": string | number;
  "elements_list": Compound[] | []
}

interface Compound {
  "id": number;
  "name": string;
  "version"?: number;
  "is_used": boolean;
  "stock": number;
}
