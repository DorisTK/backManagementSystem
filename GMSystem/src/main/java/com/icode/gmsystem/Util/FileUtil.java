package com.icode.gmsystem.Util;

import com.icode.gmsystem.config.IConstant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;


/**
 * @Description: 文件上传工具类
 */
public class FileUtil {
    private static Logger logger  = LoggerFactory.getLogger(FileUtil.class);

    /**
     * @Description: 上传文件
     * @Param: [file, path]
     * @Return: java.lang.String
     */
    public static String saveFile(MultipartFile file,  String path) {
        if( file.isEmpty() ) {
            logger.info("上传文件为空!!!");
            return null;
        }

        //获取文件名
        String fileName = file.getOriginalFilename();
        //文件存储路径
        String filePath = IConstant.UPLOAD_PATH + path + fileName;
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
            return null;
        }

        logger.info("文件存储成功，相对路径：" + IConstant.RELATIVE_IMG_PATH + "/" + fileName);
        return IConstant.RELATIVE_IMG_PATH + "/" + fileName;
    }

    public static void downloadFile(String fileName, HttpServletResponse response) {
        if( fileName != null ) {
            //文件存储路径
            String filePath = IConstant.UPLOAD_PATH + IConstant.COURSE_RESOURCE  + fileName;
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
