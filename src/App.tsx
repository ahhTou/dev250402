import c from 'classnames'
import { useState } from 'react'
import { Button, Form } from 'antd'

import { UserSelect } from './components/user-select'
import { apiUserList2, apiUserList3 } from './apis/api'

function App() {
    const [form] = Form.useForm()
    const [value, setValue] = useState<string | string[]>()
    const [values, setValues] = useState('')

    const handleCommit = () => {
        const values = form.getFieldsValue()

        setValues(JSON.stringify(values))
    }

    return (
        <div
            className={c(
                'flex bg-gray-200 h-[100vh] w-[100vw] items-center justify-center'
            )}
        >
            <div className={c('flex flex-col w-[500px] h-[500px]')}>
                <h1> userid userid[] 为 value 值， username 为 label</h1>
                <br />
                <h1>独立使用 value(user id): {value}</h1>
                <UserSelect
                    value={value}
                    onChange={value => {
                        console.log('>>>> 更改独立组件值', value)

                        setValue(value)
                    }}
                />
                <br />
                <div>在表单中使用</div>
                <Form form={form}>
                    <Form.Item name="select_user" label="单选 / 默认 api">
                        <UserSelect width="100%" />
                    </Form.Item>

                    <Form.Item name="error" label="单选 / 错误 api">
                        <UserSelect
                            width="100%"
                            api={async () => {
                                await apiUserList3()

                                return []
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="select_users" label="多选 / 中文 api">
                        <UserSelect
                            width="100%"
                            multiple
                            api={async () => {
                                const { data } = await apiUserList2()

                                return data.data
                            }}
                        />
                    </Form.Item>
                </Form>
                <Button onClick={handleCommit}>提交</Button>
                提交的表单值, 不传入username 传入 userid: <div>{values}</div>
            </div>
        </div>
    )
}

export default App
