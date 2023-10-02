const express = require("express");
const {getAllTopics, getAllEndpoints} = require("./controller");
const app = express();

app.get("/api/topics", getAllTopics);
app.get("/api", getAllEndpoints)


// Error Handling
app.use((err, req, res, next) => {
    console.log(err)
	if (err.status) {
		res.status(err.status).send({ msg: err.msg });
	}
});


app.all('*', (req, res) => {
    res.status(404).send({msg: 'Invalid Path'})
})

module.exports = app;