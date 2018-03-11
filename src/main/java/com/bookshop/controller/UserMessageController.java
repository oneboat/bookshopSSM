package com.bookshop.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bookshop.modle.UserMessage;
import com.bookshop.modle.UserMessageExample;


@RequestMapping("/userMessage")
public class UserMessageController {

    UserMessageService userMessageSV;

    public Map userMessageQry(
             @RequestParam(name="uAccount",required=false)String uAccount,
             @RequestParam(name="uMessage",required=false)String uMessage,
             @RequestParam(name="page",required=false)String page,@RequestParam(name="limit",required=false)String limit){
        List<Map> mapList = new ArrayList<>();
        int pageNum =  page == null ? 1 : Integer.parseInt(page);
        int pageSize =  limit == null ? 10 : Integer.parseInt(limit);
        Map<String, String> userMessageExmMap = new HashMap<>();
        try {
            userMessageExmMap.put("uAccount", uAccount);
            userMessageExmMap.put("uMessage", uMessage);
            UserMessageExample example = userMessageSV.createUserMessageExm(userMessageExmMap);
            List<UserMessage> userMessageList = userMessageSV.selectByExample(example,pageNum,pageSize);
            for (UserMessage userMessage : userMessageList) {
                Map<String,Object> tMap = new HashMap<>();
                tMap.put("uAccount", userMessage.getuAccount());
                tMap.put("uMessage", userMessage.getuMessage());
                mapList.add(tMap);
            }
        }
        return resultMap;
    }

    public String addUserMessage(@RequestBody Map<String, String>req){
        String uAccount = req.get("uAccount");
        try {
            UserMessage userMessage = userMessageSV.createUserMessage(req);
            if (userMessageSV.insertSelective(userMessage) == 1) {
                return "success";
            }else {
               return "error";
            }
        } catch (Exception e) {
           return "error";
        }
    }

    public String updateUserMessage(@RequestBody Map<String, String>req){
        try {
            UserMessage userMessage = userMessageSV.createUserMessage(req);
            if (userMessageSV.updateByPrimaryKeySelective(userMessage) == 1) {
               return "success";
            }else {
                return "error";
            }
        } catch (Exception e) {
           return "error";
        }
    }

    public String deleteUserMessage(@RequestBody Map<String, Object>req){
        List<String> idList = (List<String>) req.get("ids");
        String strSuc = "";
        String strFail = "";
        String strNotExist = "";        try {
            if (idList.size() != 0 && idList != null) {
                for (int i = 0; i < idList.size(); i++) {
                    String id = idList.get(i);
                    if (userMessageSV.selectByPrimaryKey(id) != null) {
                        if (userMessageSV.deleteByPrimaryKey(id) == 1) {
                            strSuc += (id + " ");
                        } else {
                            strFail += (id + " ");
                        }
                   } else {
                       strNotExist += (id + " ");                   }
               }
                if (strNotExist.equals("") && strFail.equals("")) {
                	return strSuc + "删除成功";
                } else {
                	return strFail+ "删除失败";
                }
            } else {
            	return "idsNull";
            }
        } catch (Exception e) {
        	return "error";
        }
    }
}