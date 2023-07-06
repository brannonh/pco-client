import { HTTPAlias } from 'got';
import { keys, replace } from 'lodash-es';

export type PathFactoryFunction = (data: Record<string, string>) => {
  method: HTTPAlias;
  path: string;
};

export function pathFactoryProvider(
  method: HTTPAlias,
  pathTemplate: string
): PathFactoryFunction {
  return (data: Record<string, string>) => {
    let path = pathTemplate;
    const subs = keys(data);
    for (const sub of subs) {
      const regex = new RegExp(`{{\\s*${sub}\\s*}}`, 'ig');
      path = replace(path, regex, data[sub]);
    }
    return { method, path };
  };
}
