package com.icode.gmsystem.controller;

import com.icode.gmsystem.config.IConstant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;


/**
 * @ClassName: FileUploadUtil
 * @Description: 文件上传工具类
 * @Author: 张欣宇
 * @Date: 2019-06-22
 * @Version: 1.0
 */
@RestController
public class FileUtilController {
    private static Logger logger  = LoggerFactory.getLogger(FileUtilController.class);

    @RequestMapping(value = "/upload")
    public static void saveFile(MultipartFile file) {
        if( file.isEmpty() ) {
//            return null;
        }else {

            //获取文件名
            String fileName = file.getOriginalFilename();
            //文件存储路径
            String filePath = IConstant.UPLOAD_PATH + fileName;
            File dest = new File(filePath);

            //检测是否存在目录
            if( !dest.getParentFile().exists() ) {
                //新建文件夹
                dest.getParentFile().mkdirs();
            }
            //写入文件
            try {
                file.transferTo(dest);
            } catch (IOException e) {
                e.printStackTrace();
                logger.error("文件写入异常!!!");
//                return null;
            }

            logger.info("文件存储成功，相对路径：" + IConstant.RELATIVE_IMG_PATH + "/" + fileName);
//            return IConstant.RELATIVE_IMG_PATH + "/" + fileName;
        }

    }


    @RequestMapping("/batch")
    public static void downloadFile(String fileName, HttpServletResponse response) {

        if( fileName != null ) {
            //文件存储路径
            String filePath = IConstant.UPLOAD_PATH + fileName;
            File file = new File(filePath);
            if( file.exists() ) {//如果文件存在
                // 设置强制下载不打开
                response.setContentType("application/force-download");
                try {
                    // 设置文件名，编码解决乱码
                    response.addHeader("Content-Disposition", "attachment;fileName=" + URLEncoder.encode(fileName, "utf-8"));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }

                byte[] bytes = new byte[1024];
                FileInputStream fis = null;
                BufferedInputStream bis = null;
                try {
                    fis = new FileInputStream(file);
                    bis = new BufferedInputStream(fis);
                    OutputStream os = response.getOutputStream();
                    int i = bis.read(bytes);
                    while( i != -1 ) {
                        os.write(bytes,0,i);
                        i = bis.read(bytes);
                    }

                    fis.close();
                    bis.close();
                }  catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
