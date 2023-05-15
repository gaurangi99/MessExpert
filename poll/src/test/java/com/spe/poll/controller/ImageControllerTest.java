//package com.spe.poll.controller;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.spe.poll.model.Image;
//import com.spe.poll.service.ImageService;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.mock.web.MockHttpServletResponse;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.RequestBuilder;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//
//@RunWith(SpringRunner.class)
//@WebMvcTest(value = ImageControllerTest.class)
//class ImageControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private ImageService imageService;
//
//    @Test
//    void uploadImage() throws Exception {
//        Image mockImage=new Image("IIITB_TEST_MENU",null);
//
//        String inputInJson=this.mapToJson(mockImage);
//        String URI="/api/admin/deleteSplMenu";
//
//        Mockito.when(imageService.addMenu(Mockito.any(Image.class)).thenReturn(mockImage);
//
//        RequestBuilder requestBuilder= MockMvcRequestBuilders.post(URI).accept(MediaType.APPLICATION_JSON).content(inputInJson).contentType(MediaType.APPLICATION_JSON);
//
//        MvcResult result=mockMvc.perform(requestBuilder).andReturn();
//        MockHttpServletResponse response=result.getResponse();
//
//        String outputInJson=response.getContentAsString();
//
//        assertThat(outputInJson).isEqualTo(inputInJson);
//        assertEquals(HttpStatus.OK.value(),response.getStatus());
//    }
//
//    private String mapToJson(Object object) throws JsonProcessingException{
//        ObjectMapper objectMapper=new ObjectMapper();
//        return objectMapper.writeValueAsString(object);
//    }
//}