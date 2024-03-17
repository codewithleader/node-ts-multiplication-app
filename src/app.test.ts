import { ServerApp } from './presentation/server-app';
describe('Test app.ts', () => {
  test('should call Server.run with values', async () => {
    // Arrange
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      'node',
      'app.ts',
      '-b',
      '10',
      '-l',
      '5',
      '-s',
      '-n',
      'test-file',
      '-d',
      'test-destination',
    ];

    // Act
    await import('./app');

    // Assert
    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 5,
      showTable: true,
      fileName: 'test-file',
      fileDestination: 'test-destination',
    });
  });
});
