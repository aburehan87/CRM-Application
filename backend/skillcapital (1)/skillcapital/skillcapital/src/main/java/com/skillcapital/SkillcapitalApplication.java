package com.skillcapital;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

//				SkillcapitalApplication: MAIN CLASS from where the entire code starts, it is responsible for scanning all the
//				base packages, com.skillcapital, it scans for all the packages written inside com.skillcapital



@SpringBootApplication(scanBasePackages= "com.skillcapital",exclude = {SecurityAutoConfiguration.class})
@EnableJpaAuditing // This enables JPA Auditing for created/updated timestamps
public class SkillcapitalApplication
{

	public static void main(String[] args)
	{
		SpringApplication.run(SkillcapitalApplication.class, args);
		System.out.println(" Web App is Running ");
	}

}
