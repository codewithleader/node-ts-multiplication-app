const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import('./args.plugin');
  return yarg;
};

describe('Tests in args.plugin.ts', () => {
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules(); // Resetear el módulo de node para cada prueba
  });

  test('should return default values', async () => {
    const argv = await runCommand(['-b', '5']);
    // console.log(argv);

    // Comprobar si el objeto `argv` contiene las propiedades que se necesitan
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs',
      })
    );
  });

  test('should return configuration with custom values', async () => {
    const argv = await runCommand([
      '-b',
      '8',
      '-l',
      '20',
      '-s',
      '-n',
      'custom-name',
      '-d',
      'custom-dir',
    ]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 8,
        l: 20,
        s: true,
        n: 'custom-name',
        d: 'custom-dir',
      })
    );
  });
});
