  
<div id="Image">
  <form id =“UpImg” method =“post”enctype =“multipart / form-data”>
    <input type =“file”id =“uploadFile”name =“uploadimage”/>
  </ form>
</div>
  
  $(".Image input").click(function(){
                var this_ = $(this);
                //修改form的action来提交图片
                var PrimaryFormAction = $('#proj-form').attr('action');
                $('#UpImg').attr('action','/projectc/ajaxupimg');
                this_.on('change', function(){
                    if (this_[0].files[0]!= undefined) {
                        var imgSrc = this_.val(),
                        file = this_[0].files[0]||'',
                        imgSize = file.size, //图片大小
                        imgUrl = URL.createObjectURL(file);
                        if (!/\.(jpg|jpeg|png|gif|JPG|PNG|JPEG|GIF)$/.test(imgSrc)) {
                            showMsg('插入图片格式不正确！');
                            this_.val("");  //清空之前的图片;
                            return false;
                        }else if(imgSize>2097152){
                            showMsg('图片不能大于2M，请重新上传！');
                            this_.val("");  //清空之前的图片;
                            return false;
                        }else{
                            $("#UpImg").ajaxSubmit({
                                dataType:  'json',
                                beforeSend: function() {
                                    //html("上传中...");
                                },
                                success: function(data) {
                                    //console.log("上传成功！")
                                    $('#UpImg').attr('action', PrimaryFormAction);// 还原form表单的action
                                    this_.val("");  //清空之前的图片;
                                },
                                error:function(data){
                                    //html("上传失败");
                                }
                            });

                        }


                    }
                });
            });
