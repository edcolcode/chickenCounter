package com.edcolco.chickenCounter.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactAppController {

	@RequestMapping(value = { "/", // Matches root
			"/{x:[\\w\\-]+}", // Matches pages
			"/{x:^(?!api$).*$}/*/{y:[\\w\\-]+}", // Matches everything that does not start with api
			"/{x:^(?!data-api$).*$}/*/{y:[\\w\\-]+}" // Matches everything that does not start with data-api
	}, produces = MediaType.TEXT_HTML_VALUE)
	public String getApp() {
		// Do not use / since it causes issues with the React router
		return "/index.html";
	}
}
