import { useSelector } from '~/redux/store'

const Main = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div>hello, {user?.firstName}</div>
  )
}

export default Main
