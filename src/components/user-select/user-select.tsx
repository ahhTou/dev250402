import { useMount } from 'ahooks'
import { Button, notification, Select } from 'antd'
import { useMemo, useState } from 'react'
import c from 'classnames'
import { apiUserList, User } from '../../apis/api'

type UserSelectProps = {
    /**
     * userid 或 userid[]
     * 
     * 提供 value、onChange 函数、可以直接放到 Form.Item 中使用
     */
    value?: string[] | string
    onChange?: (userId: string[] | string) => void
    width?: string
    multiple?: boolean

    api?: () => Promise<User[]>
}

export const UserSelect = (props: UserSelectProps) => {
    const { value, onChange, multiple, api, width = '240px' } = props
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<User[]>([])
    const [message, setMessage] = useState('')

    const defaultApi = async () => {
        const { data } = await apiUserList()

        return data.data
    }

    const refresh = async () => {
        try {
            setLoading(true)
            setMessage('')

            const users = api ? await api() : await defaultApi()

            setUsers(users)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.log(err)

            setMessage(err?.message)

            notification.error({ message: err?.message })

            setUsers([])
        } finally {
            setLoading(false)
        }
    }

    useMount(async () => {
        refresh()
    })

    const options = useMemo(() => {
        return users.map(d => {
            return {
                label: d.UserName,
                value: d.UserId,
            }
        })
    }, [users])

    return (
        <div style={{ width }} className={c(loading && 'cursor-wait')}>
            {message && <Button onClick={refresh}>重试</Button>}

            {!message && (
                <Select
                    style={{
                        width: '100%',
                        pointerEvents: loading ? 'none' : 'all',
                    }}
                    options={options}
                    value={value}
                    onChange={onChange}
                    mode={multiple ? 'multiple' : undefined}
                    loading={loading}
                    maxTagCount="responsive"
                />
            )}
        </div>
    )
}
