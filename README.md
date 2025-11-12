# AOP2 App

Projeto React Native (Expo) da AOP2 da disciplina Programação para Dispositivos Móveis

## Tecnologias
- Expo
- React Navigation (Drawer + Stack)
- styled-components com tema global
- @expo/vector-icons

## Rodando o projeto

1. Instale dependências (já instaladas aqui). Se necessário:
   - `npm install --legacy-peer-deps`

2. Inicie o servidor Expo:
   - `npx expo start`
   - ou `npm run web` para abrir no navegador

3. Abra no Expo Go (Android/iOS) ou no navegador pelo QR/URL.

## Estrutura
- `src/components`: Button, Input, Header, SuccessMessage, MenuDrawer
- `src/screens`: Login, Cadastro, CadastroSuccess, NovaSenha, SenhaAlterada, Cardapio, Pedido, Acompanhar, Promocoes
- `src/navigation`: RootNavigator com Stack (auth) e Drawer (app)
- `src/data`: mocks de categorias do Cardápio
- `src/theme.ts`: tema global (laranja #FF6A00, texto #333, fundo branco)

## Fluxo
- O app inicia em `Login`
- Botões navegam entre as telas conforme layout
- Após "Entrar", o usuário acessa o Drawer com Cardápio/Pedido/Acompanhar/Promoções
