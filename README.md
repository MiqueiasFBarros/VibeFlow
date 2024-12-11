# VibeFlow

VibeFlow é um aplicativo de música desenvolvido com React Native e Expo, que permite aos usuários se autenticarem com o Spotify e acessar suas músicas, playlists e informações de perfil.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Componentes](#componentes)
- [Telas](#telas)
- [API do Spotify](#api-do-spotify)
- [Contexto do Player](#contexto-do-player)
- [Navegação](#navegação)
- [Configuração do Babel](#configuração-do-babel)
- [Configuração do Metro](#configuração-do-metro)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

1. **Clone o repositório:**
    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd vibeFlow
    ```

2. **Instale as dependências:**
    ```sh
    npm install
    ```

3. **Instale o Expo CLI globalmente (se ainda não estiver instalado):**
    ```sh
    npm install -g expo-cli
    ```

## Configuração

1. **Configuração do Spotify:**
   - Crie um aplicativo no [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   - Obtenha o `Client ID` e o `Client Secret`.
   - Configure o URI de redirecionamento para `exp://<YOUR_LOCAL_IP>:8081`.

2. **Configuração do arquivo `spotifyApi.js`:**
   - Atualize as constantes `CLIENT_ID`, `CLIENT_SECRET` e `MY_REDIRECT_URI` com os valores obtidos do Spotify Developer Dashboard.

## Uso

1. **Inicie o projeto:**
    ```sh
    expo start
    ```

2. **Execute no emulador ou dispositivo físico:**
   - Use o aplicativo Expo Go para escanear o QR code exibido no terminal ou navegador.

## Estrutura do Projeto

## Componentes

- **ArtistCard**: Componente para exibir informações de um artista.
- **PlayerControls**: Controles de reprodução de música.
- **RecentlyPlayedCard**: Componente para exibir músicas recentemente tocadas.
- **SongItem**: Componente para exibir informações de uma música.
- **FloatingPlayer**: Player flutuante para controle de música.

## Telas

- **HomeScreen**: Tela inicial do aplicativo.
- **LibraryScreen**: Tela da biblioteca de músicas.
- **LikedSongsScreen**: Tela de músicas curtidas.
- **LoginScreen**: Tela de login.
- **PlaylistInfoScreen**: Tela de informações da playlist.
- **SongInfoScreen**: Tela de informações da música.

## API do Spotify

A integração com a API do Spotify é feita no arquivo `spotifyApi.js`. Este arquivo contém funções para:

- Autenticar o usuário e obter tokens de acesso.
- Verificar a validade do token.
- Buscar músicas salvas, playlists, perfil do usuário, músicas recentemente tocadas, artistas principais e músicas de álbuns específicos.

## Contexto do Player

O contexto do player é gerenciado no arquivo `PlayerContext.js`. Este arquivo fornece um contexto React para gerenciar o estado do player de música em todo o aplicativo.

## Navegação

A navegação entre telas é configurada no arquivo `StackNavigator.js` usando a biblioteca `react-navigation`.

## Configuração do Babel

A configuração do Babel está no arquivo `babel.config.js`.

## Configuração do Metro

A configuração do Metro Bundler está no arquivo `metro.config.js`.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT.