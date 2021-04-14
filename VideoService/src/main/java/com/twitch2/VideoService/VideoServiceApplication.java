package com.twitch2.VideoService;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.common.serialization.Serdes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.apache.kafka.common.serialization.ByteArraySerializer;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;

@SpringBootApplication
public class VideoServiceApplication {



	public VideoServiceApplication() throws IOException {

	}


	public static void main(String[] args) throws IOException {

		ConfigurableApplicationContext context = SpringApplication.run(VideoServiceApplication.class, args);

		MessageProducer producer;

		producer = context.getBean(MessageProducer.class);
		FFmpeg ffmpeg;
		FFprobe ffprobe;

		ffmpeg = new FFmpeg("C:/Users/Manol/Downloads/ffmpeg-4.2.1-win-64/ffmpeg.exe");
		ffprobe = new FFprobe("C:/Users/Manol/Downloads/ffprobe-4.2.1-win-64/ffprobe.exe");
		FFmpegBuilder builder = new FFmpegBuilder()
				.setInput("F:/Projects/Twitch2/japannazi.webm")
				.overrideOutputFiles(true) // Override the output if it exists

				.addOutput("output.mp4")   // Filename for the destination
				.setFormat("mp4")        // Format is inferred from filename, or can be set

				.disableSubtitle()       // No subtiles

				.setAudioChannels(1)         // Mono audio
				.setAudioCodec("aac")        // using the aac codec
				.setAudioSampleRate(48_000)  // at 48KHz
				.setAudioBitRate(32768)      // at 32 kbit/s

				.setVideoCodec("libx264")     // Video using x264
				.setVideoFrameRate(24, 1)     // at 24 frames per second
				.setVideoResolution(640, 480) // at 640x480 resolution

				.setStrict(FFmpegBuilder.Strict.EXPERIMENTAL) // Allow FFmpeg to use experimental specs
				.done();

		FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);

// Run a one-pass encode
		executor.createJob(builder).run();

// Or run a two-pass encode (which is better quality at the cost of being slower)
		//executor.createTwoPassJob(builder).run();



//
//
//
//		byte[] array = Files.readAllBytes(Paths.get("C:/Users/Manol/Downloads/1614581388636.webm"));
//		byte[] array2 = "hoi".getBytes(StandardCharsets.UTF_8);
//		ByteArraySerializer serializer = new ByteArraySerializer();
//		serializer.serialize("testtopic2",array2);
//		int limit = array.length / 1000000;
//
//		for (int i = 0; i < limit; i++) {
//			if((i+1)*1000000<=array.length){
//				producer.sendMessage(Arrays.copyOfRange(array, i * 1000000,   (i+1) * 1000000));
//			}else{
//				producer.sendMessage(Arrays.copyOfRange(array, i * 1000000,  array.length));
//			}
//		}
//
//		context.close();

	}

	@Bean
	public MessageProducer messageProducer() {
		return new MessageProducer();
	}

	public static class MessageProducer {

		@Autowired
		private KafkaTemplate<String, byte[]> kafkaTemplate;

//		@Autowired
//		private KafkaTemplate<String, String> greetingKafkaTemplate;

		@Value(value = "testtopic2")
		private String topicName;

//		@Value(value = "${partitioned.topic.name}")
//		private String partitionedTopicName;
//
//		@Value(value = "${filtered.topic.name}")
//		private String filteredTopicName;
//
//		@Value(value = "${greeting.topic.name}")
//		private String greetingTopicName;

		public void sendMessage(byte[] bytes) {

			ListenableFuture<SendResult<String, byte[]>> future = kafkaTemplate.send(topicName, bytes);

			future.addCallback(new ListenableFutureCallback<SendResult<String, byte[]>>() {

				@Override
				public void onSuccess(SendResult<String, byte[]> result) {
					System.out.println("Sent message=[" + Arrays.toString(bytes) + "] with offset=[" + result.getRecordMetadata()
							.offset() + "]");
				}

				@Override
				public void onFailure(Throwable ex) {
					System.out.println("Unable to send message=[" + Arrays.toString(bytes) + "] due to : " + ex.getMessage());
				}
			});
		}





	}


	public static void encodeVideo() throws IOException {





	}


}

