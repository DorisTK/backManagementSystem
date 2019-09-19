package com.icode.gmsystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @author 张欣宇
 * @date 2019/6/20
 */
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {
    //图片真实路径
    private static final String imagePath = "file:" +IConstant.UPLOAD_PATH ;
//    private static final String imagePath = "file:" + IConstant.UPLOAD_PATH + IConstant.ABSOLUTE_IMG_PATH ;
    //真实视频资源路路径
//    private static final String videoPath = "file:" + IConstant.UPLOAD_PATH + IConstant.COURSE_RESOURCE;
    private static final String videoPath =  IConstant.UPLOAD_PATH ;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //配置图片路径映射
        registry.addResourceHandler(IConstant.RELATIVE_IMG_PATH+"/**").addResourceLocations(imagePath);
        //配置多媒体路径映射
        registry.addResourceHandler(IConstant.RELATIVE_VIDEO_PATH+"/**").addResourceLocations(videoPath);
        super.addResourceHandlers(registry);
    }
}
