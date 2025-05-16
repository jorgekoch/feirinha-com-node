import express, {json} from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const feirinha = [
    {
        id: 1,
        name: "Laranja",
        quantity: 5,
        type: "fruta"
    }
];

app.get('/feirinha', (req, res) => {
    const { name, quantity, type } = req.query;

    const itemComFiltro = feirinha.filter(item => {
        return (!name || item.name === name) &&
               (!quantity || item.quantity >= Number(quantity)) &&
               (!type || item.type === type); 
    });

    res.send(itemComFiltro);
});

app.get('/feirinha/:id', (req, res) => {
    const id = req.params.id;
    const item = feirinha.find(unidade => {
        return unidade.id == Number(id)
    });
    if (id <= 0) {
        return res.status(400).send({error: "Produto não encontrado!"});
    }
    if (id > feirinha.length) {
        return res.status(404).send({error: "Produto não encontrado!"});
    }
    res.send(item);
})

app.post('/feirinha', (req, res) => {
    const {name, quantity, type} = req.body;
    if (!name || !quantity || !type) {
       return res.status(422).send({error: "Preencha todos os campos!"});   
    }
    if (feirinha.some(item => item.name === name)) {
       return res.status(409).send({error: "Produto já existe!"});      
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(422).send({error: "Quantidade inválida!"});
    }
    if (type !== 'fruta' && type !== 'verdura') {
        return res.status(422).send({error: "Tipo inválido!"});
    }

    const newItem = {
        id: feirinha.length + 1,
        name,
        quantity,
        type
    };
    feirinha.push(newItem);
    res.status(201).send(newItem);
});

app.listen(5000);

