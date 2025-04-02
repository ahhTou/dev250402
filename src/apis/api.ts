import Mock from 'mockjs'
import { request } from '../utils/request'

Mock.mock('/api/user', 'get', {
    'data|30': [
        {
            // 生成 2 个用户
            'UserId|+1': 1, // UserId 从 1 开始，递增
            UserName: '@name', // 随机生成用户名
            'UserAge|18-60': 20, // 随机生成用户年龄，范围是 18 到 60
        },
    ],
})

Mock.mock('/api/user2', 'get', {
    'data|30': [
        {
            // 生成 2 个用户
            'UserId|+1': 1, // UserId 从 1 开始，递增
            UserName: '@cname', // 随机生成用户名
            'UserAge|18-60': 20, // 随机生成用户年龄，范围是 18 到 60
        },
    ],
})

export type User = {
    UserId: string
    UserName: string
    UserAge: string
}

export const apiUserList = () => {
    return request.get<{ data: User[] }>('/api/user')
}

export const apiUserList2 = () => {
    return request.get<{ data: User[] }>('/api/user2')
}

export const apiUserList3 = () => {
    return Promise.reject(new Error('报错了！'))
}
