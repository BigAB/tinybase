import 'expect-puppeteer';
import {ElementHandle} from 'puppeteer';
import {Server} from 'http';
import {createServer} from 'http-server';

export const getServerFunctions = (
  port: number,
): [() => void, () => void, (path: string) => Promise<void>] => {
  const ADDRESS = '0.0.0.0';
  const DOMAIN = `http://${ADDRESS}:${port}`;

  let server: Server;

  const startServer = () => {
    server = createServer({
      root: 'docs',
      cache: -1,
      gzip: true,
    });
    server.listen(port, ADDRESS);
  };

  const stopServer = () => {
    server.close();
  };

  const expectPage = async (path: string): Promise<void> => {
    await page.goto(`${DOMAIN}${path}`);
  };

  return [startServer, stopServer, expectPage];
};

export const expectedFramedElement = async (
  selector: string,
  text?: string | RegExp,
  timeout = 2000,
): Promise<ElementHandle> =>
  (await expect(
    await (await expectedElement('iframe')).contentFrame(),
  ).toMatchElement(selector, {
    text,
    timeout,
  })) as any;

export const expectedElement = async (
  selector: string,
  text?: string | RegExp,
  timeout = 2000,
): Promise<ElementHandle> =>
  (await expect(page).toMatchElement(selector, {text, timeout})) as any;

export const expectProperty = async (
  element: ElementHandle,
  property: string,
  value: string,
): Promise<void> =>
  expect(await (await element.getProperty(property))?.jsonValue()).toEqual(
    value,
  );

export const expectNoFramedElement = async (
  selector: string,
  text?: string | RegExp,
  timeout = 2000,
): Promise<void> => {
  await expect(
    await (await expectedElement('iframe')).contentFrame(),
  ).not.toMatchElement(selector, {text, timeout});
};
