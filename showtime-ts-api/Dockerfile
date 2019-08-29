# Baixando a imagem do node
FROM node:10.16-alpine

# Criando uma node_modules e fazendo o usuário node dono delas
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Setando o diretório do app
WORKDIR /home/node/app

# Copiando os package*.json para dentro da imagem
COPY package*.json ./

# Garantindo que todos os arquivos da aplicação pertencem ao usuário node
USER node

# Instalando as dependências
RUN npm install

# Copiando o código para dentro do container garantindo que o usuário node será dono dos arquivos
COPY --chown=node:node . .

# Expondo a porta usada pelo servidor
EXPOSE 5555
EXPOSE 3333

# Comando que roda a aplicação
CMD [ "npm", "start" ]