export interface ResolverMap {
  [key: string]: {
    [key: string]: (parant: any, args: any, context: {}, info: any) => any;
  };
}
