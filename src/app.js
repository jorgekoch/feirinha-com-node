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
    res.send(feirinha);
});

app.get('/feirinha/:id', (req, res) => {
    const id = req.params.id;
    const item = feirinha.find(item => {
        return item.id == Number(id)
    });
    res.send(item);
})

app.post('/feirinha', (req, res) => {
    console.log(req.body);
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

