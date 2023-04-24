# API Labecomerce Back-end <br>
### Esta é uma API simples para gerenciamento de usuários e produtos construída com o framework Express.js. 
<h3>- A API fornece os seguintes endpoints para acesso aos recursos:<h3>
<br>
<h2>Endpoints</h2>
<h3>Usuários</h3>
<ul>
<li><b>GET /users:</b> Retorna todos os usuários cadastrados na base de dados.</li><br>
<li><b>POST /users:</b> Cria um novo usuário na base de dados.</li><br>
</ul>
<h3>Produtos</h3>
<ul>
<li><b>GET /products:</b> Retorna todos os produtos cadastrados na base de dados.</li><br>
<li><b>GET /products/search:</b> Retorna os produtos cujos nomes contenham uma determinada string fornecida como query parameter.</li><br>
<li><b>POST /products:</b> Cria um novo produto na base de dados.</li><br>
<li><b>PUT products/:id</b> Edita um produto com base no id inserido.</li><br>
</ul><br>
<h3>Purchases</h3>
<ul>
<li><b>POST /purchases:</b> Cria uma compra nova na base</li><br>
<li><b>DEL /purchases/:id :</b> Deleta uma compra na base, através do id.</li><br>
<li><b>GET /purchases/:id :</b> Retorna uma compra, através do id.</li><br>
<li><b>GET /purchases/:id :</b> Retorna todas as compras.</li><br>
</ul>
<h2>Instruções para uso</h2>
<h3>Para executar a aplicação, é necessário ter o Node.js e o npm instalados. Em seguida, siga as instruções abaixo:</h3><br>
<ol>
<li>Clone este repositório.</li><br>
<li>Instale as dependências do projeto rodando o comando npm install.</li><br>
<li>Crie um arquivo .env na raiz do projeto com as credenciais de acesso ao banco de dados. Exemplo:</li><br>
<li>Crie a estrutura do banco de dados no database.db.</li><br>
<li>Inicie o servidor rodando o comando npm run dev. O servidor será iniciado na porta 3003 por padrão.</li><br>
<h3>Tecnologias utilizadas</h3><br>
<ul>
<li>Express.js</li><br>
<li>Knex.js</li><br>
<li>MySQL</li><br>
<li>cors</li><br>
</ul>

<h2>Autor</h2>
API desenvolvida por <b>Arthur Prado.</b>

<h1>Documentação</h1>
<a href="https://documenter.getpostman.com/view/24823187/2s93RNyuZK"><b>Labecomerce</b></a>
