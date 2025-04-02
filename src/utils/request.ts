import axios from 'axios'
import Mock from 'mockjs'

Mock.mock('/api/users', 'get', {
    code: 200,
    message: '成功',
    'data|5-10': [
        {
            // 生成 5-10 条数据
            'id|+1': 1,
            name: '@cname',
            'age|18-60': 30,
            city: '@city',
            phone: /^1[34578]\d{9}$/, // 生成符合规则的手机号
        },
    ],
})

// 创建一个 Axios 实例
export const request = axios.create()
