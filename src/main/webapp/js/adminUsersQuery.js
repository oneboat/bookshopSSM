var uAccount='',uPhone='',uRole='',totalPage=0,currpage=0,limit
var selectedValue = '',searchInput=""
var multiDeleteArr = []
$(function(){
	getLists()
	 $("body").on('click','.cart-multiDelete',function() {
		 let obj = {ids:multiDeleteArr}
			if(multiDeleteArr.length) {
				$.ajax({
					url:'user/deleteUsers',
					type:'post',
					contentType: "application/json; charset=utf-8",
					data:JSON.stringify(obj),
				
					success:function(){
						if(data.indexOf("success") != -1){
							  $("#tip-success-show-admin").css("display", "block")
							     $(".tip-content").html("删除成功")						 
								 setTimeout(function(){
									  $("#tip-success-show-admin").css("display", "none")
									  $(".book_lists").html("");
									  getLists()
								 },2000) 
							 
						  }else{
							  $("#tip-failure-show-admin").css("display", "block")
							  $(".tip-content").html("删除失败")						 
								 setTimeout(function(){
									  $("#tip-failure-show-admin").css("display", "none")
									  $(".book_lists").html("");
									  getLists()
								 },2000) 
						  }
					},
					error:function(){
						$("#tip-failure-show-admin").css("display", "block")
						  $(".tip-content").html("删除失败")						 
							 setTimeout(function(){
								  $("#tip-failure-show-admin").css("display", "none")
								  $(".book_lists").html("");
								  getLists()
							 },2000) 
					}
				})
			}else{
				alert("请选择要删除的用户")
			}
		})
	$("#selectAll").click(function () {
		if (this.checked) {
		var check = document.getElementsByClassName("selectSub");
    
	    for(var i = 0;i<check.length;i++){
	    	var flag= false
	    	if(multiDeleteArr.length){
				  for(var j=0;j<multiDeleteArr.length;j++){
					  if(check[i].getAttribute('name') ==multiDeleteArr[j]){
						  flag=true;
						  break;
					  }
				  }
			  }
			  if(!flag){
				  multiDeleteArr.push(check[i].getAttribute('name')) 
			  }
	    }
    $(".selectSub").prop("checked", true);
    $(".selectSub").click(function () {
    	var num=0
    	$(".selectSub").each(function(){
    		if(this.checked == true){
    			num +=1
    			var no = this.parentNode.parentNode;
    		    var td = no.childNodes;
    		}else {
    			$("#selectAll").prop("checked", false);
    		}
    	})
    	if(num == $(".selectSub").length){
    		   $("#selectAll").prop("checked", true);
    		}
      });
  } else {
	  multiDeleteArr = []
	  $(".selectSub").prop("checked", false);
  }
});
	
	 $("body").on("click",".selectSub",function(){
		 var num=0
	    	$(".selectSub").each(function(){
	    		if(this.checked == true){
	    			num +=1
	    			var no = this.parentNode.parentNode;
	    		    var td = no.childNodes;
	    		}else {
	    			$("#selectAll").prop("checked", false);
	    		}
	    	})
	    	if(num == $(".selectSub").length){
	    		   $("#selectAll").prop("checked", true);
	    		}
		  currentName = $(this).attr("name");
		  let flag = false;
		  if(this.checked){
			  if(multiDeleteArr.length){
				  for(var i=0;i<multiDeleteArr.length;i++){
					  if(currentName ==multiDeleteArr[i]){
						  flag=true;
						  break;
					  }
				  }
			  }
			  if(!flag){
				  multiDeleteArr.push(currentName) 
			  }
		  }else {
			  if(multiDeleteArr.indexOf(currentName) != -1){
				  multiDeleteArr.splice(multiDeleteArr.indexOf(currentName),1)
			  }
		  }
	  })
	
	$("#submitButton").click(function(){
		let obj = {
				uPhone:$("#edit_user_phone").val(),
				uAccount:$("#edit_user_name").val(),
				uPassword:$("#edit_user_password").val()
				}
		if(obj.uPhone && obj.uAccount &&obj.uPassword) {
			$.ajax({
				url:'user/updateUsers',
				type:'post',
				data:JSON.stringify(obj),
				contentType: "application/json; charset=utf-8",
				success:function(data){
					$("#div2").slideUp();
					if(data == 'success') {
						if(data.indexOf("success") != -1){
							  $("#tip-success-show-admin").css("display", "block")
							     $(".tip-content").html("修改成功")						 
								 setTimeout(function(){
									$("#tip-success-show-admin").css("display", "none")
									$(".book_lists").html("");
									$("body").css({overflow:"auto"})
							        document.getElementById("bg").style.display ="none";
									getLists()
								 },2000) 
							 
						  }else{
							  $("#tip-failure-show-admin").css("display", "block")
							  $(".tip-content").html("修改失败")						 
							  setTimeout(function(){
									$("#tip-success-show-admin").css("display", "none")
									$(".book_lists").html("");
									$("body").css({overflow:"auto"})
							        document.getElementById("bg").style.display ="none";
									getLists()
								 },2000)  
						  }
						
					}
					
			}
		   })
		}else {
			alert("请完善修改信息")
		}
		
	})
	
	selectedValue = $("#search_con").val()
	$("#search_con").change(function(){
	  uAccount='',uPhone='',uRole=''
	  $("#search_input").val('')
	  selectedValue = $("#search_con").val()
	})
	$("#search_button").click(function(){
		uAccount='',uPhone='',uRole=''
		searchInput = $("#search_input").val()
		console.log(selectedValue,searchInput)
		if(selectedValue && searchInput){
			console.log(selectedValue,searchInput)
			if(selectedValue == "u_name") {
				uAccount = searchInput
			}else if(selectedValue == "u_phone"){
				uPhone = searchInput
			}else if(selectedValue == "u_role"){
				if(searchInput == '买家'){
					uRole = 0
				}else {
					uRole = 1
				}
			}
			getLists()
		}else{
			alert("请选择搜索条件")
		}
	})
	//修改
    $("body").on("click",".singleModify",function(){
        $("#div2").slideDown();
        $("body").css({overflow:"hidden"})
        document.getElementById("bg").style.display ="block";
        var b_id=$(this).attr("name");
        var ul = $(this).parent().parent().find("ul")
        var ulchilds=ul.children();
       for(var i=0;i<ulchilds.length;i++){
    	   if(ulchilds[i].tagName=="LI"){
               assignment(ulchilds[i]);
           }
       }
     
    });
	
	//delete
	 $("body").on("click",".singleDelete",function(){
		let id = $(this).attr("name");
		let ids = []
		ids.push(id)
		 var r=confirm("确定删除该用户信息？")
		  if (r==true)
		    {
			  $.ajax({
				  url:'user/deleteUsers',
				  type:'post',
				  contentType: "application/json; charset=utf-8",
				  data:JSON.stringify({
					  "ids":ids
				  }),
				  success:function(data){
					  if(data.indexOf("success") != -1){
						  $("#tip-success-show-admin").css("display", "block")
						     $(".tip-content").html("删除成功")						 
							 setTimeout(function(){
								  $("#tip-success-show-admin").css("display", "none")
								  $(".book_lists").html("");
								  getLists()
							 },2000) 
						 
					  }else{
						  $("#tip-failure-show-admin").css("display", "block")
						  $(".tip-content").html("删除失败")						 
							 setTimeout(function(){
								  $("#tip-failure-show-admin").css("display", "none")
								  $(".book_lists").html("");
								  getLists()
							 },2000) 
					  }
				  }
			  })
		    }
	  });
	
    //给input的相应节点赋值
    function assignment(thNode){
        var input=document.getElementsByTagName("input");
        for(var k=0;k<input.length;k++){
            var name=input[k].name;
            if(name==thNode.title){
                input[k].value=thNode.lastChild.nodeValue;
            }
        }
    }
});

