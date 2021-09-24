import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {useHistory} from 'react-router-dom'

export const LinkCard = ({link}) => {
  const {token} = useContext(AuthContext)
  const {request} = useHttp()
  const history = useHistory()

  const deleteHandler = async event => {
    try {
      await request(`/api/link/${link._id}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`
      })
      history.push('/links')
    } catch (e) {}
  }

  return (
    <>
      <h2>Ссылка</h2>
      <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>Исходная: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Количество кликов: <strong>{link.clicks}</strong></p>
      <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
      <button
        className="waves-effect btn red"
        onClick={deleteHandler}
      >Удалить</button>
    </>
  )
}