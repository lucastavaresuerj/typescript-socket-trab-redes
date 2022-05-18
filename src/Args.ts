type argsOptions = {
  [abrv: string]: {
    type?: "string" | "number";
    choice?: string[] | number[];
    alias?: string;
    default?: string | number;
  };
};

export default class Args {
  constructor(private options: argsOptions) {
    this.args = process.argv.slice(2).toString().replace(/,/gi, " ");
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

        let valueParse: string | number | null = null;

        if (value) {
          if (!this.options[abrv].type || this.options[abrv].type == "string") {
            valueParse = (value as string)
              .replace(/^('|")/, "")
              .replace(/('|")$/, "");
          } else if (this.options[abrv].type == "number") {
            valueParse = parseFloat(value as string);
          }
        }

        const result = { [abrv]: valueParse };
        const { alias } = this.options[abrv];

        if (alias !== undefined) {
          result[alias] = valueParse;
        }

        return { ...acc, ...result };
      },
      {}
    );
  }

  private findValue(keys: {
    abrv: keyof argsOptions;
    alias?: string;
  }): string | null {
    const regex = new RegExp(
      `(-${keys.abrv}${keys.alias ? `|--${keys.alias}` : ""})=(.+?)( +| *$)`
    );

    const match = this.args.match(regex);

    try {
      return match![2];
    } catch (error) {
      return null;
    }
  }
}
