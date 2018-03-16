var ObjectID	=	require('mongodb').ObjectID;
module.exports 	= function(app, db){

	// get a book details from books collection
	app.get('/books/:id', (req,res) => {
		const id = req.params.id;
		const details = { '_id' : new ObjectID(id) };

		db.collection('books').findOne(details, (err, item) => {
			if(err){
				res.send({'error':'An error has occured'});
			}else{
				res.send(item);
			}
		});
	});

	// delete a book details from books collection
	app.delete('/books/:id', (req,res) => {
		const id = req.params.id;
		const details = { '_id' : new ObjectID(id) };

		db.collection('books').remove(details, (err, item) => {
			if(err){
				res.send({'error':'An error has occured'});
			}else{
				res.send('Book '+ id + ' deleted!');
			}
		});
	});
	
	// Update a book details from books collection
	app.put('/books/:id', (req,res) => {
		const id = req.params.id;
		const details = { '_id' : new ObjectID(id) };
		const book = { text : req.body.body, title : req.body.title };

		db.collection('books').update(details, book, (err, item) => {
			if(err){
				res.send({'error':'An error has occured'});
			}else{
				res.send(item);
			}
		});
	});
	// create new records to books collection
	app.post('/books', (req,res) => {
		const book = { text : req.body.body, title : req.body.title };

		db.collection('books').insert(book, (err, result) => {
			if(err){
				res.send({'error':'An error has occured'});
			}else{
				res.send(result.ops[0]);
			}
		});
	});
}