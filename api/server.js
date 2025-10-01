// SUNUCUYU BU DOSYAYA KURUN
const express = require('express')
const cors = require('cors')
const server = express();

const Users = require('./users/model');

// Middleware
server.use(express.json());
// Add CORS
server.use(cors())

server.get('/', (req, res) => {
  res.send('Merhaba, Express API ayakta!');
});

server.post('/api/users', (req, res) => {
  if(!req.body.name || !req.body.bio) {
    return res.status(400).send({ message: 'Lütfen kullanıcı için bir name ve bio sağlayın' });
  }
  const newUser = Users.insert(req.body);
  newUser.then(user => {
    res.status(201).send(user);
  })
  .catch(err => {
    res.status(500).send({message: "Veritabanına kaydedilirken bir hata oluştu" });
  });
});

server.get('/api/users', (req, res) => {
  try  {
    Users.find().then(users => {
    res.send(users);
  });
  } catch (err) {
    res.status(500).send({message: "Kullanıcı bilgileri alınamadı"  });
  }
});

server.get('/api/users/:id', (req, res) => {
  try  {
    Users.findById(req.params.id).then(user => {
    if(!user) {
      return res.status(404).send({message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
    res.send(user);
  });
  } catch (err) {
    res.status(500).send({message: "Kullanıcı bilgisi alınamadı"  });
  }
});

server.delete('/api/users/:id', (req, res) => {
  try  {
    Users.remove(req.params.id).then(user => {
    if(!user) {
      return res.status(404).send({message: "Belirtilen ID li kullanıcı bulunamadı" });
    }
    res.send(user);
  });
  } catch (err) {
    res.status(500).send({message: "Kullanıcı silinemedi"  });
  }
});

server.put('/api/users/:id', (req, res) => {
  try  {
    if(!req.body.name || !req.body.bio) {
        return res.status(400).send({ message: 'Lütfen kullanıcı için bir name ve bio sağlayın' });
    }
    Users.update(req.params.id, req.body).then(user => {
    if(!user) {
      return res.status(404).send({message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
    res.send(user);
  });
  } catch (err) {
    res.status(500).send({message: "Kullanıcı bilgileri güncellenemedi"  });
  }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}
