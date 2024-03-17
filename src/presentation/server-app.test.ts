import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';
import { rimraf } from 'rimraf';
import fs from 'fs';

describe('Tests in server-app.ts', () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: 'test-destination',
    fileName: 'test-filename',
  };

  afterAll(() => {
    if (fs.existsSync(options.fileDestination)) {
      rimraf(options.fileDestination);
    }
  });

  test('should create ServerApp instance', () => {
    // Arrange

    // Act
    const serverApp = new ServerApp();

    // Assert
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function'); // Comprueba que el metodo run es static
  });

  test('should run ServerApp with options', () => {
    // Arrange
    const logSpy = jest.spyOn(console, 'log'); // Si no colocamos el "mockImplementation" estaremos escuchando los logs
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute'); // El prototype es el que tiene el ADN de la clase CreateTable y allí es donde está el metodo "execute"
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute'); // El prototype es el que tiene el ADN de la clase SaveFile y allí es donde está el metodo "execute"

    // Act
    ServerApp.run(options);

    // Assert
    // expect(logSpy).toHaveBeenCalledTimes(2); // Comentado porque si showTable es true se llamaría 3 veces
    expect(logSpy).toHaveBeenCalledWith('Server running...');
    expect(logSpy).toHaveBeenLastCalledWith('File created!');

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });

  test('should run with custom values mocked', () => {
    // Arrange
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createTableMock = jest.fn().mockReturnValue('1 x 2 = 2');
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createTableMock;
    SaveFile.prototype.execute = saveFileMock;

    // Act
    ServerApp.run(options);

    // Assert
    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(createTableMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: '1 x 2 = 2',
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
    expect(logMock).toHaveBeenCalledWith('File created!');
    expect(logErrorMock).not.toHaveBeenCalled(); // No se llamó a la función de error
  });
});
