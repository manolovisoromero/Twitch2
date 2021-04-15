const { Kafka } = require('kafkajs')


const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['172.25.238.79:9092'],
    ssl: true,
  })

const consumer = kafka.consumer({ groupId: 'test-group' })



async function kafkaInit(){

    await consumer.connect()
    // await consumer.subscribe({ topic: 'testtopic2', fromBeginning: true })
    
    // await consumer.run({
    //     eachMessage: async ({ topic, partition, message }) => {
    //       console.log({
    //         value: message.value.toString(),
    //       })
    //     },
    //   })

}

export {kafkaInit};