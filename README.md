# Node-ts-multiplication-app

Instrucciones para correr y ejecutar nuestro programa


1. Instalar dep

````
npm install
```

2. Correr

```
npm run dev
```


# Testing

El patrón Arrange, Act, Assert (AAA) es una metodología común para escribir pruebas en el desarrollo de software, y Jest, un marco de pruebas en JavaScript, lo adopta para mejorar la estructura y claridad de las pruebas. Aquí te explico brevemente cada paso:

- Arrange (Organizar): En esta fase, preparas el entorno de la prueba. Esto implica configurar los datos, inicializar objetos, configurar mocks y stubs, y todo lo necesario antes de ejecutar la parte del código que deseas probar. Es la etapa donde "organizas" todo para llevar a cabo la prueba.

- Act (Actuar): Aquí ejecutas la funcionalidad que deseas probar. Esta es la fase donde invocas el método o función con los parámetros necesarios y capturas su salida para verificarla posteriormente. Es el momento donde "actúas", provocando la lógica de negocio o la funcionalidad que estás poniendo a prueba.

- Assert (Afirmar): En la última fase, verificas que el código actuó como esperabas. Usas aserciones para comparar el resultado actual con el esperado. Si la aserción falla, la prueba falla, indicando que hay un problema en el código. Es la fase donde "afirmas" si el comportamiento del código fue el correcto o no.

Este enfoque estructurado ayuda a mantener las pruebas claras y enfocadas en un objetivo específico, facilitando su mantenimiento y comprensión.

```typescript
describe('Test in app.ts', () => {
  it('sum', () => {
    // 1. Arrange: Organizar
    const num1 = 2; // la data puede venir de un mock
    const num2 = 3;

    // 2. Act: Actuar
    const result = num1 + num2;

    // 3. Assert: Afirmar
    expect(result).toBe(5);
  });
});
```

## Generar data aleatoria con FAKER
Doc: [https://fakerjs.dev/guide/](https://fakerjs.dev/guide/)

```bash
npm install --save-dev @faker-js/faker
```
