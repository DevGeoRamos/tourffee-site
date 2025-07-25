# Tourffee - Site (versão 2)

## 🎯 Sobre

Esta versão do site Tourffee mantém a identidade visual original enquanto implementa as melhores práticas modernas de desenvolvimento web, melhorando significativamente a estrutura, performance, acessibilidade e manutenibilidade do código.

## 🏗️ Nova Estrutura de Arquivos

```
projeto/
├── assets/
│   ├── css/
│   │   ├── variables.css      # Variáveis CSS (Design System)
│   │   ├── base.css          # Reset e estilos base
│   │   ├── layout.css        # Sistema de layout e grid
│   │   ├── header.css        # Componente header
│   │   ├── footer.css        # Componente footer
│   │   ├── buttons.css       # Componentes de botão
│   │   ├── homepage.css      # Estilos da página inicial
│   │   ├── quiz.css          # Estilos do quiz
│   │   ├── cafeterias.css    # Estilos das cafeterias
│   │   └── main.css          # Arquivo principal (imports)
│   ├── js/
│   │   ├── utils.js          # Utilitários gerais
│   │   ├── quiz.js           # Lógica do quiz
│   │   └── cafeterias.js     # Lógica das cafeterias
│   └── images/               # Imagens organizadas
├── pages/
│   ├── quiz.html            # Página do quiz 
│   ├── cafeterias.html      # Página de cafeterias 
│   └── cafeterias/          # Páginas individuais das cafeterias
├── index-new.html           # Página inicial

```

## ✨ Principais Melhorias

### 🎨 Design System
- **Variáveis CSS**: Sistema unificado de cores, tipografia, espaçamentos e outras propriedades
- **Componentes reutilizáveis**: Header, footer, botões, cards com estilos consistentes
- **Grid system responsivo**: Layout flexível e adaptável

### 🚀 Performance
- **CSS otimizado**: Modularização e organização hierárquica
- **Lazy loading**: Carregamento sob demanda de imagens
- **Código minificado**: Redução do tamanho dos arquivos
- **Preload de recursos críticos**: Carregamento prioritário de elementos importantes

### ♿ Acessibilidade
- **ARIA labels**: Melhor suporte para leitores de tela
- **Navegação por teclado**: Foco e skip links implementados
- **Contraste adequado**: Cores que atendem às diretrizes WCAG
- **Semântica HTML5**: Uso correto de elementos semânticos
- **Live regions**: Anúncios dinâmicos para tecnologias assistivas

### 📱 Responsividade
- **Mobile-first**: Design pensado primeiro para dispositivos móveis
- **Breakpoints consistentes**: Sistema de media queries padronizado
- **Imagens adaptáveis**: Responsive images com diferentes tamanhos
- **Typography fluida**: Textos que se adaptam ao tamanho da tela

### 🧹 Qualidade do Código
- **JavaScript modular**: Classes ES6 e organização em módulos
- **Tratamento de erros**: Error handling robusto
- **Comentários informativos**: Documentação inline do código
- **Padrões consistentes**: Nomenclatura e estrutura padronizadas

## 🔧 Recursos Implementados

### Homepage (`index-new.html`)
- ✅ Hero section com animações suaves
- ✅ Grid de categorias responsivo
- ✅ Mapa interativo integrado
- ✅ Seção "Cafeteria do Mês" destacada
- ✅ About section com layout flexível
- ✅ Animações on-scroll

### Quiz (`pages/quiz.html`)
- ✅ Interface moderna e intuitiva
- ✅ Barra de progresso visual
- ✅ Feedback imediato das respostas
- ✅ Sistema de pontuação aprimorado
- ✅ Animações e transições suaves
- ✅ Suporte completo para acessibilidade

### Cafeterias (`pages/cafeterias.html`)
- ✅ Sistema de busca em tempo real
- ✅ Filtros por categoria
- ✅ Cards informativos com avaliações
- ✅ Sistema de favoritos (localStorage)
- ✅ Estados de loading e empty
- ✅ Layout em grid responsivo

### JavaScript 
- ✅ **QuizApp**: Classe completa para gerenciamento do quiz
- ✅ **CafeteriasApp**: Sistema de busca, filtros e favoritos
- ✅ **TourffeeUtils**: Utilitários para smooth scrolling, lazy loading, e acessibilidade
- ✅ **Error handling**: Tratamento robusto de erros
- ✅ **Performance**: Debounce, throttle e otimizações

### CSS Modular
- ✅ **variables.css**: Design system completo
- ✅ **base.css**: Reset e estilos fundamentais
- ✅ **layout.css**: Sistema de grid e utilitários
- ✅ **Componentes**: Header, footer, botões isolados
- ✅ **Páginas**: Estilos específicos organizados

## 🎯 Identidade Visual Preservada

### Cores Mantidas
- **Primária**: `#3A1C06` (marrom café)
- **Secundária**: `#F7EDD1` (bege claro)
- **Accent**: `#f4d48e` (dourado suave)
- **Background**: `#f7edd17a` (bege translúcido)

### Tipografia
- **Headings**: "clicker-compressed" (mantida)
- **Elegant**: "gloock" (mantida)
- **Body**: Trebuchet MS família (mantida)
- **Modern**: Poppins (adicionada para quiz)

### Elementos Visuais
- ✅ Logo e favicon originais
- ✅ Paleta de cores idêntica
- ✅ Estilo dos botões preservado
- ✅ Layout geral mantido
- ✅ Imagens e conteúdo originais

### Manutenibilidade
- 🔧 **Código organizado** em módulos lógicos
- 🔧 **Variáveis centralizadas** para mudanças rápidas
- 🔧 **Comentários detalhados** para facilitar manutenção

### Experiência do Usuário
- 😊 **Interface mais fluida** com animações suaves
- 😊 **Melhor acessibilidade** para todos os usuários
- 😊 **Responsividade aprimorada** em todos os dispositivos

### SEO
- 🔍 **Meta tags otimizadas** para melhor indexação
- 🔍 **Semântica HTML5** adequada
- 🔍 **Performance melhorada** afeta ranking

## 🆘 Suporte e Manutenção

### Adicionando Nova Cafeteria
1. Edite `assets/js/cafeterias.js`
2. Adicione objeto no array `fetchCafeteriasData()`
3. Crie página individual em `pages/cafeterias/`

### Modificando Cores
1. Edite `assets/css/variables.css`
2. Altere as variáveis CSS conforme necessário
3. Mudanças se propagam automaticamente

### Adicionando Pergunta ao Quiz
1. Edite `assets/js/quiz.js`
2. Adicione objeto no array `questions`
3. Siga o padrão existente

---

**Tourffee** - Seu próximo café favorito te espera! ☕
