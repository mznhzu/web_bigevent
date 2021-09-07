$(function() {
    // 点击‘去注册账号’链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    });

    // 点击‘去登录’链接

    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui中获取 form 对象

    let form = layui.form
    let layer = layui.layer
        //通过form.verify() 函数自定义校验规则

    form.verify({
        //自定义了一个叫做pwd校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //检验两次密码是否一致
        repwd: function(value) {
            //通过形参拿到的时确认密码框内的内容
            //还需要拿到密码框中的内容
            //进行一次等于的判断
            //如果判断失败，则return一个提示消息即可

            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        //阻止表单提交默认事件
        e.preventDefault();
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {

            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
                //程序模拟点击事件
            $('#link_login').click()
        })
    })

    //监听登录表单的提交行为
    $('#form_login').submit(function(e) {
        //阻止表单提交的默认行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('登录失败！')
                    return
                }
                layer.msg(res.message)
                    //将登录成功得到的 token 字符串，保存到localStorage 中
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }

        })

    })
})