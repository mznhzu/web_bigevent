$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '密码不一致！'
            }
        }
    })

    //提交请求 实现密码重置
    $('.layui-form').on('submit', function(e) {
        //阻止默认表单提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更改密码失败！')
                }
                layer.msg('更改密码成功！')
                    //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})