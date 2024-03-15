import fs from 'fs';
import { rimraf } from 'rimraf';
import { SaveFile } from './save-file.use-case';

describe('SaveFile (use-case)', () => {
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table-name',
  };

  afterAll(() => {
    // Clean up after each test
    const customOutputsBaseDir = customOptions.fileDestination.split('/')[0];
    const outputsFolderExists = fs.existsSync('outputs');
    if (outputsFolderExists) {
      rimraf(`outputs`); // rimraf soluciona el problema de permisos para eliminar directorios
      // fs.rmSync(`outputs`, { recursive: true, force: true });
    }

    const customOutputsFolderExists = fs.existsSync(customOutputsBaseDir);
    if (customOutputsFolderExists) {
      rimraf(customOutputsBaseDir); // rimraf soluciona el problema de permisos para eliminar directorios
      // fs.rmSync(`${customOutputsBaseDir}`, {
      //   recursive: true,
      //   force: true,
      // });
    }
  });

  test('should save file with default values', () => {
    // Arrange: Preparar
    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content',
    };

    // Act: Actuar, estímulos
    const result: boolean = saveFile.execute(options);
    const fileExists: boolean = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Assert: Afirmar, Aserciones
    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test('should save file with custom values', () => {
    // Arrange: Preparar
    const saveFile = new SaveFile();
    const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    // Act: Actuar, estímulos
    const result: boolean = saveFile.execute(customOptions);
    const fileExists: boolean = fs.existsSync(customOptions.fileDestination);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Assert: Afirmar, Aserciones
    expect(result).toBeTruthy();
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Could not create directory (test file)');
    });
    const result = saveFile.execute(customOptions);
    expect(result).toBeFalsy();

    mkdirSyncSpy.mockRestore();
  });

  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile();
    const writeFileSyncSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {
        throw new Error('This is a custom writing error message (test file)');
      });
    const result = saveFile.execute({ fileContent: 'Hello' });
    expect(result).toBeFalsy();

    writeFileSyncSpy.mockRestore(); // Restaura el comportamiento original de fs.writeFileSync() después de la prueba.
  });
});
