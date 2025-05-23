# 🏗️ Mark-Json

**Mark-Json** é uma ferramenta que converte arquivos **Markdown** em um formato **JSON estruturado**, preservando títulos, parágrafos, listas ordenadas e não ordenadas.  
Funciona tanto como uma **biblioteca Node.js** quanto como uma ferramenta **CLI (linha de comando)**.

---

## 🚀 Instalação

### 📦 Como usar localmente (sem publicar no npm):

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/mark-json.git
cd mark-json
```

2. Instale as dependências:

```bash
npm install
```

3. Link para usar o CLI localmente:

```bash
npm link
```

---

## 🖥️ Uso via CLI

```bash
mark-json <arquivo_entrada.md> <arquivo_saida.json>
```

### ✅ Exemplo:

```bash
mark-json exemplo.md resultado.json
```

---

## 🔧 Uso como módulo Node.js

### 🛠️ Instalação (local):

```bash
npm install ./caminho/para/mark-json
```

Ou (se estiver publicado no npm):

```bash
npm install mark-json
```

### 📜 Código exemplo:

```javascript
const { convertMarkdownToJson } = require('mark-json');
const fs = require('fs');

const markdown = fs.readFileSync('exemplo.md', 'utf-8');
const json = convertMarkdownToJson(markdown);

console.log(JSON.stringify(json, null, 2));
```

---

## 📑 Estrutura de saída JSON

Exemplo de Markdown:

```markdown
# Título Principal

Este é um parágrafo.

- Item 1
- Item 2

1. Primeiro
2. Segundo
```

Gera:

```json
[
  { "type": "h1", "content": "Título Principal" },
  { "type": "p", "content": "Este é um parágrafo." },
  { "type": "ul", "items": ["Item 1", "Item 2"] },
  { "type": "ol", "items": ["Primeiro", "Segundo"] }
]
```

---

## 🏗️ Desenvolvimento

### 🚀 Scripts disponíveis:

```bash
npm install   # Instalar dependências
npm link      # Linkar globalmente para usar o CLI local
npm run test  # (Futuro) Executar testes
```

---

## 🐛 Relatar problemas

Abra uma issue em:  
https://github.com/seu-usuario/mark-json/issues

---

## 📜 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.