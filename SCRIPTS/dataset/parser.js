// import {v4 as uuidv4} from 'uuid';
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const MAX_TAM_TITULO = 200, MAX_TAM_CONTEUDO = 1000;
const blogDataName = "./in/blogdata.txt";
const authorDataName = "./in/authordata.txt";
const ratingDataName = "./in/ratingdata.txt";

const categoriasIdMap = new Map();
const eventosIdMap = new Map();
const usuariosIdMap = new Map();


function formatarLinhasArquivoBlogs(conteudo) {
        const linhas = conteudo.split('\n');

        // Remove as linhas que não seguem o padrão e concatena com a linha anterior
        for (let i = 1; i < linhas.length; i++) {
            if ( !(/^\d+,/.test(linhas[i]) )) {
                linhas[i - 1] += linhas[i];
                linhas.splice(i, 1);
                i--; // Reduz o índice para reavaliar a linha anterior
            }

        }

        // Remove linhas vazias
        linhas.forEach((linha, index) => {
            if (linha.trim() === '') {
                linhas.splice(index, 1);
            }
        });

        return linhas;
}

function processarLinhasArquivoBlogs(linhas){
    /*
    blog_id  , author_id, blog_title, blog_content, blog_link, blog_img, topic,   scrape_time
    number[0], number[1], "\text[2],  "\text[3],    text[4],   text[5],  text[6], text[7] 
    */
   let id,autorId, titulo, conteudo, link, img, categoria, criadoEm;
   const categoriasSet = new Set();

   //ignora cabeçalho
   linhas.splice(0,1);

   linhas.forEach((linha,index) => {
            let linhaSplited = linha.split("\"");

            //Sem nenhuma aspas em toda linha
            if(linhaSplited.length == 1){
                [id,autorId, titulo, conteudo, link, img, categoria, criadoEm] = linhaSplited[0].split(",");
            }
            else{
                let parteLinha = linhaSplited[0].split(",");
                let indiceConteudo;

                if(parteLinha.length == 4){//Título sem aspas
                    [id,autorId,titulo] = parteLinha;
                    indiceConteudo = 1;
                }else if(parteLinha.length == 3){//Título com aspas
                    [id,autorId] = parteLinha;
                    titulo = linhaSplited[1];
                    indiceConteudo = linhaSplited[2] == ","? 3 : 2;
                }else console.log("!!!\nCaso intratado parte 1\n!!!");

                linhaSplited.splice(0,indiceConteudo);

                if(linhaSplited.length == 1){//Conteudo sem aspas
                    [,conteudo, link,img, categoria, criadoEm] = linhaSplited[0].split(",");
                }else if(linhaSplited.length == 2){ //Conteudo com apenas aspas de delimitação
                    conteudo = linhaSplited[0];
                    [, link,img, categoria, criadoEm] =linhaSplited[1].split(",");
                }else{//Conteúdo com várias aspas
                    conteudo = "";
                    for(let i = 0; i<linhaSplited.length-1; i++)
                        conteudo += linhaSplited[i];
                    [, link,img, categoria, criadoEm] =linhaSplited[linhaSplited.length - 1].split(",");
                }
            }

            if(categoria)
                categoriasSet.add(categoria);

            titulo = titulo.replace(/\r/g, '');
            if(titulo.length > MAX_TAM_TITULO)
                titulo = titulo.slice(0,200);

            conteudo = conteudo.replace(/\r/g, '');
            if(conteudo.length > MAX_TAM_CONTEUDO)
                conteudo = conteudo.slice(0,1000);

            conteudo = conteudo.replace(/'/g, '');
            titulo = titulo.replace(/'/g, '');

            let novoId = uuidv4();
            eventosIdMap.set(id, novoId);
            //[linha, categoriaId, autorId]
            linhas[index] = [`('${novoId}',autorID,'${titulo}','${conteudo}','${link}','${img}',categoriaID,'${criadoEm.replace(/\r/g, '')}', 'PAF 1, Ondina', '2024-07-17 12:00:00','2024-07-20 12:00:00', false)`, categoria, autorId];
        }
   );
   return [categoriasSet, linhas];
}

function processarArquivoBlogs(){  
    try{
        console.log("\n\n-----------------------")
        console.log("---Arquivo Principal---")
        console.log("-----------------------\n")
        console.log("--> Abrindo arquivo " + blogDataName);
        let conteudo = fs.readFileSync(blogDataName, 'utf-8');
        console.log("--> Formantando linhas")
        let linhasFormatadas = formatarLinhasArquivoBlogs(conteudo); //array linhas
        console.log("--> Processando linhas")
        let [categorias, linhasProcessadas] = processarLinhasArquivoBlogs(linhasFormatadas); //set, array
        console.log("-------(" + categorias.size +  ") CATEGORIAS ENCONTRADAS----\n"); 
                
        //CATEGORIAS
        //Gera ids para as categorias
        let novoId, i = 0;
        conteudo = "INSERT INTO categoria (id,nome) VALUES \n";
        categorias.forEach((categoria) =>{
            novoId = uuidv4();
            categoriasIdMap.set(categoria,novoId);
            conteudo += `('${categoriasIdMap.get(categoria)}', '${categoria}')${i!=categorias.size-1?',\n':';'}`;
            i++
        });
            
        fs.writeFileSync("./out/categorias.txt", conteudo, 'utf-8');

        //id de autor qualquer, caso undefined
        // let randomAuthorId = usuariosIdMap.get(usuariosIdMap.keys().next().value);

        // eventos
        conteudo = "INSERT INTO evento (id,criador_id,titulo,descricao,link_mais_informacoes,imagem_url,categoria_id,created_at,localizacao,datainicial,datafinal,destaque) VALUES ";
        linhasProcessadas.forEach((linha,index) => {
            // conteudo += `${linha[0].replace(/categoriaID/g, `'${categoriasIdMap.get(linha[1])}'`).replace(/autorID/g, `'${usuariosIdMap.get(linha[2])? usuariosIdMap.get(linha[2]) : randomAuthorId}'`)}${index!=linhasProcessadas.length-1?',\n':';'}`;
            conteudo += `${linha[0].replace(/categoriaID/g, `'${categoriasIdMap.get(linha[1])}'`).replace(/autorID/g, `'${usuariosIdMap.get(linha[2])}'`)}${index!=linhasProcessadas.length-1?',\n':';'}`;
        })
        // Salva o conteúdo modificado de volta no arquivo
        fs.writeFileSync("./out/eventos.txt", conteudo, 'utf-8');
        
        console.log('Linhas processadas com sucesso.');
        console.log("------>Processamento encerrado<------")
    }catch(erro){
        console.error(`Erro na execução: ${erro.message}`);
    }
}

function processarArquivoAutores(){
    try{
        console.log("-----------------------")
        console.log("---Arquivo Autores---")
        console.log("-----------------------\n")
        console.log("--> Abrindo arquivo " + authorDataName);
        let conteudo = fs.readFileSync(authorDataName, 'utf-8');

        console.log("--> Processando linhas")
        let sql = "INSERT INTO usuario (id,primeiro_nome,segundo_nome,email,email_confirmado,senha,permissao,created_at) VALUES \n";
        const linhas = conteudo.split('\n');
        linhas.splice(0,1);

        let novoId,nomes;
        linhas.forEach((linha, index) => {
            linha = linha.replace(/\r/g, '');
            let linhaSplited = linha.split(",");
            if(linhaSplited.length > 2){
                linha = linha.replace(/,/g, '');
                linhaSplited = linha.split("\"");
            }
            novoId = uuidv4();
            usuariosIdMap.set(linhaSplited[0], novoId);
            nomes = linhaSplited[1].split(" ");
            //id,primeiroNome,segunNome, email,email_confirmado, senha,permissao,created_at
            sql += `('${novoId}','${nomes[0].replace(/'/g, '')}','${nomes.length>1? nomes[1].replace(/'/g, '') : ' '}','${nomes[0].replace(/'/g, '') + index}@email.com',true,'$2b$10$BToDBDLewIzu/ZwewCCdleB6PM8OUvGUlygWrtVOJ5Xvhw4ps6EH6','visitante','2023-05-10 22:29:22')${index!=linhas.length-1?',\n':';'}`
        });

        fs.writeFileSync("./out/usuarios.txt", sql, 'utf-8');
        console.log("------>Processamento encerrado<------")
    }catch(erro){
        console.error(`Erro na execução: ${erro.message}`);
    }
}

function processarArquivoAvaliacoes(){
    try{
        console.log("\n-----------------------")
        console.log("---Arquivo Avaliacoes---")
        console.log("-----------------------\n")
        console.log("--> Abrindo arquivo " + ratingDataName);
        let conteudo = fs.readFileSync(ratingDataName, 'utf-8');

        console.log("--> Processando linhas")
        let sql = "INSERT INTO avaliacao (id,nota,comentario,created_at,usuario_id,evento_id) VALUES \n";
        const linhas = conteudo.split('\n');
        linhas.splice(0,1);

        //id de evento  e autor qualquer, caso undefined
        // let randomAuthorId = usuariosIdMap.get(usuariosIdMap.keys().next().value);
        // let randomEventId = eventosIdMap.get(eventosIdMap.keys().next().value);

        linhas.forEach((linha, index) => {
            linha = linha.replace(/\r/g, '');
            let linhaSplited = linha.split(",");
            if(linhaSplited.length == 3){
                // sql += `('${uuidv4()}',${Math.round(Number(linhaSplited[2]))},' ','2023-05-10 22:29:22','${usuariosIdMap.get(linhaSplited[1])? usuariosIdMap.get(linhaSplited[1]) : randomAuthorId}','${eventosIdMap.get(linhaSplited[0])? eventosIdMap.get(linhaSplited[0]) : randomEventId}')${index!=linhas.length-1?',\n':';'}`
                sql += `('${uuidv4()}',${Math.round(Number(linhaSplited[2]))},' ','2023-05-10 22:29:22','${usuariosIdMap.get(linhaSplited[1])}','${eventosIdMap.get(linhaSplited[0])}')${index!=linhas.length-1?',\n':';'}`
            }
        });

        fs.writeFileSync("./out/avaliacoes.txt", sql, 'utf-8');
        console.log("------>Processamento encerrado<------")
    }catch(erro){
        console.error(`Erro na execução: ${erro.message}`);
    }
}

processarArquivoAutores();
processarArquivoBlogs();
processarArquivoAvaliacoes();