function getLists(page,limit){
	if(!page) {
		page = 1
	}
	if(!limit) {
		limit = 10
	}
	$.ajax({
		url:'user/usersQry',
		method:'get',
		 data:{
   		  "uAccount":uAccount,
   		  "page": page,
   		  "limit": limit,
   		  "uPhone":uPhone,
   		  "uRole":uRole
   	  },
		success:function(data){
			console.log(data)
			 totalPage = data.pageInfo.pages
   		  	 limit = data.pageInfo.pageSize
   		  	 currpage = data.pageInfo.pageNum
   		  $(".papigationPage").html("第"+currpage+"页/共"+totalPage+"页")
		  var html = "";
		  if(data.usersList && data.usersList.length ==0){
   		  	 $(".book_lists").html("<div style=\"display:flex;justify-content:center;height:100px;align-items:center\">抱歉，无匹配用户！</div>");
   		  	 return;
   		  }
		 $.each(data.usersList,function(index,udata){
			   if(udata['uRole'] == 0){
					udata['uRole'] = "买家"
				  }else{
					udata['uRole'] = "管理员"
				  }
				  html += "<div class=\"book\">";
				  html += "<div class=\"book_column book_column_one\">"
				  html += " <input type='checkbox' class=\"selectSub\" name="+udata['uAccount']+" />"
				  html += "</div>"
				  html += "<div class=\"book_column book_column_three\">"
				  html += "<ul>"
				  html += "<li title=\"user_name\"  class=\"li_book\"><b>账户：</b>"+udata['uAccount']+"</li><br>"
				  html += "<li title=\"user_phone\" class=\"li_book\"><b>手机号：</b>"+udata['uPhone']+"</li><br>"
				  html += "<li title=\"user_password\" class=\"li_book\" style='display:none'><b>密码：</b>"+udata['uPassword']+"</li>"
				  html += "<li title=\"user_role\" class=\"li_book\"><b>身份：</b>"+udata['uRole']+"</li><br>"
				  html += "</ul></div>"
				  html += "<div class=\"book_column book_column_four\">"
				  html += "<input type=\"button\" value=\"删除\" class=\"singleDelete\" name="+udata['uAccount']+">"
				  html += "<input type=\"button\" value=\"修改\" class=\"singleModify\" name="+udata['uAccount']+">"
				  html += "</div></div><br>";
		  });
   		  $(".book_lists").html(html)
		}
	})
}
function toPage(str) {
	console.log(str)
	if(str == "index"){
		getLists(1,limit)
	}
	if(str == "end") {
		getLists(totalPage,limit)
	}
	if(str == "prev"){
		if(currpage>1) {
			getLists(currpage-1,limit)
		}else {
			alert("已经是第一页")
			getLists(1,limit)
		}
		
	}
	if(str == "next") {
		if(currpage < totalPage) {
			getLists(currpage+1,limit)
		}else {
			alert("已经是最后一页")
			getLists(totalPage,limit)
		}
	}
}

//是否为正整数  
function isPositiveNum(s){
var re = /^[0-9]*[1-9][0-9]*$/ ;  
return re.test(s)  
} 
$("#pageSize").blur(function(){
		var size = $("#pageSize").val()
		if(isPositiveNum(size)) {
			limit = Number(size)
	  		getLists(1,limit)
		}else {
			alert("请输入大于0的整数值")
		}
	})