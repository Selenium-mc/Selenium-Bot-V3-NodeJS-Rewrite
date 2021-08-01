module.exports = {
    name: 'test',
    description: 'very good command here!',
    execute(message) {
        message.channel.send("Hi");
    }
}