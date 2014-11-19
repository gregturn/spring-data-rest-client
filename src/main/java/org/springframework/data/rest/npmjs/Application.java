package org.springframework.data.rest.npmjs;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@ComponentScan
@RestController
@EnableScheduling
@EnableAutoConfiguration
public class Application {

	private static final Logger log = LoggerFactory.getLogger(Application.class);

	@Autowired
	private EmployeeRepository repository;

	@Autowired
	ConfigurableApplicationContext context;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// Pre-load data for testing

	@PostConstruct
	private void initDatabase() {
		repository.save(new Employee("Bilbo", "Baggins", "thief"));
	}

	// Configure shutdown options

	/**
	 * Response to a web hook to shutdown. This make it possible for testers to shutdown the harness sooner.
	 *
	 * @return a string message that its about to shutdown
	 */
	@RequestMapping("/shutdown")
	public String shutdown() {
		log.info("Received call to shutdown");
		new Thread(new Runnable() {
			@Override
			public void run() {
				try {
					Thread.sleep(1000L);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				context.close();
			}
		}).start();
		return "Shutting down";
	}

	@Scheduled(fixedDelay = 1L, initialDelay = 100000L)
	private void shutdownAfterCertainTime() {
		log.info("Time expired. Deadman switch shutting things down.");
		context.close();
	}

}
