import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFile (use-case)', () => {
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table-name',
  };

  afterEach(() => {
    // Clean up after each test
    const outputsFolderExists = fs.existsSync('outputs');
    if (outputsFolderExists) {
      fs.rmSync('outputs', { recursive: true, force: true });
    }

    const customOutputsFolderExists = fs.existsSync(
      customOptions.fileDestination.split('/')[0]
    );
    if (customOutputsFolderExists) {
      fs.rmSync(customOptions.fileDestination.split('/')[0], {
        recursive: true,
        force: true,
      });
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
});
