
mongoose.connect(uri)
    .then(() => console.log(`🦄🦄🦄🦄 Established a connection to the ${dbName} database`))
    .catch(err => console.log("❌❌❌❌ Something went wrong when connecting to the database", err));