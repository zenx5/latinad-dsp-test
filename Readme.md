# Bitacora de la prueba

## Dia 1
- Paseo por la web de [LatinAd](latinad.com) para tomar ideas y conocer el producto.
- Primeros diseños en Figma de la aplicación, versiones para desktop y movil.
  ![image](https://github.com/user-attachments/assets/8c28ae9f-02fa-46a9-a70a-9995f0f8e0cb)
- Preparación del proyecto y revisión del stack.

## Dia 2
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

## Dia 3
- Ajustes de estilos para el layout
  - Configuración de la altura del **main** combinando los **breakpoints de tailwindcss** y **calc de css**.
    - Altura de main con footer: `'with-footer': 'calc(100vh - 9.5rem)'`.
    - Altura de main sin footer: `'without-footer': 'calc(100vh - 4.5rem)'`.
