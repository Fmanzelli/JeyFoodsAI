# Jey Foods - E-Commerce Showcase (Frontend)

<p align="center">
  <img src="assets/logosemfundo_jeyFoods.png" alt="Jey Foods Logo" width="150" />
</p>

## Descrição do Projeto

Este repositório contém o código-fonte front-end do site institucional e catálogo de produtos da **Jey Foods**, uma confeitaria e cozinha artesanal especializada em empadões, cookies e kits para toda a família (B2C) e opções de atacado para distribuidores (B2B).

O projeto foi desenvolvido com uma arquitetura **Vanilla (HTML5, CSS3, e JS Puro)**, com foco absoluto em uma experiência de usuário (UX) premium, alta conversão, responsividade móvel (Mobile-First) e velocidade de carregamento, dispensando o uso de bibliotecas ou frameworks pesados. 

## Tecnologias Utilizadas

- **HTML5:** Estruturamento semântico (`<main>`, `<section>`, `<article>`).
- **CSS3:** Estilização pura focada em performance. 
  - Uso de CSS Variables (`:root`) para temas unificados.
  - Layouts modernos via `Flexbox` e `CSS Grid`.
  - Design visual "Premium" com efeitos de *Glassmorphism* e animações de transição suaves via `@keyframes`.
  - Responsividade nativa com Media Queries (`@media`).
- **JavaScript (ES6+):** Lógica funcional da interface construída de forma modular.
  - *Intersection Observer API* para animações acionadas por scroll (`.fade-in`) e rastreamento da seção ativa na Navbar.
  - Lógica matemática customizada para o funcionamento fluído do sistema de *Carousel* interativo, suportando *Drag & Drop* (Mouse) e toques (Mobile/Touch).
- **Node.js:** Pequenos scripts utilitários focados na otimização de build em tempo de desenvolvimento. 

## Estrutura do Repositório

```text
/
├── assets/                  # Imagens, logotipos, favicon e mídias
├── css/
│   └── style.css            # Arquivo principal e único de estilos globais
├── js/
│   └── script.js            # Arquivo principal de manipulação de DOM e Eventos
├── index.html               # Página Inicial (Landing Page + Institucional)
├── cardapio.html            # Página de Catálogo e Cardápio (Combos, Salgados, Doces)
├── revendedores.html        # Página B2B focada em conversão para atacadistas
├── optimize.js              # Script auxiliar (Node.js) para inserção de lazy-loading
├── fix_index2.js            # Utilitário (Node.js) de encoding utf-8 e build SEO
└── README.md                # Descrição técnica do projeto
```

## Destaques Técnicos

1. **Arquitetura SEO-Ready:**
   - Foram integradas **Meta Tags Sociais (Open Graph)** em todas as páginas para renderização correta de cards em envios do WhatsApp e redes sociais.
   - Utilização intensiva de **Schema Markup (JSON-LD)** (`@type: "Bakery", "WholesaleStore", "Menu"`) para os robôs do Google puxarem os Rich Snippets e estruturarem o menu nas pesquisas.

2. **Performance (Core Web Vitals):**
   - Omitimos carrosséis em bibliotecas gigantes como Slick ou Swiper e, em vez disso, criamos a estrutura puramente manipulando `transform: translate` pelo JS para garantir um bundle KB de JS de baixíssimo impacto (zero peso adicional ao DOM).
   - Inserção autônoma do atributo `loading="lazy"` para as imagens que exigem rolagem com o script `optimize.js`.

3. **Integração Flúida com WhatsApp:**
   - Link dinâmico associado aos botões para disparo da conversão (via chamador do WhatsApp Web ou Mobile).
   - Botão flutuante perene acompanhando o usuário em todos os breakpoints.

4. **Scripts de Auxílio / Otimização (Node.js Automático):**
   - Na raiz encontram-se pequenos manipuladores (ex: `optimize.js`). Ao rodá-los (`node optimize.js`), ele injeta os scripts vitais (Google Fonts, Favicons ausentes, e marcações de Lazy Loading) nos arquivos HTML em tempo de compilação sem precisar refatorar na mão.

## Como Executar Localmente

Sendo um projeto estático puramente Front-end e não precisando de Node.js Module bundlers como Webpack/Vite para visualização:

1. Clone o repositório.
2. Inicie um servidor local simples usando a extensão **Live Server** (no VS Code) navegando pelo arquivo `index.html`.
3. *(Opcional)* Se você possui Python instalado, vá ao diretório e rode localmente usando \`python -m http.server 8000\`.
4. Edições lógicas estarão localizadas no `/js/script.js` e em `/css/style.css`.
<img width="1900" height="877" alt="Captura de tela 2026-04-15 092441" src="https://github.com/user-attachments/assets/a2bd22c0-5c97-4878-840c-5eaaa6fb3b46" />
