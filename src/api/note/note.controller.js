
let NoteModel = require('./note.model')

export function add(req, res) {
    console.log(req.body);
    const formData = req.body.formData;
    if (formData) {
          let note = new NoteModel({
            _id:  Buffer.from(formData.title+formData.created_at).toString('base64'),
            title: formData.title,
            note: formData.note,
            category: formData.category,
            created_at: formData.created_at,
            user: req.body.user,
          });
          console.log(note);
          note.save()
            .then(doc => {  
              res.sendStatus(200)
            })
            .catch(err => {
              console.error(err)
            });
       
    }    
};

export function deleteOne(req, res) {
  console.log(req.params);
  NoteModel.findOneAndDelete(req.params.id)
       .then(doc => {
         console.log(doc);
         res.sendStatus(200);
       })
       .catch(err => {
         console.error(err)
       });
};

export function getAll(req, res) {
  console.log(req.params)
  NoteModel.find({user: req.params.id})
       .then(doc => {
         res.json(doc)
       })
       .catch(err => {
         console.error(err)
       })
};

export default {
    getAll,
    deleteOne,
    add,
}