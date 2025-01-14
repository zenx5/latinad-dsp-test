# Instrucciones
1. Entrar a la carpeta app-latinad
2. Ejcutar `npm install`
3. Ejecutar `npm run dev`

# Bitacora de la prueba

## Día 1
- Paseo por la web de [LatinAd](latinad.com) para tomar ideas y conocer el producto.
- Primeros diseños en Figma de la aplicación, versiones para desktop y movil.
  ![image](https://github.com/user-attachments/assets/8c28ae9f-02fa-46a9-a70a-9995f0f8e0cb)
- Preparación del proyecto y revisión del stack.

## Día 2
- Inicia maquetación de la vista principal
- Creación del Layout principal
  - Header
    - Logo responsive separandolo en dos SVG
      - ![image](https://github.com/user-attachments/assets/1e7fa7c3-4038-41f6-ba70-f1372762662b)
      - ![image](https://github.com/user-attachments/assets/b47fc03f-21c0-4ebc-8416-64a783f8f4ed)
    - Botón para cambiar idioma.
- Configuración de i18n
  - Lenguajes: Español e Ingles.
  - Implementación del cambio de idioma.

## Día 3
- Ajustes de estilos para el layout
  - Configuración de la altura del **main** combinando los **breakpoints de tailwindcss** y **calc de css**.
    - Altura de main con footer: `'with-footer': 'calc(100vh - 9.5rem)'`.
    - Altura de main sin footer: `'without-footer': 'calc(100vh - 4.5rem)'`.

## Día 4
- Implementación de geolocalización con **@react-google-maps/api**.
  - Mapa para renderizar las ubicaciones.
  - Componente de busqueda de locación combinando **Autocomplete** con **Input de antd**.
- Creación del formulario.

## Día 5
- Primera propuesta para el estado de la vista principal.
  - El estado general de la vista fue dividido en 4 estados menores: `query`, `center`, `isWelcomeView`, `items`.
    - `query` se maneja a través de un **reducer** por ser un poco mas complejo.
    - `center` se usar para fijar el foco del mapa, siendo su valor inicial nuestra ubicación.
    - `isWelcomeView` para transicionar entre la vista de bienvenida y la vista del mapa.
    - `items` para guardar las locaciones.
  - Se define a **Main** como el dueño del estado en esta primera iteración.
 
## Día 6
- Se trabajó en el responsive.
- Se implementó la geolocalización para centrar el mapa.
- Se detectó un problema al consultar la API proporcionada por lo que se implemento una API que retornara un objeto similar al esperado desde la original.
  - **El problema de la API** estaba relacionado con la autenticación del Token. <img src="https://img.shields.io/badge/-Error-red?style=plastic"/>
- Se creo un SVG en **Figma** para el elemento Marker del mapa.
  - **Path:** `M1.5 0.5H46.5V25H29.5V28H40.5V31.5H11.5V28H24.5V25H4.5V4.5L1.5 0.5Z`.

