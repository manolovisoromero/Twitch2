import {Kafka} from 'kafkajs';



const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['192.168.107.60:9092'],
  })

const consumer = kafka.consumer({ groupId: 'test-group' })



async function kafkaInit(io){

    await consumer.connect()
    
    await consumer.subscribe({ topic: 'testtopic2', fromBeginning: false })
    
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
            offset: message.offset.toString()
          });
          io.emit('message',message.value.toString());
        },
      })

}

export {kafkaInit};