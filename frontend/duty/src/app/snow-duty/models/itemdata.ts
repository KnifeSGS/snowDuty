export class Itemdata {
  k: string = '';
  v: number = 0;
  props?: props
  src?: string;
  name?: string
}

export class sumsData {
  sums: Itemdata[] = []
}

export class props {
  name: string = "";
  src: string = ""
}