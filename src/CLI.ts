type argsOptions = {
  [abrv: string]: {
    type?: string | number;
    choice?: string[] | number[];
    alias?: string;
    default?: string | number;
  };
};

export default class CLI {
  constructor(private options: argsOptions) {
    this.args = process.argv.slice(2).toString().replace(",", " ");

    console.log(process.argv);
  }

  args: string;

  get argv() {
    return Object.keys(this.options).reduce(
      (
        acc: { [key: string]: string | number | null },
        abrv: keyof argsOptions
      ) => {
        const value = this.findValue({
          abrv,
          alias: this.options[abrv]?.alias,
        });
        const result = { [abrv]: value };
        const { alias } = this.options[abrv];

        if (alias !== undefined) {
          result[alias] = value;
        }

        return { ...acc, ...result };
      },
      {}
    );
  }

  private findValue(keys: {
    abrv: keyof argsOptions;
    alias?: string;
  }): string | number | null {
    const regex = new RegExp(
      `(-${keys.abrv}${keys.alias ? `|--${keys.alias}` : ""})=(.+)`
    );

    const match = this.args.match(regex);

    console.log(match);

    try {
      return match![2];
    } catch (error) {
      return null;
    }
  }
}
