export class Codepoint {

  name: string;

  code: string;

  index: number;


  static fromJson(json: any): Codepoint {
    let cp: Codepoint = new Codepoint();
    cp.name = json.name;
    cp.code = json.codepoint;
    cp.index = parseInt(json.index);

    return cp;
  }
}
